import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'

import url from '../../serverUrls'

const UserSlice = createSlice({
    name:"UserSlice",
    initialState:{
        loading:false,
        mainData:""
    },
    reducers:{
    }
    ,
    extraReducers(builder) {
        builder
        .addCase(axiosGetUser.pending,(state,action) => {
            state.loading = true
        } )
        .addCase(axiosGetUser.fulfilled, (state,action) => {
            state.loading = false
            const {user} = action.payload.data
            state.mainData = user
        })
    },
})

export const axiosGetUser = createAsyncThunk('axiosGetUser', async (userId:String) => {
    const res = await axios.post(url, {id:userId}, { withCredentials: true})
    return res
})


export default UserSlice