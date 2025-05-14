import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import { login,clearAuthErr,changePassword } from '../../actions/authAction'
import {toast} from "react-toastify"
export default function PasswordChange() {
    const[oldPassword,setOldPassword]=useState('')
    const[password,setPassword]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {loading,user,isAuthenticated,isUpdated,error}=useSelector(state=>state.authState)
  
    function submitHandler(e){
        e.preventDefault()
        dispatch(changePassword(oldPassword,password))
       
    }
    useEffect(()=>{
        
        if(isUpdated){
            toast.success("Password Changed Successfully",{
                position:"top-center", 
                
            })
            navigate('/')
        }
        if(error){
            toast.error(error,{
                position:"top-center",  
                onOpen:()=>{
                    dispatch(clearAuthErr)
                }  
            })
            return
        }
    },[dispatch,isAuthenticated,error,isUpdated])
    return (
        <Fragment>
            <div className="auth-body ">
                    <form htmlFor="" onSubmit={submitHandler} className="auth-container">
                        <h1 className='text-dark'>Change Password</h1>
                        <div className="input-field">
                            <input type="text" placeholder='Old Password'  onChange={e=>{setOldPassword(e.target.value)}} />
                                <label htmlFor="" >Old Password</label>
                        </div>
                        <div></div>
                        <div className="input-field">
                            <input type="password" onChange={e=>{setPassword(e.target.value)}} placeholder='New Password '/>
                                <label htmlFor="">New Password</label>
                        </div>
                        <div></div>
                        
                        <button type="submit" >Submit</button>
                    </form>
            </div>
        </Fragment>
    )
}