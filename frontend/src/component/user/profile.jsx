import { Fragment } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Loader from "../layout/Loader"
export default function profile() {
    const { user, loading, isAuthenticated } = useSelector(state => state.authState)
    return (
        <Fragment>
            {
                loading ? <Loader /> : (
                    <Fragment>
                        <div className="container mt-5">
                            <h1 style={{ textAlign: 'center' }}>Profile</h1>
                            <div className="profile-container">
                                <div className="profile-left">
                                    <div className="profile-img">
                                        <img src={user.avatar??"/images/user/default-image.jpg"} alt="" />
                                    </div>
                                    <div className="buttons">
                                        <Link to={'/password/change'}>
                                        <div className="btn" style={{color:"white",background:'orangered'}}>Change Password</div>
                                        </Link>
                                        <Link to={'/profile/update'}>
                                        <div className="btn" style={{color:"white",background:'orangered'}}>Update Profile</div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="profile-right">
                                    <div className="name">
                                        <h4>Name</h4>
                                        <h5>{user.name}</h5>
                                    </div>
                                    <div className="email">
                                        <h4>Email</h4>
                                        <h5>{user.email}</h5>
                                    </div>
                                    <div className="role">
                                        <h4>Role</h4>
                                        <h5>{user.role}</h5>
                                    </div>
                                    <div className="createdAt">
                                        <h4>CreatedAt</h4>
                                        <h5>{String(user.createdAt).substring(0,10)}</h5>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Fragment>)

            }
            </Fragment>
            )
}