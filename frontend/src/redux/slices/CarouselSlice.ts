import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { serverUrl } from "../../utils/config.utils";

const CarouselSlice = createSlice({
    name:"CarouselSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getAllCarousel.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAllCarousel.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
        .addCase(createCarousel.pending, (state,action) => {
            state.loading = true
        })
        .addCase(createCarousel.fulfilled, (state,action) => {
            state.loading = false
        })
        .addCase(updateCarousel.pending, (state,action) => {
            state.loading = true
        })
        .addCase(updateCarousel.fulfilled, (state,action) => {
            state.loading = false
        })
        .addCase(deleteCarousel.pending, (state,action) => {
            state.loading = true
        })
        .addCase(deleteCarousel.fulfilled, (state,action) => {
            state.loading = false
        })
    }   
})
export const createCarousel = createAsyncThunk('createCarousel', async (input : any) => {
    //{{host}}/api/carousels/create.php
    try {
        const {carouselLink} = input;
        const {data} = await axios.post(`${serverUrl}/api/carousels/create.php`,{
            carouselLink
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
export const getAllCarousel = createAsyncThunk('getAllCarousel', async () => {
    try {
        //{{host}}/api/carousels/getAll.php
        const {data} = await axios.get(`${serverUrl}/api/carousels/getAll.php`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
export const updateCarousel = createAsyncThunk('updateCarousel', async (input : any) => {
    try {
        const {id,carouselLink} = input;
        const {data} = await axios.put(`${serverUrl}/api/carousels/update.php?id=${id}`,{
            carouselLink
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
export const deleteCarousel = createAsyncThunk('deleteCarousel', async (input : any) => {
    try {
        //{{host}}/api/carousels/delete.php?id=1
        const {id} = input;
        const {data} = await axios.get(`${serverUrl}/api/carousels/delete.php?id=${id}`,{
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
export default CarouselSlice;