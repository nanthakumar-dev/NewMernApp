import {
    createOrderRequest,createOrderSuccess,createOrderFail,
    myOrderRequest,myOrderFail,myOrderSuccess,orderDetailRequest,
    orderDetailSuccess,orderDetailFail,
    adminGetRequest,adminGetSuccess,adminGetFail,
    adminDeleteOrderRequest,adminDeleteOrderSuccess,adminDeleteOrderFail,adminUpdateOrderRequest,
    adminUpdateOrderSuccess,adminUpdateOrderFail
} from "../slices/orderSlice"
import axios from "axios"

export const createOrder=order=>async dispatch=>{
    try{
        dispatch(createOrderRequest()) 
        const {data}=await axios.post('/api/v1/order/new',order)
        dispatch(createOrderSuccess(data)) 
    }
    catch(err){
        dispatch(createOrderFail(err)) 
    }

}
export const myOrder=async dispatch=>{
    try{
        dispatch(myOrderRequest()) 
        const {data}=await axios.get('/api/v1/myorder')
        dispatch(myOrderSuccess(data)) 
    }
    catch(err){
        dispatch(myOrderFail(err)) 
    }

}
export const orderDetail=id=>async dispatch=>{
    try{
        dispatch(orderDetailRequest()) 
        const {data}=await axios.get(`/api/v1/order/${id}`)
        dispatch(orderDetailSuccess(data)) 
    }
    catch(err){
        dispatch(orderDetailFail(err)) 
    }

}
export const adminOrderGet=async dispatch=>{
    try{
        dispatch(adminGetRequest()) 
        const {data}=await axios.get(`/api/v1/admin/order`)
        dispatch(adminGetSuccess(data)) 
    }
    catch(err){
        dispatch(adminGetFail(err)) 
    }

}
export const adminOrderUpdate=(id,formData)=>async dispatch=>{
    try{
        dispatch(adminUpdateOrderRequest()) 
        const {data}=await axios.put(`/api/v1/admin/order/${id}`,formData)
        dispatch(adminUpdateOrderSuccess(data)) 
    }
    catch(err){
        dispatch(adminUpdateOrderFail(err.response.data.message)) 
    }

}
export const adminOrderDelete=id=>async dispatch=>{
    try{
        dispatch(adminDeleteOrderRequest()) 
        await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch(adminDeleteOrderSuccess()) 
    }
    catch(err){
        dispatch(adminDeleteOrderFail(err)) 
    }

}