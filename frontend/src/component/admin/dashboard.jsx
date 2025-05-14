import { Fragment } from "react";
import {Dropdown} from "react-bootstrap"
import {Link} from "react-router-dom"
import Slider from "./slider";

export default function DashBoard(){
    return(
        <Fragment>
            <div className="dashboard-container">
                <Slider/>
                <div className="dashboard-right">

                </div>
            </div>
        </Fragment>
    )
}