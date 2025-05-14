import {createSlice} from "@reduxjs/toolkit"


const initialState={
    loading:false
    
}

const productsSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        productsRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        productsSuccess(state,action){
            return{
                ...state,
                loading:false,
                products:action.payload.product,
                resPerPage:action.payload.resPerPage,
                count:action.payload.count
            }
        },
        productsFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        productRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        productSuccess(state,action){
            return{
                ...state,
                loading:false,
                product:action.payload
                
                

            }
        },
        productFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        adminProductRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        adminProductSuccess(state,action){
            return{
                ...state,
                loading:false,
                products:action.payload.product
                
            }
        },
        adminProductFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        addReviewRequest(state,action){
            return{
                ...state,
                loading:true,
                isReview:false
            }
        },
        addReviewSuccess(state,action){
            return{
                ...state,
                loading:false,
                product:action.payload,
                isReview:true
                
            }
        },
        addReviewFail(state,action){
            return{
                loading:false,
                error:action.payload,
            }
        },
        createProductRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        createProductSuccess(state,action){
            return{
                ...state,
                loading:false,
                product:action.payload.product,
                isCreated:true
                
            }
        },
        createProductFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        deleteProductRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        deleteProductSuccess(state,action){
            return{
                ...state,
                loading:false,
                isDeleted:true
                
            }
        },
        deleteProductFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        updateProductRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        updateProductSuccess(state,action){
            return{
                ...state,
                loading:false,
                isUpdated:true
                
            }
        },
        updateProductFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        isUpdatedClear(state,action){
            return{
                ...state,
                isUpdated:false
            }
        },
        isDeletedClear(state,action){
            return{
                ...state,
                isDeleted:false
            }
        },
        isCreatedClear(state,action){
            return{
                ...state,
                isCreated:false
            }
        },
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        },
        isReviewClear(state,action){
            return{
                ...state,
                isReview:false
            }
        
    }
    }
})
const {actions,reducer}=productsSlice
export const {
    productsRequest,productsSuccess,productsFail,
    productRequest,productSuccess,productFail,
    addReviewRequest,addReviewSuccess,addReviewFail,isReviewClear,
    adminProductRequest,adminProductSuccess,adminProductFail,
    createProductRequest,createProductSuccess,createProductFail,
    isCreatedClear,clearError,deleteProductRequest,deleteProductSuccess,
    deleteProductFail,isDeletedClear,updateProductRequest,updateProductSuccess,
    updateProductFail,isUpdatedClear
}= actions
export default reducer