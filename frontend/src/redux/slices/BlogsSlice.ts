
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import axios from 'axios'

import { serverUrl } from '../../utils/config.utils'

const BlogsSlice = createSlice({
    name:"BlogsSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getAllBlogs.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(getAllBlogs.fulfilled, (state, action)=>{
            state.loading = false
            const {status, data} = action.payload
            if(status === 'success'){
                state.data = data
            }
        })
        .addCase(getAllBlogsByPageId.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(getAllBlogsByPageId.fulfilled, (state, action)=>{
            state.loading = false
            const {status, data} = action.payload
            if(status === 'success'){
                state.data = data
            }
        })
    }
})
export const getAllBlogs = createAsyncThunk('getAllBlogs', async () => {
    //{{host}}/api/blogs/getAll.php
    try {
        const {data} = await axios.get(`${serverUrl}/api/blogs/getAll.php`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.blogs, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.blogs,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})
export const getAllBlogsByPageId = createAsyncThunk('getAllBlogsByPageId', async (input:any) => {
    const {id, blogCount} = input
    // {{host}}/api/pages/getBlog.php?id=1&blogCount=8
    try {
        const {data} = await axios.get(`${serverUrl}/api/pages/getBlog.php?id=${id}&blogCount=${blogCount}`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.blogs, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.blogs,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
});

export const getBlogsTotalPages = createAsyncThunk('getBlogsTotalPages', async (input : any) => {
    try {
        //{{host}}/api/pages/getTotalPageBlog.php?blogCount=4
        const {blogCount} = input
        const {data} = await axios.get(`${serverUrl}/api/pages/getTotalPageBlog.php?blogCount=${blogCount}`,{
            headers: {
            }
        });
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
})
export default BlogsSlice