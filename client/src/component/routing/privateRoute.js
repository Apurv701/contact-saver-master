import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../spinner/Spinner';

const PrivateRoute = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const { isAuthenticated, loadUser } = authContext;
    useEffect(()=>{
        if(!isAuthenticated && !localStorage.getItem("token")){
            navigate("/login")
        }else{
            loadUser();
        }
    },[isAuthenticated]);

    return <>
       {
        isAuthenticated ? <Outlet /> : <Spinner />
       }
    </>
 
};

export default PrivateRoute;