import { createSlice, current } from "@reduxjs/toolkit"


const initialState = {
    loading: false,
    items:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
    shippingInfo:localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem('shippingInfo')):{}
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItem(state,action){
            const item=action.payload
            
           let exist=state.items.find(i=>i.product==item.product)
            if(exist){
                if(exist.quantity!=item.quantity){
                    exist.quantity=item.quantity
                }
                
                state={
                  loading:false,
                  items:state.items
                }
                
                
            }
            else{
                state={
                    loading:false,
                    items:[...state.items,item]
                }
            }
            localStorage.setItem('cartItems',JSON.stringify(state.items))
           return state
        },
        setTotal(state,action){
            return {
                ...state,
                total:action.payload.totalPrice
            }
        },
        increaseCartItem(state,action){
            const {id}=action.payload
            console.log(id)
            state.items=state.items.map(i=>{
                if(i.product==id){
                    i.quantity=i.quantity+1
                }
                return i
            })
            localStorage.setItem('cartItems',JSON.stringify(state.items))
        },
        decreaseCartItem(state,action){
            const {id}=action.payload
            state.items=state.items.map(i=>{
                if(i.product==id){
                    i.quantity=i.quantity-1
                }
                return i
            })
            localStorage.setItem('cartItems',JSON.stringify(state.items))
        },
        filterCartItem(state,action){
            const {id}=action.payload
            console.log(id)
            state.items=state.items.filter(i=>{
                return i.product!=id
                
            })
            localStorage.setItem('cartItems',JSON.stringify(state.items))
        },
        saveShippingInfo(state,action){
            localStorage.setItem('shippingInfo',JSON.stringify(action.payload))
            return{
                ...state,
                loading:false,
                shippingInfo:action.payload
            }

        }
    }
})
const { actions, reducer } = cartSlice
export const {
    addCartItem,increaseCartItem,decreaseCartItem,filterCartItem,saveShippingInfo,setTotal
} = actions
export default reducer