import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Header from "../Header"
import DishItem from "../DishItem"
import { getDishes } from "../../Features/Dishes/dishesSlicer"
import './index.scss'

// fetch request statsu constant 
const ResponseStatusConstant = {
    loading: "LOADING",
    success: "SUCCESS",
    failure: "FAILURE"
}

const Dishes = () => {
    // waking function : for using this hooks in function
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {responseStatus, dishItems, isLogged} = useSelector((store) => store.dishes)

    //if the non-authenticated user try to access this page it redirects to login page
    useEffect(() => {
        if(!isLogged){
            navigate('/login')
        }
    }, [])

    // requesting for fetch data
    useEffect(() =>{
        dispatch(getDishes())
    }, [])

    // failure view
    const FailureView = () => (
        <div className="failure-view">
            <h1>Some Thing Was Wrong</h1>
        </div>
    )

    // success view
    const successView = () => (
        <ul className="dishes-list">
            {dishItems.map(eachDish => <DishItem dish={eachDish} key={eachDish.id} />)}
        </ul>
    )

    // loading view
    const loadingView = () => (
        <div className="loading-view">
            <h1>Loading...</h1>
        </div>
    )

    // conditional rendering
    const renderDishes = () => {
        switch (responseStatus) {
            case ResponseStatusConstant.loading:
                return loadingView()
            case ResponseStatusConstant.success:
                return successView()
            case ResponseStatusConstant.failure:
                return FailureView()
            default:
                return null
        }
    }

    return(
        <div className="dishes-background-container">
            <Header />
            {renderDishes()}
        </div>
    )
    
}

export default Dishes