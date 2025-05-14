import { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom"
import { orderDetail as orderDetailAction } from "../../actions/orderAction";

export default function OrderDetail(){
    const {id}=useParams()
    const dispatch=useDispatch()
    const {orderDetail}=useSelector(state=>state.orderState)
    const {user}=useSelector(state=>state.authState)
    useEffect(()=>{
        dispatch(orderDetailAction(id))
    },[dispatch,id])
    return(
        orderDetail&&
        <Fragment>
            
            <div className="container py-5">
                <h1 className="">Order Detail # {orderDetail._id}</h1>
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
        </Fragment>
    )
}