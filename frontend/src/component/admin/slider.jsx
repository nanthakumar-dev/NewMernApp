import { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Slider(){
    return(
        <Fragment>
             <div className="dashboard-left">
                <Link to={"/admin/dashboard"}>
                    <h2>DashBoard</h2>
                </Link>
                    <div className="breaker"></div>
                    <div className="dashboard-items ">

                        <Dropdown  className="text-secondary" >
                            <Dropdown.Toggle variant={'default d-flex text-white p-0 m-0'} className="dropdown-toggle">
                                <li>Product<i className="fa-solid fa-caret-down text-black ps-2 "></i></li>
                                </Dropdown.Toggle>
                            <Dropdown.Menu >
                                <Dropdown.Item><Link to={"/admin/product"}>All</Link></Dropdown.Item>
                                <Dropdown.Item><Link to={'/admin/product/create'}>Create</Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="dashboard-user w-100  ">
                           <Link className="text-black" to={'/admin/order'}>Order</Link> 
                        </div>
                        <div  className="dashboard-user w-100   ">
                            <Link to="/admin/user" className="text-black">User</Link>
                           
                        </div>
                        <div className="dashboard-user w-100  ">
                            Review
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}