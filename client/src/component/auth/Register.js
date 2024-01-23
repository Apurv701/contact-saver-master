import React, { useState, useContext, useEffect } from 'react'
import AlertContext from './../../context/alert/alertContext'
import AuthContext from './../../context/auth/authContext'
import { useNavigate } from 'react-router-dom'

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authtContext = useContext(AuthContext);
    let navigate = useNavigate();

    const { setAlert } = alertContext;

    const { register, error, clearErrors, isAuthenticated } = authtContext;

    useEffect(() => {



        if (isAuthenticated) {
            navigate("/home");
        }
        if (error === 'User already exist') {
            setAlert(error, 'secondary');
            clearErrors();

        }
        //eslint-disable-next-line
    }, [error, isAuthenticated])

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    })
    const { name, email, password, password2 } = user;

    const onChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }
    

    const onSubmit = (event) => {
        event.preventDefault();
        if (name === "" || email === "" || password === "") {
            setAlert("No field should be left empty",'secondary');
        } else if (password !== password2) {
            setAlert("Both password doesnot match",'secondary');
        } else {
            register({
                name,
                email,
                password
            })
        }
        setUser({
            name: "",
            email: "",
            password: "",
            password2: ""
        })

        

    }
    return (
        <div className="form-container">
            <h1>Account <span className="txtreg">Register</span> </h1>
            <br/>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <h3><label htmlFor="name">Name :</label></h3>
                    <input className='form-control' type="text" value={name} name="name" placeholder="Name" onChange={onChange} />
                </div>
                <br/>
                <div className="form-group">
                    <h3><label htmlFor="Email">Email Address :</label></h3>
                    <input className='form-control' type="text" value={email} name="email" placeholder="Email" onChange={onChange} />
                </div>
                <br/>
                <div className="form-group">
                    <h3><label htmlFor="password">Password :</label></h3>
                    <input className='form-control' type="text" value={password} name="password" placeholder="Password" onChange={onChange} />
                </div>
                <br/>
                <div className="form-group">
                    <h3><label htmlFor="password2">Confirm Password :</label></h3>
                    <input className='form-control' type="text" value={password2} name="password2" placeholder="Confirm Password" onChange={onChange} />
                </div>
                <br/>
                <input type="submit" value="Register" className="btn-cls2" />


            </form>
        </div>
    )
}

export default Register;