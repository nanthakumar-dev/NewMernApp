import { useEffect } from "react";
import { Fragment,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom"
import { orderDetail as orderDetailAction,adminOrderUpdate } from "../../actions/orderAction";
import {toast} from "react-toastify"
import Slider from "../admin/slider";
import { errorClear, isOrderUpdatedClear } from "../../slices/orderSlice";

export default function OrderUpdatel(){
    const {id}=useParams()
    const dispatch=useDispatch()
    const {orderDetail,isOrderUpdated,isOrderDeleted,error}=useSelector(state=>state.orderState)
    const {user}=useSelector(state=>state.authState)
    const[orderStatus,setOrderStatus]=useState('')
    useEffect(()=>{
        if(error){
            toast.error(error,{
                position:'top-center',
                onOpen:()=>{
                    dispatch(errorClear())
                }
            })
        }
        if(isOrderUpdated){
            toast.success("Order Updated Successfully",{
                position:'top-center',
                onOpen:()=>{
                    dispatch(isOrderUpdatedClear())
                }
            })
        }
        dispatch(orderDetailAction(id))
    },[dispatch,id,error,isOrderUpdated])
    
    useEffect(()=>{
        if(orderDetail){
            setOrderStatus(orderDetail.orderStatus)
        }
    },[orderDetail])
    function submitHandler(){
        const orderData={
            orderStatus,
        }
        dispatch(adminOrderUpdate(id,orderData))
    }
    return(
        orderDetail&&
        <Fragment>
            <div className="d-flex">
            <Slider/>
            <div className="container d-flex">
                <div className="py-5 me-4">
                    <h1 className="">Order Update # {orderDetail._id}</h1>
                    <hr />
                    <div className="common-order-detail">
                        <h4>Name</h4>
                        <p>{user&& user.name}</p>
                    </div>
                    <div className="common-order-detail">
                        <h4>Address</h4>
                        <p>{
                        orderDetail.shippingInfo.address+","+orderDetail.shippingInfo.city+","+orderDetail.shippingInfo.state+","+orderDetail.shippingInfo.country
                        }</p>
                    </div>
                    <div className="common-order-detail">
                        <h4>Phoneno</h4>
                        <p>{orderDetail.shippingInfo.phoneno}</p>
                    </div>
                    <hr />
                    <div className="common-order-detail">
                        <h4>Paid</h4>
                        <p>isPaid</p>
                    </div>
                    <div className="common-order-detail">
                        <h4>Status</h4>
                        <p>{orderDetail.orderStatus}</p>
                    </div>
                    <div className="star-font">
                    <div className="star-out">
                        <div className="star-in"></div>
                    </div>
                    </div>
                    <div className="order-items">
                        <h3>Order Items</h3>
                        {
                            orderDetail.orderItems.map(order=>(

                                <div className="order-item d-flex align-items-center" key={order._id}>
                                    <div className="img-contain">
                                        <img src={order.image} alt="" />
                                    </div>
                                    <div className="order-separate">
                                        <Link className="product-name" to={'/product/'+order.product}>
                                            {order.name}
                                        </Link>
                                        <div className="price">
                                            $ {order.price}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                </div>
                <div className="orderStatus">
                        <h3>Order Status</h3>
                        <select className="px-3 py-1 ms-3" value={orderStatus} onChange={e=>setOrderStatus(e.target.value)} name="orderStatus" id="orderStatus">
                            <option value="Processing">Processing</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        <button className="btn btn-primary ms-3 mt-2" onClick={submitHandler}>Submit</button>
                </div>
            </div>
            </div>
        </Fragment>
    )
}