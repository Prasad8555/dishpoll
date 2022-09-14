import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import React, { useEffect } from "react"
import Header from '../Header'
import LeaderBoardItem from "../LeaderBoardItem"
import './index.scss'

const LeaderBoard = () => {
    const {dishItems, isLogged} = useSelector((state) => state.dishes)
    const updatedDishItems = isLogged ? [...dishItems].sort((a, b) => b.rankPoints - a.rankPoints) : ''
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogged){
            navigate('/login')
        }
    })
    

    return(
        <div className="leader-board-background-container">
            <Header />
            <h1 className="leader-board-heading">Leader Board</h1>
            {isLogged && (
                <ul className="leader-board-items">
                    {updatedDishItems.map((eachDish, index) => <LeaderBoardItem dish={eachDish} key={eachDish.id} indexValue={index} />)
                    }
                </ul>
            )}
            
        </div>
    )
}

export default LeaderBoard