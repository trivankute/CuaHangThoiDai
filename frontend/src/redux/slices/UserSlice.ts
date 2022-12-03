import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'

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
        .addCase(checkMe.pending, (state,action) => {
            state.loading = true
        })
        .addCase(checkMe.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="error")
            state.data = false
        })
        .addCase(changePassword.pending, (state,action) => {
            state.loading = true
        })
        .addCase(changePassword.fulfilled, (state,action) => {
            state.loading = false
            const {status} = action.payload
            if(status==="true")
            state.data = false
        })
        .addCase(updateAvatar.pending, (state,action) => {
            state.loading = true
        })
        .addCase(updateAvatar.fulfilled, (state,action) => {
            state.loading = false
        })
        .addCase(updateInformation.pending, (state,action) => {
            state.loading = true
        })
        .addCase(updateInformation.fulfilled, (state,action) => {
            state.loading = false
        })
    },
})

export const checkMe = createAsyncThunk('checkMe', async () => {
    //{{host}}/api/users/me.php
    try {
        const {data} = await axios.get(`${serverUrl}/api/users/meAccount.php`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
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

export const getMe = createAsyncThunk('getMe', async () => {
    // {{host}}/api/users/meInfo.php
    try {
        const {data} = await axios.get(`${serverUrl}/api/users/meInfo.php`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.user, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.user,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})

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
        return {status:"error","msg":error.response.data.message};
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

export const changePassword = createAsyncThunk('changePassword', async (input : any) => {
    // {{host}}/api/users/updatePassword.php
    try {
        const {data} = await axios.post(`${serverUrl}/api/users/updatePassword.php`, input,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        if(data.status === "success") {
            // delete localStorage token
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

export const updateAvatar = createAsyncThunk('updateAvatar', async (input : any) => {
    //{{host}}/api/users/updateAvatar.php
    try {
        const {data} = await axios.post(`${serverUrl}/api/users/updateAvatar.php`, input,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

export const updateInformation = createAsyncThunk('updateInformation', async (input : any) => {
    //{{host}}/api/users/updateInfo.php
    try {
        const {data} = await axios.post(`${serverUrl}/api/users/updateInfo.php`, input,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
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