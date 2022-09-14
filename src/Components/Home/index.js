import React from 'react'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import Header from "../Header"
import './index.scss'

const Home = () => {
    const navigate = useNavigate()
    const {isLogged} = useSelector((store) => store.dishes)

    useEffect(() =>{
        if (!isLogged){
            navigate("/login")
        }
    })

    return(
        <div className="home-background">
            <Header />
            <div className='tabs-container'>
                <Link to="/dishes" className="link"><div className="tab-item">Dishes</div></Link>
                <Link to="/leaderboard" className="link"><div className="tab-item">Leader board</div></Link>
            </div>
        </div>
    )
}

export default Home