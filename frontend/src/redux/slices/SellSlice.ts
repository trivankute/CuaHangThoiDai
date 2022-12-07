import {createSlice} from "@reduxjs/toolkit"

const SellSlice = createSlice({
    name:"SellSlice",
    initialState:{
        loading:false,
        data:false,
        totalPrice:false
    },
    reducers:{
        handleLoadSellCart: (state,action) => {
            let sellCart = localStorage.getItem("sellCart")
            if(sellCart){
                state.data = JSON.parse(sellCart)
            }
        },
        handleAddToSellCart: (state,action) => {
            const {id, title, price, avatar, quantity} = action.payload
            console.log(id)
            if(quantity>0)
            {
                let sellCart = localStorage.getItem("sellCart")
                if(sellCart){
                    let sellCartItems = JSON.parse(sellCart)
                    let item = sellCartItems.find((item:any) => item.id === id)
                    if(item){
                        item.quantity = item.quantity + quantity
                    }
                    else {
                        sellCartItems.push({id, title, price, avatar, quantity})
                    }
                    localStorage.setItem("sellCart", JSON.stringify(sellCartItems))
                    state.data = sellCartItems
                }
                else {
                    localStorage.setItem("sellCart", JSON.stringify([{id, title, price, avatar, quantity}]))
                    // @ts-ignore
                    state.data = [{id, title, price, avatar, quantity}]
                }
            }
        },
        handleRemoveSellItem: (state,action) => {
            const {id} = action.payload
            let sellCart = localStorage.getItem("sellCart")
            if(sellCart){
                let sellCartItems = JSON.parse(sellCart)
                sellCartItems = sellCartItems.filter((item:any) => item.id !== id)
                localStorage.setItem("sellCart", JSON.stringify(sellCartItems))
                state.data = sellCartItems
            }
        },
        handleTotalPrice: (state, action) => {
            let sellCart = localStorage.getItem("sellCart")
            if(sellCart){
                let sellCartItems = JSON.parse(sellCart)
                let totalPrice = 0
                sellCartItems.forEach((item:any) => {
                    totalPrice = totalPrice + (item.price*item.quantity)
                })
                // @ts-ignore
                state.totalPrice = totalPrice
            }
        },
        handleClearAllSellItem: (state,action) => {
            localStorage.removeItem("sellCart")
            state.data = false
            state.totalPrice = false
        }
    }
})

export default SellSlice