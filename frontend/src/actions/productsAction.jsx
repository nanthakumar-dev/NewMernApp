import axios from "axios"
import { useParams } from "react-router-dom"
import {
    productsRequest,productsSuccess,productsFail,
    productRequest,productSuccess,productFail,
    addReviewRequest,addReviewSuccess,addReviewFail,
    adminProductRequest,adminProductSuccess,adminProductFail,
    createProductRequest,createProductSuccess,createProductFail,
    deleteProductRequest,deleteProductSuccess,deleteProductFail,
    updateProductRequest,updateProductSuccess,updateProductFail,
} from "../slices/productsSlice"
export const getProducts=(page,search,category)=>async(dispatch)=>{
    try{
        console.log("Search",search)
        dispatch(productsRequest())
        let link= `https://newmernapp.onrender.com/api/v1/product?page=${page}`
        console.log("Search",search)
        if(search){
            if(search.trim()!==""){
                link+=`&keyword=${search}`
            }
            

        }
        if(category){
                link+=`&category=${category}`
        }
        const {data} = await axios.get(link)
        dispatch(productsSuccess(data))
    }
    catch(err){
        console.log(err.response.data.message)
        dispatch(productsFail(err.response.data.message))
    }
}
export const getSingleProduct=id=>async(dispatch)=>{
    try{
        console.log(id)
        dispatch(productRequest())
        
        const {data} = await axios.get(`https://newmernapp.onrender.com/api/v1/product/${id}`)
        dispatch(productSuccess(data.product))
    }
    catch(err){
        console.log(err.response.data.message)
        dispatch(productFail(err.response.data.message))
    }
}
export const addReview=review=>async(dispatch)=>{
    try{
        
        dispatch(addReviewRequest())
        
        const {data} = await axios.put(`https://newmernapp.onrender.com/api/v1/review`,review)
        dispatch(addReviewSuccess(data.product))
    }
    catch(err){
        console.log(err.response.data.message)
        dispatch(addReviewFail(err.response.data.message))
    }
}
export const getAllProduct=async(dispatch)=>{
    try{
        
        dispatch(adminProductRequest())
        const {data} = await axios.get(`https://newmernapp.onrender.com/api/v1/admin/product`)
        dispatch(adminProductSuccess(data))
    }
    catch(err){
        dispatch(adminProductFail(err.response.data.message))
    }
}
export const createNewProduct=formData=>async(dispatch)=>{
    try{
        
        dispatch(createProductRequest())
        const {data} = await axios.post(`https://newmernapp.onrender.com/api/v1/product/new`,formData)
        dispatch(createProductSuccess(data))
    }
    catch(err){
        dispatch(createProductFail(err.response.data.message))
    }
}
export const deleteProduct=id=>async(dispatch)=>{
    try{
        
        dispatch(deleteProductRequest())
        const {data} = await axios.delete(`https://newmernapp.onrender.com/api/v1/admin/product/${id}`)
        dispatch(deleteProductSuccess(data))
    }
    catch(err){
        dispatch(deleteProductFail(err.response.data.message))
    }
}
export const updateProduct=(id,formData)=>async(dispatch)=>{
    try{
        console.log(id)
        console.log(formData)
        dispatch(updateProductRequest())
        const {data} = await axios.put(`https://newmernapp.onrender.com/api/v1/admin/product/${id}`,formData)
        dispatch(updateProductSuccess(data))
    }
    catch(err){
        dispatch(updateProductFail(err.response.data.message))
    }
}