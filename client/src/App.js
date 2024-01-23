import React from "react";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import setAuthToken from "./utils/setAuthToken";
import Home from "./Pages/Home";
import AuthGuard from "./component/routing/privateRoute";
import { createBrowserRouter } from "react-router-dom";

import Store from "./Store";
// if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

const router = createBrowserRouter([
    {
        path: "",
        element: <Store />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/",
                element: <AuthGuard />,
                children: [
                    {
                        path: "home",
                        element: <Home />,
                    }
                ],
            }
        ]
        
    }
]);

export default router;
