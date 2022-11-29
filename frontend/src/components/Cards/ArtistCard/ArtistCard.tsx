import { memo } from 'react';
import {useNavigate} from 'react-router-dom'

import styles from './ArtistCard.module.css';
import Loading from '../../Loading/Loading'

function ArtistCard({image, name, description}:{image:any, name:string, description:string}) {
    const navigate = useNavigate()
    return (
        <>
            <div className={styles.box}>
            <Loading/>
                <img src={image} alt=""></img>
                <h3>{name}</h3>
                <p>{description}</p>
                <a onClick={()=>{navigate('/products/albums?artist=Trivan')}} className="btn btn_custom">shop now</a>
            </div>
        </>
    )
}

export default memo(ArtistCard)