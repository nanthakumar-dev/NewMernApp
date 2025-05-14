import {Fragment,useState} from "react"
import { useEffect } from "react"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate,useParams} from "react-router-dom"
import {getSingleProduct,updateProduct} from '../../actions/productsAction'
import {errorClear,isUpdatedUserClear} from '../../slices/userSlice'
import {toast} from "react-toastify"
import { getAdminUserDetail, getAdminUserUpdate } from "../../actions/userAction"
export default function CreateProduct(){
    const {userDetail,error,isUpdated}=useSelector(state=>state.userState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {id}=useParams()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [role,setRole]=useState('')
   
    const roleArray=[
        "user","admin"
    ]
   
    function submitHandler(e){
        e.preventDefault()
        const formData={
            name,
            email,
            role
        }
        dispatch(getAdminUserUpdate(id,formData))
    }
    useEffect(()=>{
        if(error){
            toast.error(error,{
                position:'top-center',
                onOpen:()=>{
                    dispatch(errorClear())
                }
            })
            return
        }
        if(isUpdated){
            toast.success("User Updated Successfuly",{
                position:'top-center',
                onOpen:()=>{
                    dispatch(isUpdatedUserClear())
                }
            })
            
        }
        dispatch(getAdminUserDetail(id))
    },[dispatch,error,isUpdated])
   
    useEffect(()=>{
        if(userDetail){
            setName(userDetail.name)
            setEmail(userDetail.email)
            setRole(userDetail.role)
            
        }
    },[userDetail])
    console.log(email)
    return(
        
        <Fragment>
                    <div className="auth-body text-dark">
                        <form onSubmit={submitHandler} className="auth-container">
                            <h1 className='text-dark'>Update Product</h1>
                            
                            
                                <div className="input-field me-3">
                                    <input type="text" value={name} placeholder="Name" onChange={e=>setName(e.target.value)} />
                                    <label htmlFor="" >Name</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" value={email}  placeholder="Email" onChange={e=>setEmail(e.target.value)}  />
                                    <label htmlFor="" >Email</label>
                                </div>
                                <select 
                                onChange={e=>setRole(e.target.value)}
                                value={role}
                                className="input-field w-100">
                                    {
                                        roleArray.map(role=>(
                                            <option key={role} value={role}>{role}</option>
                                        ))
                                    }
                                </select>
                                
                            <button >Update</button>
                        </form>
                    </div>
                </Fragment>
        
    )
}