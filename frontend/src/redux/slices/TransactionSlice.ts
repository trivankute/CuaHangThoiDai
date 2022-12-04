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
        .addCase(getTransactionById.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getTransactionById.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status === 'success'){
                state.data = data
            }
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
    try {
        //{{host}}/api/transactions/createShipping.php
        const {data} = await axios.post(`${serverUrl}/api/transactions/createShipping.php`,input,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
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


export const getTransactionById = createAsyncThunk('getTransactionById', async (input:any) => {
    const {id} = input
    try {
        // {{host}}/api/transactions/getById.php?id=61
        const {data} = await axios.get(`${serverUrl}/api/transactions/getById.php?id=61`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === "success"){
            return {status:"success","data":data.data.transactions,"msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.transactions,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
}) 

export default TransactionSlice;