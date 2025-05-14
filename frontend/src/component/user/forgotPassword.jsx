import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import { login,clearAuthErr, forgotPassword } from '../../actions/authAction'
import {toast} from "react-toastify"
import { isMessageFalse } from '../../slices/authSlice'
export default function ForgotPassword() {
    const[email,setEmail]=useState('')
    const dispatch=useDispatch()
    const {loading,user,isAuthenticated,error,message}=useSelector(state=>state.authState)
    const navigate=useNavigate()
    function submitHandler(e){
        e.preventDefault()
        dispatch(forgotPassword(email))
    }
    useEffect(()=>{
        if(message){
            toast.success(message,{
                position:"top-center",
                onOpen:()=>{
                    dispatch(isMessageFalse())
                }
            })
            
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
    },[dispatch,isAuthenticated,error,message])
    return (
        <Fragment>
            <div className="auth-body ">
                    <form onSubmit={submitHandler} className="auth-container">
                        <h1 className='text-dark'>Forgot Password</h1>
                        <div className="input-field">
                            <input type="text" placeholder='Email'  onChange={e=>{setEmail(e.target.value)}} />
                                <label htmlFor="" >Email</label>
                        </div>
                        <div></div>
                        
                        <button >Submit</button>
                    </form>
            </div>
        </Fragment>
    )
}