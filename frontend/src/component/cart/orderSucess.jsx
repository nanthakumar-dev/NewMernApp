import { Fragment } from "react";
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
export default function paymentSuccess(){
    const {user}=useSelector(state=>state.authState)
    const {order}=useSelector(state=>state.orderState)
    return(
        order&&
        <Fragment>
            <div className="container ">
                <div className="order-success-container">
                    <div className="img-contain" style={{height:"200px",width:"200px"}}>

                        <img src="/images/success.png" style={{height:"100%",width:'100%'}}/>
                    </div>
                    <h3>Order Sucesss</h3>
                    <p>Name :  {user.name}</p>
                    <p>Order ID :  {order._id}</p>
                    <Link to="/myorder">More Detail</Link>

                </div>
            </div>
        </Fragment>
    )
}