import axios from "axios"
import { addCartItem } from "../slices/cartSlice"

export const addCartItems=(id,quantity)=>async dispatch=>{

    const {data}=await axios.get(`/api/v1/product/${id}`)
    
    dispatch(addCartItem(
        {
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].image,
            stock:data.product.stock,
            quantity,
        }
    ))
}
