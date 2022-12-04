import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

import axios from 'axios'

import { serverUrl } from '../../utils/config.utils'

const ServiceSlice = createSlice({
    name:"ServiceSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getCountByType.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(getCountByType.fulfilled, (state, action)=>{
            state.loading = false
        })
    }
})

export const getCountByType = createAsyncThunk('getCountByType', async (input:any) =>{
    const {type} = input
    // {{host}}/api/albums/getCountByType.php?type=vinyl
    try {
        const {data} = await axios.get(`${serverUrl}/api/albums/getCountByType.php?type=${type}`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success", "count":data.data.count, "msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})

export default ServiceSlice