import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import axios from 'axios'

import { serverUrl } from '../../utils/config.utils'

const ReviewsSlice = createSlice({
    name:"ReviewsSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getReviewsHightScore.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(getReviewsHightScore.fulfilled, (state, action)=>{
            state.loading = false
            const {status, data} = action.payload
            if(status === 'success'){
                state.data = data
            }
        })
    }
})



export const getReviewsHightScore = createAsyncThunk('getReviewsHightScore', async () => {
    try {
        //{{host}}/api/reviews/getHighestScore.php?count=4
        const {data} = await axios.get(`${serverUrl}/api/reviews/getHighestScore.php?count=4`,{
            headers: {
            }
        });
        console.log(data);
        if(data.status === "success"){
            return {status:"success","data":data.data.reviews, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.reviews,"msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})
export default ReviewsSlice