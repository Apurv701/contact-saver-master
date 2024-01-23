import React from "react";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/alertState";
import { Outlet } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import Alerts from "./component/layout/Alerts";
import ContactState from "./context/contact/ContactState";
import './App.css';

const Store = () =>{
    return(
            
            <AuthState>
            <ContactState>
              <AlertState>
              <>
                <Navbar />
                <Alerts/>
                <div className="container">
                <Outlet />
                </div>
                </>
              </AlertState>
              </ContactState>
            </AuthState>
            
        
        )
}

export default Store;