import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSingleProduct, addReview } from "../../actions/productsAction"
import { isReviewClear } from "../../slices/productsSlice"
import { Carousel } from "react-bootstrap"
import { useState } from "react"
import { addCartItems } from "../../actions/cartAction"
import { toast } from "react-toastify"
import { Modal } from "react-bootstrap"
import Review from "../layout/review"

export default function productDetail() {
    const [show, setShow] = useState(false)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    function onChange() {
        setShow(false)

    }
    function onChangeSubmit() {
        setShow(true)
    }
    const dispatch = useDispatch()
    const { loading, product, error, isReview } = useSelector((state) => state.productsState)
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    function increaseQty() {
        if (product.stock <= 0 || product.stock <= quantity) return
        const val = quantity + 1
        console.log(val)
        setQuantity(val)

    }
    function decreaseQty() {
        if (product.stock <= 0 || quantity <= 1) return
        const val = quantity - 1
        setQuantity(val)
    }
    function cartHandler() {
        dispatch(addCartItems(id, quantity))
        toast.success("Product Added Successfully", {
            position: "top-center"
        })
    }
    const review = {
        productId: id,
        rating,
        comment
    }
    function reviewSubmitHandler() {
        dispatch(addReview(review))
        setShow(false)
    }
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: 'top-center'
            })
            return
        }
        if (isReview) {
            toast.success("Review Submitted Successfully", {
                position: 'top-center',
                onOpen: () => {
                    dispatch(isReviewClear())
                }
            })
        }
        dispatch(getSingleProduct(id))
    }, [dispatch, isReview, error])
    return (
        <Fragment>
            {
                product &&

                <div className="container product-detail-container">
                    <div className="left">

                        <div className="img-container">

                            <Carousel pause="hover">
                                {
                                    product.images.map(pro => (
                                        <Carousel.Item key={pro._id}>
                                            <img src={pro.image} alt="" />
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div className="right">

                        <h2 className="productname" id="productname">{product.name}</h2>
                        <p>{product.seller}</p>
                        <div className="ratings mt-auto">
                            <div className="rating-outer" >
                                <div className="rating-inner" style={{ width: "100%" }} ></div>
                            </div>
                        </div>
                        <div className="price">
                            $ {product.price}
                        </div>

                        <div className="quantity">
                            <button className="btn-minus" onClick={decreaseQty}>-</button>
                            <span>{quantity}</span>
                            <button className="btn-plus" onClick={increaseQty}>+</button>
                        </div>
                        <button className="btn btn-cart" onClick={cartHandler}>Add to Cart</button>
                        <p>status : <strong className={product.stock <= 0 ? "text-danger" : "text-success"}>{product.stock <= 0 ? "Out Of Stock" : "In Stock"}</strong></p>
                        <h4>Description</h4>
                        <p>{product.description}</p>
                        <p>Sold By: <strong>Amazon</strong></p>
                        <button className="btn  btn-submit" onClick={onChangeSubmit}>Submit Your Review</button>
                        <div className="reviews-section">
                            <hr />
                            <div className="rating-sectionk">
                                <h3>Reviews</h3>
                                <hr />
                                {
                                    product.reviews.map(review=>(
                                        
                                        <Review review={review}/>
                                    ))
                                }
                            </div>
                            <hr />
                        </div>
                    </div>
                    <Modal show={show} onHide={onChange}>
                        <Modal.Header closeButton>
                            <h3>Submit Review</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="star" style={{ display: "flex", gap: "10px" }}>
                                {
                                    [1, 2, 3, 4, 5].map((star) => (
                                        <li style={{ listStyle: "none", display: "flex" }}>
                                            <i className="fa fa-star"
                                                onClick={e => setRating(star)}
                                                style={{ fontSize: "22px", color: star <= rating ? "yellow" : "" }}
                                                onMouseOver={e => { e.target.classList.add('text-warning') }}
                                                onMouseOut={e => { e.target.classList.remove('text-warning') }}
                                            ></i>
                                        </li>
                                    ))
                                }
                            </div>
                            <textarea className="mt-2 w-100 p-3" onChange={e => setComment(e.target.value)}>

                            </textarea>
                            <button className="btn btn-primary w-100 mt-2" onClick={reviewSubmitHandler}>Submit</button>
                        </Modal.Body>
                    </Modal>

                </div>

            }

        </Fragment>
    )
}