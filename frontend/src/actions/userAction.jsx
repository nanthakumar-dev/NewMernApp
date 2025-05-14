import axios from "axios"
import {
    getAdminUserRequest,getAdminUserSuccess,getAdminUserFail,updateAdminUserRequest,updateAdminUserSuccess,
    updateAdminUserFail,deleteAdminUserRequest,deleteAdminUserSuccess,deleteAdminUserFail,
    getAdminUserDetailRequest,getAdminUserDetailSuccess,getAdminUserDetailFail
} from "../slices/userSlice"


export const getAdminUser=async dispatch=>{
    
    try{
        dispatch(getAdminUserRequest())
        const {data}=await axios.get('https://newmernapp.onrender.com/api/v1/admin/user')
        console.log(data)
            dispatch(getAdminUserSuccess(data))
        }
        catch(err){
            dispatch(getAdminUserFail(err.response.data.message))
        }
   
}
export const getAdminUserDetail=id=>async dispatch=>{

        try{
            dispatch(getAdminUserDetailRequest())
            const {data}=await axios.get(`https://newmernapp.onrender.com/api/v1/admin/user/${id}`)
            dispatch(getAdminUserDetailSuccess(data))
        }
        catch(err){
            dispatch(getAdminUserDetailFail(err.responsr.data.message))
            
        }
    }
    export const getAdminUserUpdate=(id,userData)=>async dispatch=>{
        
        try{
            dispatch(updateAdminUserRequest())
            const {data}=await axios.put(`https://newmernapp.onrender.com/api/v1/admin/user/${id}`,userData)
            dispatch(updateAdminUserSuccess())
        }
        catch(err){
            dispatch(updateAdminUserFail(err.responsr.data.message))
            
            
        }
    }
export const getAdminDelete=id=>async dispatch=>{

        try{
            dispatch(deleteAdminUserRequest())
            await axios.delete(`https://newmernapp.onrender.com/api/v1/admin/user/${id}`)
            dispatch(deleteAdminUserSuccess())
        }
        catch(err){
            dispatch(deleteAdminUserFail(err.responsr.data.message))
            
        }
}