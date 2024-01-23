import React, { useReducer } from "react";
import AuthContext from "./authContext";
import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import authReducer from "./authReducer";

import { REGISTER_FAIL,
         REGISTER_SUCCESS,
         USER_LOADED,
         AUTH_ERROR,
         LOGIN_SUCCESS,
         LOGIN_FAIL,
         LOGOUT,
         CLEAR_ERRORS, } from "../Types";




const AuthState = props => {
    const initialState = {token: localStorage.getItem('token'),
                          isAuthenticated: null,
                          user: null,
                          loading: true,
                          error: null}
const [state,dispatch] = useReducer(authReducer,initialState);

const loadUser = async () => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get('/api/auth');
        dispatch({type: USER_LOADED, payload: res.data});
}
    catch(error){
            dispatch({type: AUTH_ERROR});
    }
};

const register = async formData => {
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    try{
        const res = await axios.post('/api/users',formData,config);
        localStorage.setItem("token",res.data.token)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        loadUser();
    }catch(error){
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.msg
        });
    }
}

const login = async formData =>{
    const config = {
        headers:{
            'content-type': 'application/json'
        }
    }
    
    try{
        const res = await axios.post('/api/auth', formData, config);
        localStorage.setItem("token",res.data.token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        loadUser();
    }catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.msg
        });
    }
}

const logout = () => {
    dispatch({ type: LOGOUT });
}

const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
}

return (
    <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            clearErrors,
            loadUser,
            login,
            logout

        }}>
        {props.children}
    </AuthContext.Provider>
)

}

export default AuthState;