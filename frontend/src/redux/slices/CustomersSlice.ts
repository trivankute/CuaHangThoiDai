import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { serverUrl } from "../../utils/config.utils";

const CustomersSlice = createSlice({
    name:"CustomersSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getCustomersByPageId.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getCustomersByPageId.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
    }   
})

export const getCustomersByPageId = createAsyncThunk('getCustomersByPageId', async (input : any) => {
    try {
        //{{host}}/api/pages/getCustomer.php?id=1&customerCount=6
        const {id, customerCount} = input;
        const {data} = await axios.get(`${serverUrl}/api/pages/getCustomer.php?id=${id}&customerCount=${customerCount}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.customers, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.customers,"msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})

export const getCustomersTotalPages = createAsyncThunk('getCustomersTotalPages', async (input : any) => {
    try {
        //{{host}}/api/pages/getTotalPageCustomer.php?customerCount=6
        const {customerCount} = input;
        const {data} = await axios.get(`${serverUrl}/api/pages/getTotalPageCustomer.php?customerCount=${customerCount}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success","totalPage":data.data.totalPages, "msg":data.data.msg};
        }
        else {
            return {status:"error", "totalPage":data.data.totalPages,"msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})
export default CustomersSlice;