import axios from 'axios';
import { serverUrl } from './config.utils';
export const registerCustomer = async (input : any) => {
    //{{host}}/api/users/register.php
    try {
        const {data} = await axios.post(`${serverUrl}/api/users/register.php`, input,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        if(data.status === "success") {
            return data.data.msg;
        }
    }
    catch (error : any) {
        console.log(error);
    }
}

export const login = async (input : {
    email : string,
    password : string
}) => {
    //{{host}}/api/users/login.php
    try {
        const {data} = await axios.post(`${serverUrl}/api/users/login.php`, input);
        if(data.status === 'success'){
            localStorage.setItem('token', data.data.token);
            return data.data.msg;
        }
        else {
            return data.data.msg;
        }
    }
    catch (error : any) {
        console.log(error);
    }
}

export const getMe = async () => {
    //{{host}}/api/users/me.php
    try {
        const {data} = await axios.get(`${serverUrl}/api/users/me.php`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return data.data.user;
        }
        else {
            return data.data.msg;
        }
    }
    catch (error : any) {
        alert(error.response.data.message);
    }
}

export const logout = async () => {
    //{{host}}/api/users/logout.php
    try {
        const {data} = await axios.get(`${serverUrl}/api/users/logout.php`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            localStorage.removeItem('token');
            return data.data.msg;
        }
        else {
            return data.data.msg;
        }
    }
    catch (error : any) {
        console.log(error);
    }
}