import { Fragment } from "react";
import {MDBDataTable} from "mdbreact"
import { myOrder } from "../../actions/orderAction";
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-router-dom"

export default function MyOrder(){
    const {userOrder}=useSelector(state=>state.orderState)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(myOrder)
    },[dispatch])
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
        userOrder&&userOrder.forEach(order=>{
            data.rows.push({
                id:order._id,
                numOfProduct:order.orderItems.length,
                amount:order.totalPrice,
                status:order.orderStatus.includes("Processing")
                ?<p className="text-danger">{order.orderStatus}</p>
                :<p className="text-success">{order.orderStatus}</p>,
                action:<Link to={`/order/${order._id}`} className="btn btn-primary">
                    <i className="fa fa-eye pe-3"></i>Detail
                </Link>
            })
        })
        return data
    }
    return(
        userOrder&&
        <Fragment>
            <MDBDataTable
            className="px-3"
            bordered
            striped
            data={table()}
            />
        </Fragment>
    )
}