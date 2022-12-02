import {memo} from 'react';
import { useSelector } from 'react-redux';
import { AlbumsStore } from '../../redux/selectors';
import Loading from '../../components/Loading/Loading';

function AlbumsLoadingLogic(props:any) {
    const albums = useSelector(AlbumsStore)
    return (
        <>
            {
                albums.loading?
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

export default memo(AlbumsLoadingLogic)