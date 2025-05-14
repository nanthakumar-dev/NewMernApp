import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import  {shipppingValidate} from './shipping'
import {CardCvcElement,CardExpiryElement, CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js"
import axios from "axios";
import { toast } from "react-toastify";
import {createOrder} from "../../actions/orderAction"

export default function payment(){
    const {shippingInfo,total,items}=useSelector(state=>state.cartState)
    const {user}=useSelector(state=>state.authState)
    const navigate=useNavigate()
    const stripe=useStripe()
    const elements=useElements()
    const dispatch=useDispatch()
    
    const orderPrice=localStorage.getItem('orderPrice')?JSON.parse(localStorage.getItem('orderPrice')):{}
    const order={
        shippingInfo,
        orderItems:items

    }
    order.itemPrice=orderPrice.itemPrice
    order.taxPrice=orderPrice.taxPrice
    order.shippingPrice=orderPrice.shippingPrice
    order.totalPrice=orderPrice.totalPrice
    const processData={
            amount:'50',
            currency:'usd',
            shipping:{
              name:user.name,
              address:{
                country:shippingInfo.country,
                state:shippingInfo.city,
                line1:shippingInfo.address
              },
              phone:shippingInfo.phoneno
            }
          
    }
    let result;
    async function submitHandler(e){
        e.preventDefault()
        document.querySelector('#payment-btn').disabled=true
        try{
            
            const {data}=await axios.post('https://newmernapp.onrender.com/api/v1/payment/process',processData)
            
            result=await stripe.confirmCardPayment(data.client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email
                    }
                }
            })

            document.querySelector('#payment-btn').disabled=false
            if(result.error){
                toast.error(result.error.message,{
                    position:'top-center'
                })
            }else{
                if(result.paymentIntent.status=='succeeded'){
                    order.paymentDetail={
                        id:result.paymentIntent._id,
                        status:result.paymentIntent.status,
                    }
                    sessionStorage.setItem("order",JSON.stringify(order))
                    dispatch(createOrder(order))
                    navigate('/order/success')
                    toast.success("Payment Transwer Successfully",{
                        position:'top-center'
                    })
                    
                }
                else{
                    toast.error("Money Transfer Failed Try Again",{
                        position:'top-center'
                    })
                }
            }
           
        }
        catch(err){
            console.log("Eroro",err.response.data.message)
        }

        
    }
    useEffect(()=>{
       
        
    },[shippingInfo,result,dispatch])
    return(
        <Fragment>
            <div className="auth-body text-dark">
                <form onSubmit={submitHandler} className="auth-container">
                    <h1 className='text-dark'>Payment</h1>
                       
                        <div className="input-field">
                            <CardNumberElement
                            
                             type='text' style={{border:"2px solid black"}}/>
                        </div> 
                        <div className="input-field">
                            <CardExpiryElement type='text'/>
                            
                        </div> 
                        <div className="input-field">
                        <CardCvcElement type='text'/>
                        </div> 
                       
                            

                    <button id="payment-btn" >PAY - {total?total:''}</button>
                        
                </form>
            </div>
        </Fragment>
    )
}