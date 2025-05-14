import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../layout/Loader";


export default function ProtectedRoute({children,isAdmin}){
    const {user,isAuthenticated,loading}=useSelector(state=>state.authState)
    if(!isAuthenticated && !loading){
        return <Navigate to={'/login'}/>
    }
    if(isAuthenticated){
        if(isAdmin && user.role !== "admin" ){
            return <Navigate to={'/login'}/>
        }
        return children
    }
    return <Loader/>
}