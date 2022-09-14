import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// user credentials
const users = [{user: "prasad", password: "prasad123"}, {user: "mahesh", password: "mahesh123"}, {user: "ram", password: "ram123"}, {user: "anand", password: "anand123"}, {user: "renu", password:"renu123"}]

// ranks
const ranks = {'prasad': {'first': null, 'secound': null, 'thered': null}, 'mahesh': {'first': null, 'secound': null, 'thered': null}, 'ram': {'first': null, 'secound': null, 'thered': null}, 'anand': {'first': null, 'secound': null, 'thered': null}, 'renu': {'first': null, 'secound': null, 'thered': null}}

// dishes fetch API
const url = "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"

// dishes fetch function
export const getDishes = createAsyncThunk("getDishItems", () => {
    return fetch(url).then((response) => response.json()).catch((err) => console.log(err))
})

// redux default state
const initialState =  {
    isLogged: false,
    dishItems: [],
    ranks,
    user: '',
    responseStatus: "LOADING",
    users,
}


// it checks for the previous state in localstorage if there is no data it returns initial state else it returns data stored in localstorage
const loadState = () => {
    let state
    try{
        const serialisedState = window.localStorage.getItem('app_state')
        if (!serialisedState){
            state = initialState
            const serialisedState2 = JSON.stringify(state)
            window.localStorage.setItem('app_state', serialisedState2)
        }else{
            state = JSON.parse(serialisedState).dishes
        } 
    }catch (err){
            console.log("error")
        }
        return state
}

// calling loadState function 
const state = loadState()

// creating Slice
const dishesSlice = createSlice({
    name: "dishes",
    initialState: state,
    reducers: {
        // it changes the login state and user
        changeLogginState: (state, {payload}) => {
            state.isLogged = !state.isLogged
            state.user = payload.username
        },
        // it updates the user votes
        giveOrChangeVote: (state, action) => {
            const {user, id, vote} = action.payload
            const dish = state.dishItems.find(each => each.id === id)
            switch (vote) {
                case 1:
                    if(state.ranks[user]['first'] !== id){
                        if (state.ranks[user]['secound'] === id){
                            state.ranks[user]['first'] = id
                            state.ranks[user]['secound'] = null
                            dish.rankPoints = dish.rankPoints + 10
                        }else if(state.ranks[user]['thered'] === id){
                            state.ranks[user]['first'] = id
                            state.ranks[user]['thered'] = null
                            dish.rankPoints = dish.rankPoints + 20
                        }else{
                            state.ranks[user]['first'] = id
                            dish.rankPoints = dish.rankPoints + 30
                        }
                    }
                    break;
                case 2 :
                    if(state.ranks[user]['secound'] !== id){
                        if (state.ranks[user]['first'] === id){
                            state.ranks[user]['secound'] = id
                            state.ranks[user]['first'] = null
                            dish.rankPoints = dish.rankPoints -10
                        }else if (state.ranks[user]['thered'] === id){
                            state.ranks[user]['secound'] = id
                                state.ranks[user]['thered'] = null
                                dish.rankPoints = dish.rankPoints + 10
                        }else{
                            state.ranks[user]['secound'] = id
                            dish.rankPoints = dish.rankPoints + 20
                        }
                    }
                    break
                case 3:
                    if(state.ranks[user]['thered'] !== id){
                        if (state.ranks[user]['first'] === id){
                            state.ranks[user]['thered'] = id
                            state.ranks[user]['first'] = null
                            dish.rankPoints = dish.rankPoints + 20
                        }else if(state.ranks[user]['secound'] === id){
                            state.ranks[user]['thered'] = id
                            state.ranks[user]['secound'] = null
                            dish.rankPoints = dish.rankPoints + 10
                        }else{
                            state.ranks[user]['thered'] = id
                            dish.rankPoints = dish.rankPoints + 10
                        }
                    }
                    break
                default:
                    break;
            }
        }
    },
    // it updates dishes list and responseStatus based on fetch request status 
    extraReducers: {
        [getDishes.pending]:(state) =>{
            state.responseStatus = "LOADING"
        },
        [getDishes.fulfilled]:(state, action) =>{
            const preveusDishItems = JSON.parse(window.localStorage.getItem('app_state'))
            if (preveusDishItems.dishes.dishItems[0] !== undefined){
                const dishItemsRanks = preveusDishItems.dishes.dishItems.map(eachDish => eachDish.rankPoints)
                const dishes = action.payload.map((eachDish, index) => ({...eachDish, rankPoints: dishItemsRanks[index]}))
                state.dishItems = dishes
                state.responseStatus = "SUCCESS"
            } 
            else{
                state.responseStatus = "SUCCESS"
                const dishes = action.payload.map(eachDish => ({...eachDish, rankPoints: 0}))
                state.dishItems = dishes
            }
            
        },
        [getDishes.rejected]:(state) =>{
            state.responseStatus = "FAILURE"
        }
    }
})



export const {changeLogginState, giveOrChangeVote} = dishesSlice.actions

export default dishesSlice.reducer
