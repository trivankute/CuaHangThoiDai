import { serverUrl } from "./config.utils";
import axios from 'axios';
export const uploadAlbum = async (input : any) => {
    //{{host}}/api/albums/upload.php
    try {
        const {data} = await axios.post(`${serverUrl}/api/albums/upload.php`, input, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
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

export const getAllAlbums = async () => {
    //{{host}}/api/albums/getAll.php
    try {
        const {data} = await axios.get(`${serverUrl}/api/albums/getAll.php`);
        if(data.status === 'success'){
            return data.data.albums;
        }
        else {
            return data.data.msg;
        }
    }
    catch (error : any) {
        console.log(error);
    }
}