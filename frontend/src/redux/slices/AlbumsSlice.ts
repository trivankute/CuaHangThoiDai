import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import axios from 'axios'

import { serverUrl } from '../../utils/config.utils'

const AlbumsSlice = createSlice({
    name:"AlbumsSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getAllAlbums.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAllAlbums.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
        .addCase(getAllAlbumsByPageId.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAllAlbumsByPageId.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
        .addCase(getAlbumsAllPages.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAlbumsAllPages.fulfilled, (state,action) => {
            state.loading = false
        })
    }
})

export const getAllAlbums = createAsyncThunk('getAllAlbums', async () => {
    // {{host}}/api/albums/getAll.php
    try {
        const {data} = await axios.get(`${serverUrl}/api/albums/getAll.php`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.albums, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.albums,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
}
)

export const getAllAlbumsByPageId = createAsyncThunk('getAllAlbumsByPageId', async (input:any) => {
    const {id, albumCount} = input
    // {{host}}/api/pages/getAlbum.php?id=1&albumCount=8
    try {
        const {data} = await axios.get(`${serverUrl}/api/pages/getAlbum.php?id=${id}&albumCount=${albumCount}`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.albums, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.albums,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
}
)

export const getAlbumsAllPages = createAsyncThunk('getAlbumsAllPages', async (input:any) => {
    const {albumCount} = input
    // {{host}}/api/pages/getTotalPageAlbum.php?albumCount=8
    try {
        const {data} = await axios.get(`${serverUrl}/api/pages/getTotalPageAlbum.php?albumCount=${albumCount}`,{
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
}
)


export default AlbumsSlice