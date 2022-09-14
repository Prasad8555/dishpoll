import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {changeLogginState} from "../../Features/Dishes/dishesSlicer"
import { Link } from "react-router-dom"
import Logo from '../../images/dishes-logo.png'
import { GiHamburgerMenu } from 'react-icons/gi';
import './index.scss'

const Header = () => {
    const [showMenu, onClickShowMenu] = useState(false)
    // getting login status and current user name 
    const {isLogged, user} = useSelector((state) => state.dishes)
    const profile = isLogged ? user[0].toUpperCase() : ''
    const dispatch = useDispatch()

    // it changes the login status to false and user name 
    const onClickLogout = () => {
        dispatch(changeLogginState({}))
    }

    return(
        <>
            <nav>
                <Link to="/"><img src={Logo} alt="logo" className="logo" /></Link>
                {/* desktop view controls */}
                <ul className="controls">
                    <Link to="/" className="link" ><li>Home</li></Link>
                    <Link to="/dishes" className="link" ><li>Dishes</li></Link>
                    <Link to="/leaderboard" className="link" ><li>Leader board</li></Link>
                    <Link to="/login" className="link" ><li><button type="button" className="logout-button" onClick={onClickLogout}>Log Out</button></li></Link>
                    <li className="profile"><h1>{profile}</h1></li>
                </ul>
                <button type="button" className='menu-button' onClick={() => onClickShowMenu(!showMenu)}><GiHamburgerMenu className="menu-icon" /></button>
            </nav>
            {/* mobile view controls */}
            {showMenu && (<div className='menu-container'>
                            <ul className="mobile-controls">
                                <Link to="/" className="link" ><li>Home</li></Link>
                                <Link to="/dishes" className="link" ><li>Dishes</li></Link>
                                <Link to="/leaderboard" className="link" ><li>Leader board</li></Link>
                                <Link to="/login" className="link" ><li><button type="button" className="mobile-logout-button" onClick={onClickLogout}>Log Out</button></li></Link>
                                <li><h1 id="user-name">{user.toUpperCase()}</h1></li>
                            </ul>
                          </div>)}
        </>
    )
}

export default Header