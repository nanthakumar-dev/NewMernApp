
import { Fragment } from "react";
import {MDBDataTable} from "mdbreact"
import { adminOrderDelete, adminOrderGet } from "../../actions/orderAction";
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {toast} from "react-toastify"
import Slider from "../admin/slider"

export default function MyOrder(){
    const {order:orders,isOrderDeleted}=useSelector(state=>state.orderState)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(isOrderDeleted){
            toast.success('Delete Order SuccessFully',{
                position:'top-center'
            })
        }
        dispatch(adminOrderGet)
    },[dispatch,isOrderDeleted])
    function deleteOrderHandler(orderId){
        dispatch(adminOrderDelete(orderId))
    }
    const table=()=>{

        const data={
            columns:[
                {
                    label:"ID",
                    field:'id',
                    sort:'asc'
                },
                {
                    label:"NumOfProduct",
                    field:'numOfProduct',
                    sort:'asc'
                },
                {
                    label:"Amount",
                    field:'amount',
                    sort:'asc'
                },
                {
                    label:"Status",
                    field:'status',
                    sort:'asc'
                },
                {
                    label:"Action",
                    field:'action',
                    sort:'asc'
                }
            ],
            rows:[]
        }
        
        orders&&orders.forEach(order=>{
            data.rows.push({
                id:order._id,
                numOfProduct:order.orderItems.length,
                amount:order.totalPrice,
                status:order.orderStatus.includes("Processing")
                ?<p className="text-danger">{order.orderStatus}</p>
                :<p className="text-success">{order.orderStatus}</p>,
                action:<li className="d-flex ">
                    <Link to={`/admin/order/update/${order._id}`} className="btn btn-primary me-1"><i className="fa fa-pencil "></i></Link>
                    <button className="btn btn-danger" onClick={()=>deleteOrderHandler(order._id)}><i className="fa fa-trash"></i></button>
                </li>
            })
        })
        return data
    }
    return(
        orders&&
        <Fragment>
            <div className="d-flex">

                <Slider/>
                <MDBDataTable
                className="px-3 w-100"
                bordered
                striped
                data={table()}
                />
            </div>
        </Fragment>
    )
}