import { useEffect } from "react";
import { Fragment ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from '../product/Product'
import { getProducts } from '../../actions/productsAction'
import { toast } from "react-toastify"
import Loader from "./Loader"
import Pagination from "react-js-pagination";

export default function Home() {
    const dispatch = useDispatch()
    const { loading, products, error,resPerPage,count } = useSelector((state) => state.productsState)

    const[currentPage,setCurrentPage]=useState(1)
    console.log("Page:",currentPage)
    function Pagefunction(page){
        setCurrentPage(page)
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "bottom-center"
            })
            return
        }
        dispatch(getProducts(currentPage,null,null))
    }, [error,dispatch,currentPage])

    return (
        <Fragment>
            {
                loading ? <Loader /> : (
                    <Fragment>
                        <div className="breaker"></div>
                        <div className="categories1">
                            <div className="category-child">
                                <div className="category-item">
                                    <img src="/images/category/kilas.png" alt="" />
                                    <p>Kilas</p>
                                </div>
                                <div className="category-item">
                                    <img src="/images/category/fasion.jpg" alt="" height="60px" />
                                    <p>Fasion</p>
                                </div>
                                <div className="category-item">
                                    <img src="/images/category/elec.jpg" alt="" height="60px" />
                                    <p>Electronics</p>
                                </div>
                                <div className="category-item">
                                    <img src="./images/category/toy.jpg" alt="" height="50px" />
                                    <p>Toys And More</p>
                                </div>
                                <div className="category-item">
                                    <img src="./images/category/furnitures.jpg" alt="" height="60px" />
                                    <p>Furnitures</p>
                                </div>
                                <div className="category-item">
                                    <img src="./images/category/mobile-category.png" alt="" />
                                    <p>Mobiles</p>
                                </div>
                                <div className="category-item">
                                    <img src="./images/category/applinces.png" alt="" />
                                    <p>Applinces</p>
                                </div>
                                <div className="category-item">
                                    <img src="./images/category/flight.png" alt="" />
                                    <p>Flight</p>
                                </div>

                            </div>
                        </div>
                        <div className="breaker"></div>
                        <div className="banner-container">
                            <div className="banner">
                                <img src="./images//banner//banner1.jpg" alt="" />
                            </div>
                        </div>
                        <div className="breaker"></div>
                        <h1 className="ms-5">Best Of Products</h1>
                        <div className="breaker"></div>
                        <div className="product-container">
                            <div className="products row">
                                {
                                    products && products.map((item, index) => (
                                        <Product product={item} key={index} />
                                    ))
                                }

                            </div>
                        </div>

                        <div className="breaker"></div>
                        <div className="d-flex justify-content-center mt-5">
                            {
                             products&&count>3?(
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={count}
                                onChange={Pagefunction}
                                itemClass="page-item"
                                linkClass="page-link"
                                firstPageText={"First"}
                                lastPageText={"Last"}
                                nextPageText={"Next"}
                                prevPageText={"Pre"}
                            />):null
                            }
                            </div>
                            
                       
                    </Fragment>
                )
            }
        </Fragment>
    )
}