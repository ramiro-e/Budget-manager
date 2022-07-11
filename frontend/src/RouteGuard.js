import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
 
const RouteGuard = ({ element: Component, ...rest }) => {
 
    function hasJWT() {
        let storedLoginToken = JSON.parse(localStorage.getItem("loginToken"))
        let now = new Date()

        if(storedLoginToken){
            if (now.getTime() > storedLoginToken.expiration) {
                return false
            }else{
                return true
            }
        }
        return false
    }

    return(
        hasJWT() ? <Outlet/> : <Navigate to="/login"/>
    )
};
 
export default RouteGuard;