import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import Loading from '../components/Loading/Loading';
import { UserStore } from '../redux/selectors';

function LoggedIn() {
    // middlewares for checking logged in but, the main code is in App.tsx
    // this is just used for only loadding effect for guests
    const user = useSelector(UserStore)
    return (
        <>
            {
                !user.data ?
                    <Loading />
                    :
                    <>
                        <Outlet />
                    </>
            }
        </>
    );
}

export default memo(LoggedIn)