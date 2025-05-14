import axios from "axios"
import { 
    loginRequest,loginSuccess,loginFail,clearAuthError,registerRequest,registerSuccess,registerFail,
    logoutRequest,logoutSuccess,logoutFail,loadUserRequest,loadUserSuccess,loadUserFail,
    changePasswordRequest,changePasswordSuccess,changePasswordFail,updateProfileRequest,updateProfileSuccess,
    updateProfileFail,forgotPasswordRequest,forgotPasswordSuccess,forgotPasswordFail,
    resetPasswordRequest,resetPasswordSuccess,resetPasswordFail
 } from "../slices/authSlice"

export const login=(email,password)=> async(dispatch)=>{
    try{
        dispatch(loginRequest())
        const {data}= await axios.post('/api/v1/login',{email,password})
       console.log(data)
       dispatch(loginSuccess(data))
    }
    catch(err){
        console.log(err.response.data.message)
        dispatch(loginFail(err.response.data.message))
    }
}
export const register=(userData)=> async(dispatch)=>{
    try{
        console.log(userData)
        const config={
            headers:{
                "Content-type":"multipart/form-data"
            }
        }
        dispatch(registerRequest())
        const {data}= await axios.post('/api/v1/register',userData,config)
       console.log(data)
       dispatch(registerSuccess(data))
    }
    catch(err){
        console.log(err.response.data.message)
        dispatch(registerFail(err.response.data.message))
    }
}
export const clearAuthErr=dispatch=>{
    dispatch(clearAuthError())
}
export const logout=async (dispatch)=>{
    try{
        dispatch(logoutRequest())
        await axios.get('/api/v1/logout')
        dispatch(logoutSuccess())
    }
    catch(err){
        dispatch(logoutFail(err.response.data.message))

    }
}
export const loadUser=async (dispatch)=>{
    try{
        dispatch(loadUserRequest())
        const {data}=await axios.get('/api/v1/myprofile')
        console.log(data)
        dispatch(loadUserSuccess(data))
    }
    catch(err){
        dispatch(loadUserFail(err.response.data.message))

    }
}
export const changePassword=(oldPassword,password)=> async(dispatch)=>{
    try{
        dispatch(changePasswordRequest())
        console.log("Hell",oldPassword,password)
        const {data}= await axios.put('/api/v1/password/change',{oldPassword,password})
       console.log(data)
       dispatch(changePasswordSuccess(data))
    }
    catch(err){
        console.log(err.response.data.message)
        dispatch(changePasswordFail(err.response.data.message))
    }
}
export const updateProfile=(formData)=> async(dispatch)=>{
    try{
        dispatch(updateProfileRequest())
        const {data}= await axios.put('/api/v1/update',formData)
       console.log(data)
       dispatch(updateProfileSuccess(data))
    }
    catch(err){
        console.log(err.response.data.message)
        dispatch(updateProfileFail(err.response.data.message))
    }
}
export const forgotPassword=(email)=> async(dispatch)=>{
    try{
        dispatch(forgotPasswordRequest())
        const {data}= await axios.post('/api/v1/password/forgot',{email})
       console.log(data)
       dispatch(forgotPasswordSuccess(data))
    }
    catch(err){
        console.log(err.response.data.message)
        dispatch(forgotPasswordFail(err.response.data.message))
    }
}
export const resetPassword=(token,password,confirmPassword)=> async(dispatch)=>{
    try{
        dispatch(resetPasswordRequest())
        const {data}= await axios.post(`/api/v1/password/reset/${token}`,{password,confirmPassword})
       console.log(data)
       dispatch(resetPasswordSuccess(data))
    }
    catch(err){
        console.log(err.response.data.message)
        dispatch(resetPasswordFail(err.response.data.message))
    }
}