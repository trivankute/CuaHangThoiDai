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
        .addCase(updateReview.pending, (state, action)=>{
            state.loading = true

        })
        .addCase(updateReview.fulfilled, (state, action)=>{
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

export const updateReview = createAsyncThunk('updateReview', async (input:any) =>{
    const {id, content, score} = input
    // {{host}}/api/reviews/update.php?id=15
    try {
        const {data} = await axios.post(`${serverUrl}/api/reviews/update.php?id=${id}`,{
            score:score,
            content:content
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

export const deleteReview = createAsyncThunk('deleteReview', async (input:any) =>{
    const {id} = input
    // {{host}}/api/reviews/delete.php?id=14
    try {
        const {data} = await axios.get(`${serverUrl}/api/reviews/delete.php?id=${id}`,{
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