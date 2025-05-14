
import { useEffect } from "react"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { decreaseCartItem, increaseCartItem, filterCartItem,setTotal } from "../../slices/cartSlice"
import {Link, useNavigate} from "react-router-dom"

export default function Cart() {
    const { items:cartItems,items } = useSelector(state => state.cartState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    /*
    const [numOfProduct,setNumOfProduct]=useState('');
    const [numOfQuantity,setNumOfQuantity]=useState('');
    const [itemPrice,setItemPrice]=useState();
    const [taxPrice,setTaxPrice]=useState();
    const [shippingPrice,setShippingPrice]=useState();
    const [totalPrice,setTotalPrice]=useState()
    */
    const numOfProduct=cartItems.length;
    const numOfQuantity=cartItems.reduce((acc,item)=>{
        return item.quantity+acc
    },0);
    const itemPrice=cartItems.reduce((acc,item)=>{
        return Number(Number(acc+(item.price*item.quantity)).toFixed(3))
    },0);
    const taxPrice=Number(Number(itemPrice*0.05).toFixed(2))
    const shippingPrice=itemPrice>=500?0:50;
    const totalPrice=Number(itemPrice+taxPrice+shippingPrice).toFixed(2);
    useEffect(() => {
       /* if(items){
            setNumOfProduct(items.length)
        setNumOfQuantity(items.reduce((acc,item)=>{
            return item.quantity+acc
        },0))
        setItemPrice(items.reduce((acc,item)=>{
            console.log("price",typeof(item.price))
            console.log("qty",typeof(item.quantity))
            return Number(Number(acc+(item.price*item.quantity)).toFixed(3))
        },0))
        setTaxPrice(items.reduce((acc,item)=>{
            return Number(Number(item.price*0.05).toFixed(2))
        },0))
        setShippingPrice(50)
        
        setTotalPrice(Number(items.reduce((acc,item)=>{
            console.log("price",typeof(item.price))
            console.log("qty",typeof(item.quantity))
            return Number(Number(acc+(item.price*item.quantity)).toFixed(3))
        },0)+items.reduce((acc,item)=>{
            return Number(Number(item.price*0.05).toFixed(2))
        },0)+(50)).toFixed(2))
        }
        */
    }, [cartItems])
    function increaseItem(item) {
        if (item.stock == 0 || item.stock <= item.quantity) return
        dispatch(increaseCartItem({ id: item.product }))
    }
    function decreaseItem(item) {
        if (item.stock == 0 || item.quantity <= 1) return
        dispatch(decreaseCartItem({ id: item.product }))
    }
    function deleteItem(id) {
        dispatch(filterCartItem({ id }))
    }
    function checkoutHandler(){
        navigate('/login?redirect=shipping')
        dispatch(setTotal({totalPrice}))
    }
    return (

        <Fragment>
            {
                items &&
                    items.length == 0 ?
                    (<Fragment>
                        <h1 className="m-5">EMPTY CART ITEM</h1>
                    </Fragment>) :
                    (<Fragment>
                        <div className="cart-container">
                            <h1>Cart</h1>
                            <div className="cart-subcontainer">

                                <div className="cart-left">
                                    <div className="address-box">

                                    </div>
                                    {
                                        items.map((item) => (
                                            <div className="cart-product" key={item.product}>
                                                <div className="cart-product-left">
                                                    <div className="cart-img">
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                    <div className="cart-quantity">
                                                        <div className="cart-plus"></div>
                                                        <div className="cart-quantity-box"></div>
                                                        <div className="cart-minus"></div>
                                                    </div>
                                                </div>
                                                <div className="cart-product-right">
                                                    <Link to={'/product/'+item.product}>
                                                        <h5 className="cart-product-name">{item.name}
                                                        </h5>
                                                    </Link>
                                                    <div className="cart-seller">
                                                        {item.seller}
                                                    </div>
                                                    <div className="cart-prices">
                                                        <span className="old-price">$999</span>
                                                        <span className="cart-price">${item.price}</span>
                                                        <span className="cart-offer">80%</span>
                                                    </div>
                                                    <div className="cart-quantity">
                                                        <button className="minius-btn" onClick={e => decreaseItem(item)}>-</button>
                                                        <div className="quantity-box">{item.quantity}</div>
                                                        <button className="plus-btn" onClick={e => increaseItem(item)} >+</button>
                                                    </div>
                                                    <div className="cart-more">
                                                        <div className="save-later">
                                                            <i className="fa-solid fa-clock"></i>
                                                            <span className="ms-1">Save Later</span>
                                                        </div>
                                                        <div className="cart-remove" onClick={(e) => deleteItem(item.product)}>
                                                            <i className="fa-solid fa-trash"></i>
                                                            <span>Remove</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        ))
                                    }
                                </div>
                                <div className="cart-right">
                                    <h2>Price Detail</h2>
                                    <hr />
                                    <div className="cart-prices-container">
                                        <div className="cart-contain-price common-price">
                                            <span>Product</span>
                                            <span>{numOfProduct}</span>
                                        </div>
                                        <div className="cart-contain-quantity common-price">
                                            <span>Quantity</span>
                                            <span>{numOfQuantity}</span>
                                        </div>
                                        <div className="cart-contain-discount common-price">
                                            <span>Discount</span>
                                            <span>50%</span>
                                        </div>
                                        <div className="total-product-price common-price">
                                            <span>Total Product Price</span>
                                            <span>${itemPrice}</span>
                                        </div>
                                        <div className="tax-price common-price">
                                            <span>Tax</span>
                                            <span>${taxPrice}</span>
                                        </div>
                                       
                                       
                                        <div className="delivery-charge common-price">
                                            <span>Delivery Charge</span>
                                            <span>${shippingPrice}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="total-price common-price">
                                        <span>Total Price</span>
                                            <span>${totalPrice}</span>

                                    </div>
                                    <div className="checkout">
                                        <button className="checkout-btn" onClick={checkoutHandler}>CHECKOUT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>)
            }
        </Fragment>
    )
}