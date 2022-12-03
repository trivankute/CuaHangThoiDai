import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

import axios from 'axios'

import { serverUrl } from '../../utils/config.utils'


const ArtistsSlice = createSlice({
    name:"ArtistsSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getAllArtists.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAllArtists.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
        .addCase(getAllArtistsByPageId.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAllArtistsByPageId.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
    }
})

export const getAllArtists = createAsyncThunk('getAllArtists', async () => {
    // {{host}}/api/artists/getAll.php
    try {
        const {data} = await axios.get(`${serverUrl}/api/artists/getAll.php`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.artists, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.artists,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})

export const getAllArtistsByPageId = createAsyncThunk('getAllArtistsByPageId', async (input: any) => {
    const {id, artistCount} = input
    // {{host}}/api/pages/getArtist.php?id=1&artistCount=6
    try {
        const {data} = await axios.get(`${serverUrl}/api/pages/getArtist.php?id=${id}&artistCount=${artistCount}`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.artists, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.artists,"msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})

export const getArtistsTotalPages = createAsyncThunk('getArtistsTotalPages', async (input : any) => {
    try {
        //{{host}}/api/pages/getTotalPageArtist.php?artistCount=6
        const {artistCount} = input
        const {data} = await axios.get(`${serverUrl}/api/pages/getTotalPageArtist.php?artistCount=${artistCount}`,{
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

export default ArtistsSlice