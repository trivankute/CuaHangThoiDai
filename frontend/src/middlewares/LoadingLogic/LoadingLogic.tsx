import {memo} from 'react';
import { useSelector } from 'react-redux';
import { UserStore } from '../../redux/selectors';
import Loading from '../../components/Loading/Loading';

function LoadingLogic(props:any) {
    const user = useSelector(UserStore)
    return (
        <>
            {
                user.loading?
                    <>
                    {props.small?
                    <Loading small/>
                    :
                    <Loading/>
                    }
                    </>
                  :
                  <>
                  {props.children}
                  </>
            }
        </>
    )
}

export default memo(LoadingLogic)