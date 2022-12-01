import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom'
import Loading from '../components/Loading/Loading';
import { UserStore } from '../redux/selectors';

function AdminAndEmployeeOnly() {
    const user = useSelector(UserStore)
    const navigate = useNavigate()
    function handleNavigate() {
        if (user.data.account.role !== 'employee' && user.data.account.role !== 'admin') {
            navigate('/notification', {
                state: {
                    title: "You don't have permission to access this page",
                    description: "Please go back to home page",
                    state: "error",
                    btn_title: "Go back",
                    btn_path: "/"
                }
            })
        }
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

export default memo(AdminAndEmployeeOnly)