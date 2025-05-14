import { useEffect, useState,Fragment } from 'react'

import { Link, useNavigate,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import { clearAuthErr,resetPassword } from '../../actions/authAction'
import {toast} from "react-toastify"
export default function ResetPassword() {
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const {loading,user,isAuthenticated,error}=useSelector(state=>state.authState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {token}=useParams()
    
    
    useEffect(()=>{
        if(isAuthenticated){
            toast.success("Password Changed Success",{
                position:"top-center"
            })
        }
        
    },[dispatch,isAuthenticated,error])
    function submitHandler(e){
        e.preventDefault()
        console.log(password)
        console.log(confirmPassword)
        dispatch(resetPassword(token,password,confirmPassword))
    }
    return (
        <Fragment>
            <div className="auth-body ">
                    <form onSubmit={submitHandler} className="auth-container">

                        <h1 className='text-dark'>Reset Password</h1>
                        <div className="input-field">
                            <input type="text" placeholder='Password' onChange={e=>{setPassword(e.target.value)}}  />
                                <label htmlFor="" >Password</label>
                        </div>
                        <div></div>
                        <div className="input-field">
                            <input type="text"  placeholder='Confirm Password 'onChange={e=>{setConfirmPassword(e.target.value)}}/>
                                <label htmlFor="">Confirm Password</label>
                        </div>
                        <div></div>
                        
                        <button >Submit</button>
                    </form>
            </div>
        </Fragment>
    )
}