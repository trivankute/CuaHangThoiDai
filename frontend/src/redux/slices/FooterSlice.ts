import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { serverUrl } from "../../utils/config.utils";

const FooterSlice = createSlice({
    name:"FooterSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(createFooter.pending, (state,action) => {
            state.loading = true
        })
        .addCase(createFooter.fulfilled, (state,action) => {
            state.loading = false
        })
        .addCase(getFooter.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getFooter.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
        .addCase(updateFooter.pending, (state,action) => {
            state.loading = true
        })
        .addCase(updateFooter.fulfilled, (state,action) => {
            state.loading = false
        })
        .addCase(clearFooter.pending, (state,action) => {
            state.loading = true
        })
        .addCase(clearFooter.fulfilled, (state,action) => {
            state.loading = false
        })
    }   
})
export const createFooter = createAsyncThunk('createFooter', async (input : any) => {
    try {
        //{{host}}/api/footers/create.php
        const {phone,email,address} = input;
        const {data} = await axios.post(`${serverUrl}/api/footers/create.php`,{
            phone,
            email,
            address
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success", "msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})
export const getFooter = createAsyncThunk('getFooter', async () => {
    //{{host}}/api/footers/getAll.php
    try {
        const {data} = await axios.get(`${serverUrl}/api/footers/getAll.php`,{
            headers: {
            }}
        );
        if(data.status === 'success'){
            return {status:"success","data":data.data};
        }
        else {
            return {status:"error", "data":data.data};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})
export const updateFooter = createAsyncThunk('updateFooter', async (input : any) => {
    try {
        // {{host}}/api/footers/update.php
        const {phone , email, address} = input;
        const {data} = await axios.post(`${serverUrl}/api/footers/update.php`,{
            phone,
            email,
            address
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success", "msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})
export const clearFooter = createAsyncThunk('clearFooter', async () => {
    try {
        //{{host}}/api/footers/clear.php
        const {data} = await axios.get(`${serverUrl}/api/footers/clear.php`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success", "msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})
export default FooterSlice;