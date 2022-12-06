import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import axios from 'axios'

import { serverUrl } from '../../utils/config.utils'

const AlbumSlice = createSlice({
    name:"AlbumSlice",
    initialState:{
        loading:false,
        data:false,
        totalPage:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getAlbumById.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAlbumById.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
        .addCase(uploadAlbum.pending, (state,action) => {
            state.loading = true
        })
        .addCase(uploadAlbum.fulfilled, (state,action) => {
            state.loading = false
        })
}
})

export const getAlbumById = createAsyncThunk('getAlbumById', async (id:string) => {
    // {{host}}/api/albums/getById.php?id=21
    try {
        const {data} = await axios.get(`${serverUrl}/api/albums/getById.php?id=${id}`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.album, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.album,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})

export const uploadAlbum = createAsyncThunk('uploadAlbum', async (input:any) => {
    //{{host}}/api/albums/upload.php
    try {
        const {data} = await axios.post(`${serverUrl}/api/albums/upload.php`, input, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
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

export const updateAlbum = createAsyncThunk('updateAlbum', async (totalInput:any) => {
    const {id, input} = totalInput
    //{{host}}/api/albums/update.php?id=21
    try {
        const {data} = await axios.post(`${serverUrl}/api/albums/update.php?id=${id}`, input, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
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

export default AlbumSlice