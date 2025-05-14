import {Link} from "react-router-dom"

export default function Product({ product,index }) {
    return (
        product&&
        <div className="product col-12 col-sm-4 col-md-3 col-lg-2" key={product._id} >
            <div className="product-card">
                <i className="fa-solid fa-heart heart"></i>
                <img src={product.images[0].image} alt=""  />
                <Link to={`/product/${product._id}`}><h4>{product.name}</h4></Link>
                
                <div>${product.price}</div>
                
                
                <div className="rating-outer">
                    <div className="rating-inner" style={{width:'70%'}}></div>
                </div>
                
                <div className="buttons">
                    <button><i className="fa-solid fa-eye"></i> View</button>
                    <button><i className="fa-solid fa-cart-shopping"></i> Cart</button>
                </div>
            </div>
        </div>
    )
}