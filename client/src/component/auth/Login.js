import React, { useContext, useEffect, useState } from "react";
import alertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const AlertContext = useContext(alertContext);
    const authContext = useContext(AuthContext);
    let navigate = useNavigate();

    const {setAlert} = AlertContext;
    const {login, error, clearErrors, isAuthenticated} = authContext;

    useEffect(()=>{
        if(isAuthenticated){
            navigate("/home");
        }
        console.log(error);
        if(error==='Invalid Credentials'){
            setAlert(error,'secondary');
            clearErrors();
        }
        if(error==='Please include a valid email'){
            setAlert(error,'secondary');
            clearErrors();
        }
    },[error, isAuthenticated])
    
    const [user, setUser] = useState({

        email: "",
        password: "",

    })
    const { email, password } = user;

    const onChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

const onSubmit = (event) =>{
    event.preventDefault();
    if(email === "" || password === ""){
        setAlert('Please fill in all fields', 'secondary')
    }
    else{
        login({
            email,
            password
        });
    }
}

    return(
        <div className="form-container">
            <h1>Account <span className="txtlog">Login</span> </h1>
            <br/>
            <form onSubmit={onSubmit}>

                
                <div className="form-group">
                    <h3><label htmlFor="Email">Email Address :</label></h3>
                    <input className="form-control" type="email" value={email} name="email" placeholder="Email" onChange={onChange} />
                </div>
                 <br/>
                <div className="form-group">
                    <h3><label htmlFor="password">Password :</label></h3>
                    <input className="form-control"  type="text" value={password} name="password" placeholder="Password" onChange={onChange} />
                </div>
                <br/>
                <input type="submit" value="Login" className="btn-cls" />
                


            </form>
            <center>

            </center>
        </div>
        )
}

export default Login;