import {createSlice} from "@reduxjs/toolkit"

const CartSlice = createSlice({
    name:"CartSlice",
    initialState:{
        loading:false,
        data:false,
        totalPrice:false
    },
    reducers:{
        handleLoadCart: (state,action) => {
            let cart = localStorage.getItem("cart")
            if(cart){
                state.data = JSON.parse(cart)
            }
        },
        handleAddToCart: (state,action) => {
            const {id, title, price, image, quantity} = action.payload
            if(quantity>0)
            {
                let cart = localStorage.getItem("cart")
                if(cart){
                    let cartItems = JSON.parse(cart)
                    let item = cartItems.find((item:any) => item.id === id)
                    if(item){
                        item.quantity = item.quantity + quantity
                    }
                    else {
                        cartItems.push({id, title, price, image, quantity})
                    }
                    localStorage.setItem("cart", JSON.stringify(cartItems))
                    state.data = cartItems
                }
                else {
                    localStorage.setItem("cart", JSON.stringify([{id, title, price, image, quantity}]))
                    // @ts-ignore
                    state.data = [{id, title, price, image, quantity}]
                }
            }
        },
        handleMinusQuantity: (state,action) => {
            const {id} = action.payload
            let cart = localStorage.getItem("cart")
            if(cart){
                let cartItems = JSON.parse(cart)
                let item = cartItems.find((item:any) => item.id === id)
                if(item){
                    item.quantity = item.quantity - 1
                    if(item.quantity===0)
                        cartItems = cartItems.filter((item:any) => item.id !== id)
                }
                localStorage.setItem("cart", JSON.stringify(cartItems))
                state.data = cartItems
            }
        },
        handleRemoveCartItem: (state,action) => {
            const {id} = action.payload
            let cart = localStorage.getItem("cart")
            if(cart){
                let cartItems = JSON.parse(cart)
                cartItems = cartItems.filter((item:any) => item.id !== id)
                localStorage.setItem("cart", JSON.stringify(cartItems))
                state.data = cartItems
            }
        },
        handleTotalPrice: (state, action) => {
            let cart = localStorage.getItem("cart")
            if(cart){
                let cartItems = JSON.parse(cart)
                let totalPrice = 0
                cartItems.forEach((item:any) => {
                    totalPrice = totalPrice + (parseInt(item.price) * item.quantity)
                })
                // @ts-ignore
                state.totalPrice = totalPrice * 1000
            }
        },
        handleClearCart: (state,action) => {
            localStorage.removeItem("cart")
            state.data = false
        }
    }
})

export default CartSlice