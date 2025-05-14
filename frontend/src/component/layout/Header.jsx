import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../actions/authAction";
import Search from "./searchInput";
import {Dropdown} from 'react-bootstrap'
export default function Header() {
    const {isAuthenticated,loading,error,user}=useSelector(state=>state.authState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    

    useEffect(()=>{
        
    },[isAuthenticated])
    const logoutFunction=()=>{
        dispatch(logout)
        toast.success("Logout Successfully",{
            position:'top-center'
        })
    }
    return (
        <header>
            <div className="nav1">
                <Link to={'/'} style={{textDecoration:"none"}} >
                <div className="headlogo display-6">
                    Snapkart
                </div>
                </Link>
                <Search/>
                <ul>
                    
                    {
                        user&&user?
                        <Fragment>
                            <Dropdown>
                                <Dropdown.Toggle variant={'default d-flex align-items-center p-3 text-white'}  >
                                <div className='d-flex align-items-center'>
                                    <div className="img-profile" style={{height:"30px",width:"30px",borderRadius:'50%',overflow:"hidden",border:"2px solid green"}}>
                                        <img src={user.avatar} style={{width:"100%",height:"100%"}} />
                                    </div>
                                    <span className="text-black  ps-1">{user.name}</span>
                                    <i className="fa-solid fa-caret-down text-black ps-1"></i>
                                </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{fontSize:"16px"}}>
                                    {
                                    user.role=="admin"&&
                                    (<Dropdown.Item>
                                        
                                            <li style={{cursor:'pointer'}} onClick={(e)=>{navigate('/admin/dashboard')}}>
                                            
                                                <i className="fa-solid fa-user-tie  " style={{fontSize:"13px"}}></i>
                                                <span  style={{fontWeight:"400",fontSize:"16px"}} >DashBoard</span>
                                            
                                            </li>
                                    </Dropdown.Item>)
                                    }
                                    <Dropdown.Item>
                                        
                                            <li style={{cursor:'pointer'}} onClick={(e)=>{navigate('/profile')}}>
                                            
                                                <i className="fa-solid fa-user  " style={{fontSize:"13px"}}></i>
                                                <span  style={{fontWeight:"400",fontSize:"16px"}} >Profile</span>
                                            
                                            </li>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        
                                            <li style={{cursor:'pointer'}} onClick={(e)=>{navigate('/myorder')}}>
                                            
                                                <i className="fa fa-truck  " style={{fontSize:"13px"}}></i>
                                                <span  style={{fontWeight:"400",fontSize:"16px"}} >Order</span>
                                            
                                            </li>
                                    </Dropdown.Item>
                                    <Dropdown.Item >
                                        <li  onClick={logoutFunction} style={{cursor:'pointer'}}>
                                            <i className="fa-solid fa-right-from-bracket text-danger " style={{fontSize:"13px"}}></i>
                                            <span className="text-danger " style={{fontWeight:"400",fontSize:"16px"}} >Login</span>
                                        </li>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Fragment>:
                        <Fragment>
                            <Link to={'/login'} style={{textDecoration:"none",display:'flex',gap:"5px",alignItems:"center"}}>
                                <i className="fa-solid fa-user"></i>
                                <span>Login</span>
                            </Link>
                            
                        </Fragment>
                        }
                    {/*<i className="fa-solid fa-caret-down"></i>*/}
                    <Link style={{color:'black'}} to={'/cart'}>
                        <li ><i className="fa-solid fa-cart-shopping"></i><span>Cart</span></li>
                    </Link>
                    <li><i className="fa-solid fa-shop"></i><span>Become a Seller</span></li>
                </ul>
                
                <div className="menubtn d-flex">
                    <i className="fa-solid fa-bars mx-3"></i>
                    
                </div>
            </div>
        </header>
    )
}