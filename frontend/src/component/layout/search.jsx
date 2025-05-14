import { useEffect } from "react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from '../product/Product'
import { getProducts } from '../../actions/productsAction'
import { toast } from "react-toastify"
import Loader from "./Loader"
import Pagination from "react-js-pagination";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch()
    const { loading, products, error, resPerPage, count } = useSelector((state) => state.productsState)

    const [currentPage, setCurrentPage] = useState(1)
    const [category,setCategory]=useState('')
    const [rating,setRating]=useState()
    
    function Pagefunction(page) {
        setCurrentPage(page)
    }
    const [searchparams] = useSearchParams()
    let search = ''
    if (searchparams.get('search')) {
        search = searchparams.get('search')
    }
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "bottom-center"
            })
            return
        }
        dispatch(getProducts(currentPage, search,category))
    }, [error, dispatch, currentPage, search,rating,category])
    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]
    const stars = [5, 4, 3, 2, 1]
    return (
        <Fragment>
            {
                loading ? <Loader /> : (
                    <Fragment>

                        <div className="breaker"></div>
                        <h1 className="ms-5">Search Product</h1>
                        <div className="breaker"></div>
                        <div className="product-container ">
                            <div className="left-product">
                                <ul>
                                    <h1>Categories</h1>
                                    {
                                        categories.map(category => {
                                            return <li style={{cursor:"pointer"}} onClick={e=>setCategory(category)} key={category}>{category}</li>
                                        })
                                    }
                                </ul>
                                <div className="stars">
                                    <h1>Rating</h1>
                                    {stars.map(star => {
                                        return (
                                            <div className="star" style={{cursor:"pointer"}} key={star} onClick={e=>setRating(star)}>
                                                <div className="rating-outer">
                                                    <div className="rating-inner" style={{ width: `${star * 20}%` }} >
                                                    </div>
                                                </div>
                                                <br />
                                            </div>
                                        )

                                    })}
                                </div>
                            </div>
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