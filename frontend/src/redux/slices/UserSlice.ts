import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'

import url from '../../serverUrls'
import { serverUrl } from '../../utils/config.utils'

const UserSlice = createSlice({
    name:"UserSlice",
    initialState:{
        loading:false,
        data:false,
    },
    reducers:{
    }
    ,
    extraReducers(builder) {
        builder
        .addCase(login.pending, (state,action)=>{
            state.loading = true;
        })
        .addCase(login.fulfilled, (state,action)=>{
            state.loading = false
        })
        .addCase(getMe.pending,(state,action) => {
            state.loading = true
        } )
        .addCase(getMe.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
        .addCase(logout.pending,(state,action) => {
            state.loading = true
        } )
        .addCase(logout.fulfilled, (state,action) => {
            state.loading = false
            const {status} = action.payload
            if(status==="success")
            state.data = false
        })
        .addCase(register.pending,(state,action) => {
            state.loading = true
        } )
        .addCase(register.fulfilled, (state,action) => {
            state.loading = false
        })
    },
})

export const getMe = createAsyncThunk('getMe', async () => {
    //{{host}}/api/users/me.php
    try {
        const {data} = await axios.get(`${serverUrl}/api/users/me.php`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            console.log(data)
            return {status:"success","data":data.data.user, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.user,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
}
)

export const login = createAsyncThunk('login', async (input : any) => {
    //{{host}}/api/users/login.php
    try {
        const {data} = await axios.post(`${serverUrl}/api/users/login.php`, input);
        if(data.status === 'success'){
            localStorage.setItem('token', data.data.token);
            return {status:"success","msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error};
    }
})

export const logout = createAsyncThunk('logout', async () => {
    //{{host}}/api/users/logout.php
    try {
        const {data} = await axios.get(`${serverUrl}/api/users/logout.php`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            localStorage.removeItem('token');
            return {status:"success","msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch (error : any) {
        return{status:"error","msg":error.response.data.message};
    }
})

export const register = createAsyncThunk('register', async (input : any) => {
    //{{host}}/api/users/register.php
    try {
        const {data} = await axios.post(`${serverUrl}/api/users/register.php`, input,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        if(data.status === "success") {
            return {status:"success","msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch (error : any) {
        return{status:"error","msg":error.response.data.message};
    }
})

export default UserSlice