import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { changeLogginState } from "../../Features/Dishes/dishesSlicer"
import login from '../../images/login.jpg'
import Logo from '../../images/dishes-logo.png'
import "./index.scss"

const users = [{user: "prasad", password: "prasad123"}, {user: "mahesh", password: "mahesh123"}, {user: "ram", password: "ram123"}, {user: "anand", password: "anand123"}, {user: "renu", password:"renu123"}]

const Login = () => {
    // initializing state
    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [error, changeErrorStatus] = useState('')
    const [errorMassage, changeErrorMassage] = useState('')

    // getting loggin status and users from store
    const { isLogged } = useSelector((store) => store.dishes)

    // waking functions
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // checking for user login status
    useEffect(()=>{
        if (isLogged){
            navigate("/")
        }
    })
    

    // handling loggin function
    const sendLoginRequest = event => {
        event.preventDefault()
        if(username !== "" && password !== ""){
            const [userData] = users.filter(each => each.user === username)
            if (userData !== undefined) {
                if (userData.password === password){
                            changeErrorMassage("")
                            changeErrorStatus(false)
                            changeUsername("")
                            changePassword("")
                            dispatch(changeLogginState({username}))
                        }
                        else{
                            changeErrorMassage("*Password Not Matched")
                            changeErrorStatus(true)
                        }
                }else{
                    changeErrorStatus(true)
                    changeErrorMassage("*User Not Found")
                }
            }else{
                changeErrorStatus(true)
                changeErrorMassage("*Please Enter Valid User Name And Password")
            }
    }

    return(
        <div className="login-background-container">
            <img src={login} alt="login" className="login-page-side-img" />
            <div>
                <div className="form-container">
                    <form onSubmit={sendLoginRequest}>
                        <img src={Logo} alt="logo" className="form-top-logo" />
                        <label htmlFor="user">User Name</label>
                        <input type="text" id="user" placeholder="Enter Your User Name" value={username} onChange={(event) => {changeUsername(event.target.value)} } />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Your Password" value={password} onChange={(event) => {changePassword(event.target.value)}} />
                        <button type="submit">Log In</button>
                        {error && <p>{errorMassage}</p> }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login