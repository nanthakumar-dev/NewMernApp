import { Fragment ,useState,useEffect} from "react";
import{useDispatch, useSelector} from "react-redux"
import{useNavigate} from "react-router-dom"
import Loader from '../layout/Loader'
import {countries} from "countries-list"
import {saveShippingInfo} from "../../slices/cartSlice"
import {toast} from 'react-toastify'

export const shipppingValidate=(shipping,navigate)=>{
    
    if(
        !shipping.address||     
        !shipping.city||     
        !shipping.phoneno||     
        !shipping.postalCode||     
        !shipping.state||     
        !shipping.country    
        ){
        
            toast.error('Please fil the form',{
                position:'top-center'
            })
            navigate('/shipping')
    }
}

export default function shipping(){
    const [address,setAddress]=useState()
    const [city,setCity]=useState()
    const [phoneno,setPhoneno]=useState()
    const [postalCode,setPostalCode]=useState('')
    const [country,setCountry]=useState('')
    const [state,setState]=useState('')
    const{loading,shippingInfo}=useSelector(state=>state.cartState)
    const{user}=useSelector(state=>state.authState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    let countriesObj=Object.values(countries)

    useEffect(()=>{
        if(shippingInfo){
            setPhoneno(shippingInfo.phoneno)
            setAddress(shippingInfo.address)
            setCity(shippingInfo.city)
            setCountry(shippingInfo.country)
            setPostalCode(shippingInfo.postalCode)
            setState(shippingInfo.state)
        }
    },[shippingInfo])
    function submitHandler(e){
        e.preventDefault();
        console.log(address)
        console.log(country)
        console.log(phoneno)
        
        dispatch(saveShippingInfo({address,city,phoneno,postalCode,country,state}))
        navigate('/confirm/order')
    }
    return(
        <Fragment>
            {
                
                loading&&loading?<Loader/>:
                shippingInfo&&
                   ( <Fragment>
                        <div className="auth-body text-dark">
                            <form onSubmit={submitHandler} className="auth-container">
                                <h1 className='text-dark'>Shipping Info</h1>
                                
                               
                                    <div className="input-field me-3">
                                        <input type="text" placeholder="Address" value={address} name='address' onChange={(e)=>setAddress(e.target.value)} />
                                        <label htmlFor="" >Address</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City"  />
                                        <label htmlFor="" >City</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="number"  value={phoneno} placeholder="PhoneNo" onChange={(e)=>{setPhoneno(e.target.value)}} />
                                    <label htmlFor=""  >PhoneNo</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="number" value={postalCode}  onChange={(e)=>setPostalCode(e.target.value)} placeholder="PostalCode"  />
                                        <label htmlFor="" >PostalCode</label>
                                    </div>
                                    <select name="country" id="" className="p-2 " value={country}  onChange={(e)=>setCountry(e.target.value)}>
                                        {
                                            countriesObj.map(country=>(
                                                <option key={country.name} value={country.name}  >{country.name}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="input-field">
                                        <input type="text" value={state}  onChange={(e)=>setState(e.target.value)} placeholder="State"  />
                                        <label htmlFor=""   >State</label>
                                    </div>
                                
                                
                              
                                
                                <button disabled={loading}>Update</button>
                            </form>
                        </div>
                    </Fragment>)
            }
        </Fragment>
    )
}