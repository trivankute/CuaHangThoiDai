
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import axios from 'axios'

import { serverUrl } from '../../utils/config.utils'

const TransactionsSlice = createSlice({
    name:"TransactionsSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getAllTransactionsByPageId.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAllTransactionsByPageId.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
    }
})

export const getAllTransactionsByPageId = createAsyncThunk('getAllTransactionsByPageId', async (input : any) => {
    const {id, transactionCount} = input;
    try {
        //{{host}}/api/pages/getTransaction.php?id=1&transactionCount=10
        const {data} = await axios.get(`${serverUrl}/api/pages/getTransaction.php?id=${id}&transactionCount=${transactionCount}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.transactions, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.transactions,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})

export const getTransactionsTotalPages = createAsyncThunk('getTransactionsTotalPages', async (input : any) => {
    try {
        //{{host}}/api/pages/getTotalPageTransaction.php?transactionCount=10
        const {transactionCount} = input;
        const {data} = await axios.get(`${serverUrl}/api/pages/getTotalPageTransaction.php?transactionCount=${transactionCount}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }}
        );
        if(data.status === 'success'){
            return {status:"success","totalPage":data.data.totalPage, "msg":data.data.msg};
        }
        else {
            return {status:"error", "totalPage":data.data.totalPage,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
});
export default TransactionsSlice;