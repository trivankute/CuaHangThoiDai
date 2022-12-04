import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import axios from 'axios'

import { serverUrl } from '../../utils/config.utils'

const AlbumsSlice = createSlice({
    name:"AlbumsSlice",
    initialState:{
        loading:false,
        data:false,
        totalPage:false
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
        .addCase(getAlbumsTotalPages.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAlbumsTotalPages.fulfilled, (state,action) => {
            state.loading = false
        })
        .addCase(getAllAlbumsByPageIdAndType.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAllAlbumsByPageIdAndType.fulfilled, (state,action) => {
            state.loading = false
            const {status, data, totalPage} = action.payload
            if(status==="success")
            {
                state.data = data
                state.totalPage = totalPage
            }
        })
        .addCase(getAllAlbumsByPageIdAndArtist.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAllAlbumsByPageIdAndArtist.fulfilled, (state,action) => {
            state.loading = false
            const {status, data, totalPage} = action.payload
            if(status==="success")
            {
                state.data = data
                state.totalPage = totalPage
            }
        })
        .addCase(getAllAlbumsByPageIdAndTitle.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getAllAlbumsByPageIdAndTitle.fulfilled, (state,action) => {
            state.loading = false
            const {status, data, totalPage} = action.payload
            if(status==="success")
            {
                state.data = data
                state.totalPage = totalPage
            }
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

export const getAllAlbumsByPageIdAndType = createAsyncThunk('getAllAlbumsByPageIdAndType', async (input:any) => {
    const {id, albumCount, type} = input
    // {{host}}/api/pages/getAlbumByType.php?id=1&albumCount=8&type=cd
    try {
        const {data} = await axios.get(`${serverUrl}/api/pages/getAlbumByType.php?id=${id}&albumCount=${albumCount}&type=${type.toLowerCase()}`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.albums, "totalPage":data.data.totalPage, "msg":data.data.msg};
        }
        else {
            return {status:"error", "msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
}
)

export const getAllAlbumsByPageIdAndArtist = createAsyncThunk('getAllAlbumsByPageIdAndArtist', async (input:any) => {
    const {id, albumCount, artistId} = input
    // {{host}}/api/pages/getAlbumByArtist.php?id=1&albumCount=8&artistId=18
    try {
        const {data} = await axios.get(`${serverUrl}/api/pages/getAlbumByArtist.php?id=${id}&albumCount=${albumCount}&artistId=${artistId}`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.albums, "totalPage":data.data.totalPage, "msg":data.data.msg};
        }
        else {
            return {status:"error", "msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
}
)

export const getAllAlbumsByPageIdAndTitle = createAsyncThunk('getAllAlbumsByPageIdAndTitle', async (input:any) => {
    const {id, albumCount, title} = input
    // {{host}}/api/pages/getAlbumByTitle.php?id=1&albumCount=8&title=tr
    try {
        const {data} = await axios.get(`${serverUrl}/api/pages/getAlbumByTitle.php?id=${id}&albumCount=${albumCount}&title=${title}`,{
            headers: {
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.albums, "totalPage":data.data.totalPage, "msg":data.data.msg};
        }
        else {
            return {status:"error", "msg":data.data.msg};
        }
    }
    catch (error : any) {
        return {status:"error","msg":error.response.data.message};
    }
}
)
export const getAlbumsTotalPages = createAsyncThunk('getAlbumsTotalPages', async (input:any) => {
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