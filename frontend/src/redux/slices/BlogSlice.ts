import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import axios from 'axios'

import { serverUrl } from '../../utils/config.utils'

const BlogSlice = createSlice({
    name:"BlogSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getBlogById.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(getBlogById.fulfilled, (state, action)=>{
            state.loading = false
            const {status, data} = action.payload
            if(status === 'success'){
                state.data = data
            }
        })
        .addCase(createBlog.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(createBlog.fulfilled, (state, action)=>{
            state.loading = false
        })
        .addCase(updateBlog.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(updateBlog.fulfilled, (state, action)=>{
            state.loading = false
        })
        .addCase(deleteBlog.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(deleteBlog.fulfilled, (state, action)=>{
            state.loading = false
        })
    }
})



export const getBlogById = createAsyncThunk('getBlogById', async (input : any) => {
    try {
        //{{host}}/api/blogs/getById.php?id=12
        const {id} = input;
        const {data} = await axios.get(`${serverUrl}/api/blogs/getById.php?id=${id}`,{
            headers: {
            }
        });
        if(data.status === "success"){
            return {status:"success","data":data.data.blog, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.blog,"msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})

export const createBlog = createAsyncThunk('createBlog', async (input : any) => {
    try {
        //{{host}}/api/blogs/create.php
        const {data} = await axios.post(`${serverUrl}/api/blogs/create.php`,input,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === "success"){
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

export const updateBlog = createAsyncThunk('updateBlog', async (input : any) => {
    //{{host}}/api/blogs/update.php?id=11
    try {
        const {id, topic, headline, content} = input;
        const {data} = await axios.post(`${serverUrl}/api/blogs/update.php?id=${id}`,{
            topic,
            headline,
            content
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === "success"){
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
export const deleteBlog = createAsyncThunk('deleteBlog', async (input : any) => {    
    try {
        //{{host}}/api/blogs/update.php?id=11
        const {id} = input;
        const {data} = await axios.get(`${serverUrl}/api/blogs/delete.php?id=${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === "success"){
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
export default BlogSlice