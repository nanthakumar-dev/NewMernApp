import { useState } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import {toast} from "react-toastify"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/authAction'
import {clearAuthErr} from '../../actions/authAction'
export default function Register() {
    const dispatch=useDispatch()
    const{loading,isAuthenticated,error,user}=useSelector(state=>state.authState)
    const navigate=useNavigate()
    const [userData,setUserData]=useState({
        name:"",
        email:"",
        password:""
    })
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/user/default-image.jpg')
    function onChanger(e) {
        const name=e.target.name
        const value=e.target.value
        setUserData(preData=>({...preData,[name]:value}))
        
       
    }
    function onCH(e){
            const file = e.target.files[0]
            console.log("step1")
            if (file) {
                console.log("step2")
    
                const reader=new FileReader();
                setAvatar(e.target.files[0])
                console.log(avatar)
                console.log(reader.readAsDataURL(e.target.files[0]))
                setAvatarPreview(URL.createObjectURL(file))
            }
        
    }
    const formData = new FormData()
    formData.append("name",userData.name)
    formData.append("email",userData.email)
    formData.append("password",userData.password)
    formData.append("avatar",avatar)
    function submitHandler(e){
        e.preventDefault()
        dispatch(register(formData))
    }
    useEffect(()=>{
        if(isAuthenticated){
            toast.success("Register Success",{
                position:"top-center"
            })
            navigate('/profile/update')
            return
            
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
    },[dispatch,isAuthenticated,error,avatar])

    return (
        <Fragment>
            <div className="auth-body">
                <img src="./images/background/1 (3).jpg" alt="" className='backbanner' />
                <form onSubmit={submitHandler} className="auth-container">
                    <h1>SIGNUP</h1>
                    <div className="input-field">
                        <input type="text" placeholder="Username" name='name' onChange={onChanger} />
                        <label htmlFor="" >Username</label>
                    </div>
                    <div className="input-field">
                        <input type="text" placeholder='Email' name='email' onChange={onChanger} />
                        <label htmlFor="">Email</label>
                    </div>
                    <div className="input-field">
                        <input type="text" placeholder='Password ' name='password' onChange={onChanger} />
                        <label htmlFor="">Password</label>
                    </div>
                    

                    <div className="terms">
                        <input type="checkbox" /><span style={{ color: "white", fontSize: "13px" }}>We Are Accept Terms & condition</span>
                    </div>
                    <Link to={"/login"}>Do You have Already An Account ?</Link>
                    <button disabled={loading}>Signup</button>
                </form>
            </div>
        </Fragment>
    )
}