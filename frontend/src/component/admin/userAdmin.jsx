
import { Fragment } from "react";
import {MDBDataTable} from "mdbreact"
import { getAdminDelete, getAdminUser } from "../../actions/userAction";
import { isDeletedClear,isUpdatedUserClear,errorClear } from "../../slices/userSlice";
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {toast} from "react-toastify"
import Slider from "../admin/slider"

export default function MyOrder(){
    const {user:users,isDeleted,error}=useSelector(state=>state.userState)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(error){
            toast.error(error,{
                position:'top-center',
                onOpen:()=>{
                    dispatch(errorClear())
                }
            })
        }
        if(isDeleted){
            toast.success('Delete Order SuccessFully',{
                position:'top-center',
                onOpen:()=>{
                    dispatch(isDeletedClear())
                }
            })
        }
        dispatch(getAdminUser)
    },[dispatch,isDeleted,error])
    function deleteUserHandler(userId){
        dispatch(getAdminDelete(userId))
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
                    label:"Name",
                    field:'name',
                    sort:'asc'
                },
                {
                    label:"Email",
                    field:'email',
                    sort:'asc'
                },
                {
                    label:"Role",
                    field:'role',
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
        
        users&&users.forEach(user=>{
            data.rows.push({
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                action:<li className="d-flex ">
                    
                    <Link to={`/admin/user/update/${user._id}`} className="btn btn-primary me-1"><i className="fa fa-pencil "></i></Link>
                    <button className="btn btn-danger" onClick={()=>deleteUserHandler(user._id)}><i className="fa fa-trash"></i></button>
                </li>
            })
        })
        return data
    }
    return(
        users&&
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