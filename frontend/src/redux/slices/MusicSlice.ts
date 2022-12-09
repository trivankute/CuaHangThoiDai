import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { serverUrl } from "../../utils/config.utils";

const MusicSlice = createSlice({
    name:"MusicSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getAllMusic.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAllMusic.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
        .addCase(createMusic.pending, (state,action) => {
            state.loading = true
        })
        .addCase(createMusic.fulfilled, (state,action) => {
            state.loading = false
        })
        .addCase(updateMusic.pending, (state,action) => {
            state.loading = true
        })
        .addCase(updateMusic.fulfilled, (state,action) => {
            state.loading = false
        })
        .addCase(deleteMusic.pending, (state,action) => {
            state.loading = true
        })
        .addCase(deleteMusic.fulfilled, (state,action) => {
            state.loading = false
        })
    }   
})
export const createMusic = createAsyncThunk('createMusic', async (input : any) => {
    try {
        // {{host}}/api/musics/create.php
        const {musicLink,title} = input;
        const {data} = await axios.post(`${serverUrl}/api/musics/create.php`,{
            musicLink,
            title
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success", "msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})
export const getAllMusic = createAsyncThunk('getAllMusic', async () => {
    try {
        //{{host}}/api/musics/getAll.php
        const {data} = await axios.get(`${serverUrl}/api/musics/getAll.php`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success", "data":data.data};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})
export const updateMusic = createAsyncThunk('updateMusic', async (input : any) => {
    try {
        // {{host}}/api/musics/update.php?id=1
        const {id, musicLink, title} = input;
        const {data} = await axios.post(`${serverUrl}/api/musics/update.php?id=${id}`,{
            musicLink,
            title
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(data)
        if(data.status === 'success'){
            return {status:"success", "msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})
export const deleteMusic = createAsyncThunk('deleteMusic', async (input : any) => {
    try {
        // {{host}}/api/musics/delete.php?id=1
        const {id} = input;
        const {data} = await axios.delete(`${serverUrl}/api/musics/delete.php?id=${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success", "msg":data.data.msg};
        }
        else {
            return {status:"error","msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})
export default MusicSlice;