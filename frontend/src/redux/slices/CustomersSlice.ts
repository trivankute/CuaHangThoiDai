import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { serverUrl } from "../../utils/config.utils";

const CustomersSlice = createSlice({
    name: "CustomersSlice",
    initialState: {
        loading: false,
        data: false
    },
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(getCustomersByPageId.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getCustomersByPageId.fulfilled, (state, action) => {
                state.loading = false
                const { status, data } = action.payload
                if (status === "success")
                    state.data = data
            })
            .addCase(getCustomersByName.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getCustomersByName.fulfilled, (state, action) => {
                state.loading = false
                const { status, data } = action.payload
                if (status === "success")
                    state.data = data
            })
            .addCase(deleteCustomerById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteCustomerById.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(updateCustomerStateById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateCustomerStateById.fulfilled, (state, action) => {
                state.loading = false
            })
    }
})

export const getCustomersByPageId = createAsyncThunk('getCustomersByPageId', async (input: any) => {
    try {
        //{{host}}/api/pages/getCustomer.php?id=1&customerCount=6
        const { id, customerCount } = input;
        const { data } = await axios.get(`${serverUrl}/api/pages/getCustomer.php?id=${id}&customerCount=${customerCount}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (data.status === 'success') {
            return { status: "success", "data": data.data.customers, "msg": data.data.msg };
        }
        else {
            return { status: "error", "data": data.data.customers, "msg": data.data.msg };
        }
    }
    catch (error: any) {
        return { status: "error", "msg": error.response.data.message };
    }
})

export const getCustomersByName= createAsyncThunk('getCustomersByName', async (input: any) => {
    try {
        // {{host}}/api/pages/getCustomerByName.php?id=1&customerCount=6&name=a
        const { id, customerCount, name } = input;
        const { data } = await axios.get(`${serverUrl}/api/pages/getCustomerByName.php?id=${id}&customerCount=${customerCount}&name=${name}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(data)
        if (data.status === 'success') {
            return { status: "success", "data": data.data.customers, "msg": data.data.msg };
        }
        else {
            return { status: "error", "data": data.data.customers, "msg": data.data.msg };
        }
    }
    catch (error: any) {
        return { status: "error", "msg": error.response.data.message };
    }
})

export const getCustomersTotalPages = createAsyncThunk('getCustomersTotalPages', async (input: any) => {
    try {
        //{{host}}/api/pages/getTotalPageCustomer.php?customerCount=6
        const { customerCount } = input;
        const { data } = await axios.get(`${serverUrl}/api/pages/getTotalPageCustomer.php?customerCount=${customerCount}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (data.status === 'success') {
            return { status: "success", "totalPage": data.data.totalPages, "msg": data.data.msg };
        }
        else {
            return { status: "error", "totalPage": data.data.totalPages, "msg": data.data.msg };
        }
    }
    catch (error: any) {
        return { status: "error", "msg": error.response.data.message };
    }
})

export const deleteCustomerById = createAsyncThunk('deleteCustomerById', async (input: any) => {
    try {
        //{{host}}{{host}}/api/users/delete.php?id=12
        const { id } = input;
        const { data } = await axios.get(`${serverUrl}/api/users/delete.php?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (data.status === 'success') {
            return { status: "success","msg": data.data.msg };
        }
        else {
            return { status: "error","msg": data.data.msg };
        }
    }
    catch (error: any) {
        return { status: "error", "msg": error.response.data.message };
    }
})

export const updateCustomerStateById = createAsyncThunk('updateCustomerStateById', async (input: any) => {
    try {
        // {{host}}/api/users/updateCustomerState.php?id=17
        const { id, state } = input;
        const { data } = await axios.post(`${serverUrl}/api/users/updateCustomerState.php?id=${id}`,{state:state}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        if (data.status === 'success') {
            return { status: "success","msg": data.data.msg };
        }
        else {
            return { status: "error","msg": data.data.msg };
        }
    }
    catch (error: any) {
        return { status: "error", "msg": error.response.data.message };
    }
})
export default CustomersSlice;