import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Header from "../Header"
import DishItem from "../DishItem"
import { getDishes } from "../../Features/Dishes/dishesSlicer"
import './index.scss'

const ResponseStatusConstent = {
    loading: "LOADING",
    success: "SUCCESS",
    failure: "FAILURE"
}

const Dishes = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {responseStatus, dishItems, isLogged} = useSelector((store) => store.dishes)

    useEffect(() => {
        if(!isLogged){
            navigate('/login')
        }
    }, [])

    useEffect(() =>{
        dispatch(getDishes())
    }, [])

    const FailureView = () => (
        <div>
            <h1>Some Thing Was Wrong</h1>
        </div>
    )

    const successView = () => (
        <ul className="dishes-list">
            {dishItems.map(eachDish => <DishItem dish={eachDish} key={eachDish.id} />)}
        </ul>
    )

    const loadingView = () => (
        <div>
            <h1>Loading...</h1>
        </div>
    )

    const renderDishes = () => {
        switch (responseStatus) {
            case ResponseStatusConstent.loading:
                return loadingView()
            case ResponseStatusConstent.success:
                return successView()
            case ResponseStatusConstent.failure:
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