import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { serverUrl } from "../../utils/config.utils";

const TransactionSlice = createSlice({
    name:"TransactionSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(createPickupTransaction.pending, (state,action) => {
            state.loading = true
        })
        .addCase(createPickupTransaction.fulfilled, (state,action) => {
            state.loading = false
        })
        .addCase(createShippingTransaction.pending, (state,action) => {
            state.loading = true
        })
        .addCase(createShippingTransaction.fulfilled, (state,action) => {
            state.loading = false
        }
        )
        .addCase(updateShippingTransactionState.pending, (state,action) => {
            state.loading = true
        })
        .addCase(updateShippingTransactionState.fulfilled, (state,action) => {
            state.loading = false
        })
    }
})

export const createPickupTransaction = createAsyncThunk('createPickupTransaction',async (input:any) => {
    const {typeOfTransaction, typeOfShipping, customerId, totalPrice, products} = input
    try {
        //{{host}}/api/transactions/createPickup.php
        const {data} = await axios.post(`${serverUrl}/api/transactions/createPickup.php`,{
            typeOfTransaction,
            typeOfShipping,
            customerId,
            totalPrice,
            products
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === "success"){
            return {status:"success","msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
}) 

export const createShippingTransaction = createAsyncThunk('createShippingTransaction',async (input:any) => {
    const {typeOfTransaction, typeOfShipping, receiverAddress, deliverPartner, receiverName, receiverPhone, totalPrice, products} = input
    try {
        //{{host}}/api/transactions/createShipping.php
        const {data} = await axios.post(`${serverUrl}/api/transactions/createShipping.php`,{
            typeOfTransaction,
            typeOfShipping,
            receiverAddress,
            deliverPartner,
            receiverName,
            receiverPhone,
            totalPrice,
            products
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === "success"){
            return {status:"success","msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
}) 

export const updateShippingTransactionState = createAsyncThunk('updateShippingTransactionState', async (input:any) => {
    const {id, state} = input
    try {
        //{{host}}/api/transactions/updateShippingState.php?id=4
        const {data} = await axios.post(`${serverUrl}/api/transactions/updateShippingState.php?id=${id}`,{
            state
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === "success"){
            return {status:"success","msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
}) 

export default TransactionSlice;