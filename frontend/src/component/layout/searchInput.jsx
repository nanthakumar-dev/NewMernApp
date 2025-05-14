import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search(){
    const [search,setSearch]=useState('')
    
    const navigate=useNavigate()
    function submitHandler(e){
        e.preventDefault()
        if(search.trim()==''){
            navigate(`/search`)
            return
        }
        navigate(`/search?search=${search}`)
    }
    return(
        <Fragment>
        <form action="" onSubmit={submitHandler}>
        <div className="searchbar">

                    <i className="fa-solid fa-magnifying-glass"
                    type='submit'
                    ></i>
                    <input type="text" 
                    placeholder="Search For Products,Brands And More.."
                    onChange={e=>setSearch(e.target.value)}
                    />
        </div>
        </form>
        </Fragment>
    )
}