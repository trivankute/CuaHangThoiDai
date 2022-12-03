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

export default ArtistsSlice