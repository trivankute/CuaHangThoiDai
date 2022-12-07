
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import axios from 'axios'

import { serverUrl } from '../../utils/config.utils'

const TransactionsSlice = createSlice({
    name:"TransactionsSlice",
    initialState:{
        loading:false,
        data:false,
        totalPage:false
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
        .addCase(getTransactionsByUserIdAndPageId.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getTransactionsByUserIdAndPageId.fulfilled, (state,action) => {
            state.loading = false
            const {status, data, totalPage} = action.payload
            if(status==="success")
            {
                state.data = data
                state.totalPage = totalPage

            }
        })
        .addCase(getTransactionsByEmployeePageIdAndType.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getTransactionsByEmployeePageIdAndType.fulfilled, (state,action) => {
            state.loading = false
            const {status, data, totalPage} = action.payload
            if(status==="success")
            {
                state.data = data
                state.totalPage = totalPage
            }
        })
        .addCase(getTransactionsTotalPage.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getTransactionsTotalPage.fulfilled, (state,action) => {
            state.loading = false
            const {status, totalPage} = action.payload
            if(status==="success")
            {
                state.totalPage = totalPage
            }
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

export const getTransactionsByUserIdAndPageId = createAsyncThunk('getTransactionsByUserIdAndPageId', async (input : any) => {
    try {
        //{{host}}/api/pages/getTransactionByUserId.php?transactionCount=10&userId=17&id=1
        const {transactionCount, userId, pageId} = input;
        const {data} = await axios.get(`${serverUrl}/api/pages/getTransactionByUserId.php?
        transactionCount=${transactionCount}&userId=${userId}&id=${pageId}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }}
        );
        if(data.status === 'success'){
            return {status:"success","data":data.data.transactions, "totalPage":data.data.totalPage,"msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.transactions,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
});

export const getTransactionsTotalPage = createAsyncThunk('getTransactionsTotalPage', async (input : any) => {
    try {
        // {{host}}/api/pages/getTotalPageTransaction.php?transactionCount=10
        const {transactionCount} = input;
        const {data} = await axios.get(`${serverUrl}/api/pages/getTotalPageTransaction.php?transactionCount=${transactionCount}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }}
        );
        if(data.status === 'success'){
            return {status:"success","totalPage":data.data.totalPage,"msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
});

export const getTransactionsByEmployeePageIdAndType = createAsyncThunk('getTransactionsByEmployeePageIdAndType', async (input : any) => {
    try {
        //{{host}}/api/pages/getTransactionByType.php?id=1&transactionCount=10&type=all
        const {transactionCount, id, type} = input;
        const {data} = await axios.get(`${serverUrl}/api/pages/getTransactionByType.php?id=${id}&transactionCount=${transactionCount}&type=${type}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }}
        );
        if(data.status === 'success'){
            return {status:"success","data":data.data.transactions, "totalPage":data.data.totalPage,"msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.transactions,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
});

export default TransactionsSlice;