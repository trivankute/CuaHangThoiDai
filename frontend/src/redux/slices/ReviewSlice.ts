import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

import axios from 'axios'

import { serverUrl } from '../../utils/config.utils'

const ReviewSlice = createSlice({
    name:"ReviewSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(submitReview.pending, (state, action)=>{
            state.loading = true

        })
        .addCase(submitReview.fulfilled, (state, action)=>{
            state.loading = false

        })
    }
})

export const submitReview = createAsyncThunk('submitReview', async (input:any) =>{
    const {id, content, score} = input
    // {{host}}/api/reviews/create.php?albumId=21
    try {
        const {data} = await axios.post(`${serverUrl}/api/reviews/create.php?albumId=${id}`, {
            content:content,
            score:score
        },{
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

export default ReviewSlice