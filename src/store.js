import { configureStore } from "@reduxjs/toolkit";
import dishesReducer from "./Features/Dishes/dishesSlicer"
export const store = configureStore({
    reducer:{
        dishes: dishesReducer,
    }
})

const saveState = (state) => {
    try{
        const serialisedState = JSON.stringify(state);
        window.localStorage.setItem('app_state', serialisedState)
    }catch(error){
        console.log("Error")
    }
}

store.subscribe(() => {
    saveState(store.getState())
})
