import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { serverUrl } from "../../utils/config.utils";

const EmployeesSlice = createSlice({
    name:"EmployeesSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{
    },
    extraReducers(builder) {
        builder
        .addCase(getEmployeesByPageId.pending, (state,action) => {
            state.loading = true
        })
        .addCase(getEmployeesByPageId.fulfilled, (state,action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
        .addCase(deleteEmployeeById.pending, (state, action) => {
            state.loading = true
        })
        .addCase(deleteEmployeeById.fulfilled, (state, action) => {
            state.loading = false
        })
        .addCase(getEmployeesByName.pending, (state, action) => {
            state.loading = true
        })
        .addCase(getEmployeesByName.fulfilled, (state, action) => {
            state.loading = false
            const {status, data} = action.payload
            if(status==="success")
            state.data = data
        })
        .addCase(updateEmployeeStateById.pending, (state, action) => {
            state.loading = true
        })
        .addCase(updateEmployeeStateById.fulfilled, (state, action) => {
            state.loading = false
        })
    }   
})

export const getEmployeesByPageId = createAsyncThunk('getEmployeesByPageId', async (input : any) => {
    try {
        //{{host}}/api/pages/getEmployee.php?id=1&employeeCount=6
        const {id, employeeCount} = input
        const {data} = await axios.get(`${serverUrl}/api/pages/getEmployee.php?id=${id}&employeeCount=${employeeCount}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success","data":data.data.employees, "msg":data.data.msg};
        }
        else {
            return {status:"error", "data":data.data.employees,"msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})

export const getEmployeesTotalPages = createAsyncThunk('getEmployeesTotalPages', async (input : any) => {
    try {
        //{{host}}/api/pages/getTotalPageEmployee.php?employeeCount=6
        const {employeeCount} = input
        const {data} = await axios.get(`${serverUrl}/api/pages/getTotalPageEmployee.php?employeeCount=${employeeCount}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success","totalPage":data.data.totalPages, "msg":data.data.msg};
        }
        else {
            return {status:"error", "totalPage":data.data.totalPages,"msg":data.data.msg};
        }
    }
    catch(error : any) {
        return {status:"error","msg":error.response.data.message};
    }
})


export const deleteEmployeeById = createAsyncThunk('deleteEmployeeById', async (input: any) => {
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

export const getEmployeesByName= createAsyncThunk('getEmployeesByName', async (input: any) => {
    try {
        // {{host}}/api/pages/getEmployeeByName.php?id=1&employeeCount=6&name=theo
        const { id, employeeCount, name } = input;
        const { data } = await axios.get(`${serverUrl}/api/pages/getEmployeeByName.php?id=${id}&employeeCount=${employeeCount}&name=${name}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (data.status === 'success') {
            return { status: "success", "data": data.data.employees, "msg": data.data.msg };
        }
        else {
            return { status: "error", "data": data.data.employees, "msg": data.data.msg };
        }
    }
    catch (error: any) {
        return { status: "error", "msg": error.response.data.message };
    }
})

export const updateEmployeeStateById = createAsyncThunk('updateEmployeeStateById', async (input: any) => {
    try {
        // {{host}}/api/users/updateEmployeeState.php?id=17
        const { id, state } = input;
        const { data } = await axios.post(`${serverUrl}/api/users/updateEmployeeState.php?id=${id}`,{state:state}, {
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

export default EmployeesSlice;