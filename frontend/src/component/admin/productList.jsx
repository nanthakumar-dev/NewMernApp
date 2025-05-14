import { MDBDataTable } from "mdbreact";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { getAllProduct,deleteProduct } from "../../actions/productsAction";
import { clearError,isDeletedClear } from "../../slices/productsSlice";
import Slider from "./slider";
import {toast} from "react-toastify"

export default function ProductList(){
    const {products,isDeleted,error} =useSelector(state=>state.productsState)
    const [editId,setEditId]=useState('')
    console.log(editId)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(error){
            toast.error(error,{
                position:'top-center',
                onOpen:()=>{
                    dispatch(clearError())
                }
            })
            return
        }
        if(isDeleted){
            toast.success("Product Deleted Successfully",{
                position:'top-center',
                onOpen:()=>{
                    dispatch(isDeletedClear())
                }
            })
        }
        dispatch(getAllProduct)
    },[dispatch,isDeleted,error])
    const navigate=useNavigate()
    
    function getData(){
        const data={
            columns:[
                {
                    label:"ID",
                    field:'id',
                    sort:'asc'
                },
                {
                    label:"Name",
                    field:'name',
                    sort:'asc'
                },
                {
                    label:"Price",
                    field:'price',
                    sort:'asc'
                },
                {
                    label:"Stock",
                    field:'stock',
                    sort:'asc'
                },
                {
                    label:"Action",
                    field:'action',
                    sort:'asc'
                },
            ],
            rows:[]
        }
        products&&products.forEach(product=>{
            data.rows.push({
                id:product._id,
                name:product.name,
                price:product.price,
                stock:product.stock,
                action:<li>
                    <Link className="btn btn-primary" to={`/admin/product/update/${product._id}`} onClick={()=>setEditId(product._id)}><i className="fa fa-pencil"  ></i></Link>
                    <button className="btn btn-danger" onClick={
                        ()=>{
                        dispatch(deleteProduct(product._id))
                        }}><i className="fa fa-trash"></i></button>
                </li>
            })
        })
        return data
    }
    return(
        products&&
        <Fragment >
            <div style={{width:"100%",display:'flex',gap:'20px'}}>
                <Slider/>
                <MDBDataTable
                className="px-3 w-100 "
                bordered
                striped
                hover
                data={getData()}
                />
            </div>
        </Fragment>
    )
}