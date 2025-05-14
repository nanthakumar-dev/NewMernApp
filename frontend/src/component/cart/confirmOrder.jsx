import { useEffect } from "react"
import {Fragment} from "react"
import {useDispatch,useSelector} from "react-redux"
import  { shipppingValidate } from "./shipping"
import { useNavigate,Link } from "react-router-dom"
export default function confirmOrder(){
    const {loading,items:cartItems,shippingInfo,total}=useSelector(state=>state.cartState)
    const {user}=useSelector(state=>state.authState)
    
    const navigate= useNavigate()
    useEffect(()=>{
        shipppingValidate(shippingInfo,navigate)
    },[shippingInfo])
    /*---
    if(items){
            setNumOfProduct(items.length)
        setNumOfQuantity(items.reduce((acc,item)=>{
            return item.quantity+acc
        },0))
        setItemPrice(items.reduce((acc,item)=>{
            console.log("price",typeof(item.price))
            console.log("qty",typeof(item.quantity))
            return Number(Number(acc+(item.price*item.quantity)).toFixed(3))
        },0))
        setTaxPrice(items.reduce((acc,item)=>{
            return Number(Number(item.price*0.05).toFixed(2))
        },0))
        setShippingPrice(50)
        
        setTotalPrice(Number(items.reduce((acc,item)=>{
            console.log("price",typeof(item.price))
            console.log("qty",typeof(item.quantity))
            return Number(Number(acc+(item.price*item.quantity)).toFixed(3))
        },0)+items.reduce((acc,item)=>{
            return Number(Number(item.price*0.05).toFixed(2))
        },0)+(50)).toFixed(2))
    }
    
    --*/
    const numOfProduct=cartItems.length;
    const numOfQuantity=cartItems.reduce((acc,item)=>{
        return item.quantity+acc
    },0);
    const itemPrice=cartItems.reduce((acc,item)=>{
        return Number(Number(acc+(item.price*item.quantity)).toFixed(3))
    },0);
    const taxPrice=Number(Number(itemPrice*0.05).toFixed(2))
    const shippingPrice=itemPrice>=500?0:50;
    const totalPrice=Number(Number(itemPrice+taxPrice+shippingPrice).toFixed(2));
    const priceData={
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }
    
    function orderCheckoutHandler(){
        localStorage.setItem('orderPrice',JSON.stringify(priceData))
        navigate('/payment/process')
    }
    return(
        user&&
        <Fragment>
            <div className="order-container container py-3">
                <div className="order-subcontainer d-flex justify-content-between">
                    <div className="order-left">
                        <div className="shipping-detail">
                            <h1>Shipping Details</h1>
                            <div className="breaker"></div>
                            <div className="common-confirm">
                                <span>Name</span><br/>
                                <span>{user.name}</span>
                            </div>
                            <div  className="common-confirm">
                                <span>Address</span><br/>
                                <span>{shippingInfo.address}</span>
                            </div>
                            <div  className="common-confirm">
                                <span>Phoneno</span><br/>
                                <span>{shippingInfo.phoneno}</span>
                            </div>
                        </div>
                        <div className="order-items">
                            <div className="breaker"></div>
                            <h3>Order Items</h3>
                            <div className="breaker"></div>
                            { 
                           cartItems.map(order=>(
                                <li key={order.product}>
                                    <img src={order.image} alt=""  />
                                    <div className="order-right-content">

                                    <Link to={`/product/${order.product}`}>
                                    <h5>{order.name}</h5>
                                    </Link>
                                    
                                    <h5>${order.price}</h5>
                                    </div>
                                </li>
                            ))
                            }
                        </div>
                    </div>
                    <div className="cart-right">
                                    <h2>Price Detail</h2>
                                    <hr />
                                    <div className="cart-prices-container">
                                        <div className="cart-contain-price common-price">
                                            <span>Product</span>
                                            <span>{numOfProduct}</span>
                                        </div>
                                        <div className="cart-contain-quantity common-price">
                                            <span>Quantity</span>
                                            <span>{numOfQuantity}</span>
                                        </div>
                                        <div className="cart-contain-discount common-price">
                                            <span>Discount</span>
                                            <span>50%</span>
                                        </div>
                                        <div className="total-product-price common-price">
                                            <span>Total Product Price</span>
                                            <span>${itemPrice}</span>
                                        </div>
                                        <div className="tax-price common-price">
                                            <span>Tax</span>
                                            <span>${taxPrice}</span>
                                        </div>
                                       
                                       
                                        <div className="delivery-charge common-price">
                                            <span>Delivery Charge</span>
                                            <span>${shippingPrice}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="total-price common-price">
                                        <span>Total Price</span>
                                            <span>${totalPrice}</span>

                                    </div>
                                    <div className="checkout">
                                        <button className="checkout-btn" onClick={orderCheckoutHandler}>CHECKOUT</button>
                                    </div>
                                </div>
                </div>
            </div>
        </Fragment>
    )
}