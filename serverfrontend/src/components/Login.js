import React, { useState, useContext } from 'react';
import "./Login.css"
import axios from 'axios';
import { useHistory } from "react-router-dom";
// import AuthContext from '../context/AuthContext';


export default function LogIn() {
    // console.log("setLoginUser" + setLoginUser)
    const [name, setName] = useState("");
    const [passward, setPassward] = useState("");
    console.log("name" + name)
    const [LoginUser, setLoginUser] = useState(true);

    // const { getLoggedIn } = useContext(AuthContext);
    // console.log("getLoggedIn" + getLoggedIn)
    const history = useHistory();

    async function login(e) {
        e.preventDefault();

        try {
            const user = {
                name,
                passward
            }

            // await axios.post("http://localhost:9002/user/login", LogInDate);
            // await getLoggedIn();
            // history.push("/");
            await axios.post("http://localhost:9002/login", user);
            const loggedInRes = await axios.get("http://localhost:9002/loggedIn");
            // console.log(loggedInRes + "loggedInRes")
                        alert(loggedInRes.data.message)
                        console.log(loggedInRes.data.message + "loggedInRes.data.message")
                        setLoginUser(loggedInRes.data.user)
                        console.log(setLoginUser + "setLoginUser")
            // setLoginUser(loggedInRes.data);
                        history.push("/")
        }
        catch (err) {
            console.error();
        }
    }
    return (
        <div className="auth-wrapper">
            <div className="auth-inner login">
                <form onSubmit={login}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Name address</label>
                        <input type="Name" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder="Enter Name" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassward(e.target.value)} value={passward} className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" required />
                            <label className="custom-control-label" htmlFor="customCheck1" >Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">LogIn</button>
                    {/* <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p> */}
                    <div>or</div>
                    <div className="button" onClick={() => history.push("/register")}>Register</div>
                </form>
            </div>
        </div>
    )
}


// import React, {useState} from "react"
// import "./Login.css"
// import axios from "axios"
// import { useHistory } from "react-router-dom";
// // import Dashboard from "./Dashboard";

// const Login = ({ setLoginUser}) => {

//     const history = useHistory()

//     const [ user, setUser] = useState({
//         eid:"",
//         password:""
//     })

//     const handleChange = e => {
//         const { name, value } = e.target
//         setUser({
//             ...user,
//             [name]: value
//         })
//     }

//     const login = () => {
//         axios.post("http://localhost:9002/login", user)
//         .then(res => {
//             alert(res.data.message)
//             setLoginUser(res.data.user)
//             history.push("/")
//         })
//     }

//     return (
//         <div className="login">
//             <h1>Login</h1>
//             <input type="text" name="eid" value={user.eid} onChange={handleChange} placeholder="Enter your Name"></input>
//             <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
//             <div className="button" onClick={login}>Login</div>
//             <div>or</div>
//             <div className="button" onClick={() => history.push("/register")}>Register</div>
//         </div>
//     )
// }

// export default Login;