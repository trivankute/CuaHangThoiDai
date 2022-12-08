import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom'
import Loading from '../components/Loading/Loading';
import { UserStore } from '../redux/selectors';

function CheckBanned() {
    const user = useSelector(UserStore)
    const navigate = useNavigate()
    function handleNavigate() {
        console.log(user)
        // if (user.data.account.role !== 'admin') {
        //     navigate('/notification', {
        //         state: {
        //             title: "Your account has been banned",
        //             description: "Please contact admin to get more information",
        //             state: "error",
        //             btn_title: "Go back",
        //             btn_path: "/"
        //         }
        //     })
        // }
    }
    useEffect(()=>{
        if(user.data)
        {
            handleNavigate()
        }
    },[])
    return (
        <>
            {
                user.data ?
                    <>
                        <Outlet />
                    </>
                    :
                    <Loading />
            }
        </>
    );
}

export default memo(CheckBanned)