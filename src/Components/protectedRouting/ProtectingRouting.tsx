import React from 'react'
import Login from '../../Pages/Login/Login'
import { Navigate } from 'react-router'

export default function ProtectingRouting({children}) {
    if(localStorage.getItem("userToken")){
        return children
    }
    else
        return <Navigate to="/login"/>
}
