import { useState } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import {toast} from "react-toastify"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, updateProfile } from '../../actions/authAction'
import {clearAuthErr} from '../../actions/authAction'
import Loader from '../../component/layout/Loader'
import { isUpdatedFalse } from '../../slices/authSlice'
export default function Register() {
    const {user,loading,error,isUpdated}=useSelector(state=>state.authState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [lastName,setLastName]=useState("")
    const [dob,setDob]=useState("")
    const [gender,setGender]=useState("")
    const [bio,setBio]=useState("")
    const [avatar,setAvatar]=useState("")
    const [avatarPreview,setAvatarPreview]=useState("/images/user/default-image.jpg")
    function avatarChange(e){
        const file=e.target.files[0]
        if(file){
            setAvatar(file)
            setAvatarPreview(URL.createObjectURL(file))
        }
    }
    function isUpdateFalseFunction(){
        dispatch(isUpdatedFalse())
    }
    useEffect(()=>{
        if(user){
            setName(user.name)
            if(user.avatar){
                setAvatarPreview(user.avatar)
            }
            setLastName(user.lastName)
            setGender(user.gender)
            setBio(user.bio)
            setDob(user.dob)
        }
        if(isUpdated){
            isUpdateFalseFunction()
            toast.success("Updated Profile Successfully",{
                position:'top-center',
                
            })

            navigate('/')
            return
        }
        if(error){
            toast.error(error,{
                position:'top-center',
                onOpen:()=>{
                    dispatch(clearAuthErr)
                }
            })
            return
        }
    },[user,loading,isUpdated,error])
    const submitHandler=(e)=>{
        e.preventDefault()
        const userData={name,bio,gender,dob,avatar}
        const formData=new FormData()
        formData.append("name",name)
        formData.append("lastName",lastName)
        formData.append("dob",dob)
        formData.append("bio",bio)
        formData.append("gender",gender)
        formData.append("avatar",avatar)
        dispatch(updateProfile(formData))
        
    }
    return (
        <Fragment>
            {
                
                loading&&loading?<Loader/>:user&&
                   ( <Fragment>
                        <div className="auth-body text-dark">
                            <form onSubmit={submitHandler} className="auth-container">
                                <h1 className='text-dark'>Update Profile</h1>
                                <div className="avatar">
                                    <label htmlFor="avatar-img">
                                        <div className="avatar-update">
                                            <img src={avatarPreview} alt="" />
                                        </div>
                                    </label>
                                    <input type="file" id='avatar-img' onChange={avatarChange} hidden />
                                </div>
                                <div className="input-combine d-flex">
                                    <div className="input-field me-3">
                                        <input type="text" placeholder="First name" value={name} name='name' onChange={(e)=>setName(e.target.value)} />
                                        <label htmlFor="" >First Name</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                                        <label htmlFor="" >Last Name</label>
                                    </div>
                                </div>
                                
                                <div className="dob">
                                    <label to="date">Date Of Birth</label><br />
                                    <input type="date" name="dob" value={dob} onChange={(e)=>setDob(e.target.value)} id="date" />
                                </div>
                                <div className="gender">
                                    <div>Genger</div>
                                    <input type="radio" name="gender" checked={gender=='male'} id="male" value='male' onChange={(e)=>setGender(e.target.value)} className='m-2' /><label htmlFor="male">Male</label>
                                    <span style={{padding:'5px'}}></span>
                                    <input type="radio" checked={gender=='female'}  name="gender" id="female" value='female' className='m-2'onChange={(e)=>setGender(e.target.value)} /><label htmlFor="female">Female</label>
                                </div>
                                <div className="bio">
                                    <textarea name="bio" onChange={(e)=>setBio(e.target.value)} id="" value={bio} cols="30" rows="3" placeholder='Enter Your Bio..' className='p-2'></textarea>
                                </div>

                                
                                <button disabled={loading}>Update</button>
                            </form>
                        </div>
                    </Fragment>)
            }
        </Fragment>
    )
}