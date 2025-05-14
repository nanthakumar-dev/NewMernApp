import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import { login,clearAuthErr } from '../../actions/authAction'
import {toast} from "react-toastify"
export default function Login() {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [selectEmail,setSelectEmail]=useState(false)
    const [selectPassword,setSelectPassword]=useState(false)
    

    
    const dispatch=useDispatch()
    const {loading,user,isAuthenticated,error}=useSelector(state=>state.authState)
    const navigate=useNavigate()
    function submitHandler(e){
        e.preventDefault()
       dispatch(login(email,password))
    }
    const location=useLocation()
    let search=location.search
    search=search.split("=")[1]
    
    useEffect(()=>{
        if(isAuthenticated){
            toast.success("Login Success",{
                position:"top-center"
            })

            if(search){
                return navigate('/'+search)
            }
            
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
    },[dispatch,isAuthenticated,error])
    return (
        <Fragment>
            <div className="auth-body">
                <img src="./images/background/1 (3).jpg" alt="" className='backbanner' />
                    <form onSubmit={submitHandler} className="auth-container">

                        <h1>LOGIN</h1>
                        <div className="input-field">
                            <input type="text" placeholder='Email'  onChange={e=>{setEmail(e.target.value)}} value={email}/>
                                <label htmlFor="" >Email</label>
                        </div>
                        <div className="input-field">
                            <input type="password" onChange={e=>{setPassword(e.target.value)}} placeholder='Password '/>
                                <label htmlFor="">Password</label>
                        </div>
                        <div className="">

                        <Link to={'/password/forgot'}>Forgot Password ?</Link>
                        <br/>
                        <Link to={'/register'} style={{textDecoration:"none"}}>Are You New User ?</Link>
                        </div>
                        <button >Login</button>
                    </form>
            </div>
        </Fragment>
    )
}