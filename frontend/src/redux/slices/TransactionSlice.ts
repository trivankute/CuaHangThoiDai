import {createSlice} from "@reduxjs/toolkit"

const TransactionSlice = createSlice({
    name:"TransactionSlice",
    initialState:{
        flashOpen:false,
        flashMessage:"",
        flashType:""
    },
    reducers:{
        handleOpen: (state, action) => {
            const {message, type} = action.payload;
            state.flashOpen = true;
            state.flashMessage = message;
            state.flashType = type;
        },
        handleClose: (state, action) => {
            state.flashOpen = false;
        }
    }
})

export default TransactionSlice