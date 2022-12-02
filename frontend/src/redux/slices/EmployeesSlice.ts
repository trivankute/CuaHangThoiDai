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
export default EmployeesSlice;