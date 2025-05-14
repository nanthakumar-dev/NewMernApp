import {createSlice} from "@reduxjs/toolkit"
import { isUpdatedClear } from "./productsSlice"

const initialState={
    loading:true,
    user:[]
}

const authSlice = createSlice({
    name:"adminUser",
    initialState,
    reducers:{
        getAdminUserRequest(state,action){
           return { 
            ...state,
            loading:true
        }
        },
        getAdminUserSuccess(state,action){
            return{
                ...state,
                loading:false,
                user:action.payload.user
            }
        },
        getAdminUserFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        getAdminUserDetailRequest(state,action){
           return { 
            ...state,
            loading:true
        }
        },
        getAdminUserDetailSuccess(state,action){
            return{
                ...state,
                loading:false,
                userDetail:action.payload.user
            }
        },
        getAdminUserDetailFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        },
        updateAdminUserRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        updateAdminUserSuccess(state,action){
            return{
                ...state,
                loading:false,
                isUpdated:true
            }
        },
        updateAdminUserFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        deleteAdminUserRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        deleteAdminUserSuccess(state,action){
            return{

                ...state,
                loading:false,
                isDeleted:true
            }
        },
        deleteAdminUserFail(state,action){
            return{

                ...state,
                loading:false,
                error:action.payload
            }
        },
        isUpdatedUserClear(state,action){
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
        errorClear(state,action){
            return{
                ...state,
                error:null
            }
        }
    }
})

const {actions,reducer} = authSlice
export const {
  getAdminUserRequest,getAdminUserSuccess,getAdminUserFail,updateAdminUserRequest,
  updateAdminUserSuccess,getAdminUserDetailRequest,getAdminUserDetailSuccess,getAdminUserDetailFail,
  updateAdminUserFail,deleteAdminUserRequest,deleteAdminUserSuccess,deleteAdminUserFail,
  isDeletedClear,errorClear,isUpdatedUserClear
}=actions
export default reducer