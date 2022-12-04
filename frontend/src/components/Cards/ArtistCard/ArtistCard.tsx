import { memo } from 'react';
import {useNavigate} from 'react-router-dom'

import styles from './ArtistCard.module.css';

function ArtistCard({id, image, name, description}:{id:any, image:any, name:string, description:string}) {
    const navigate = useNavigate()
    return (
        <>
            <div className={styles.box}>
                <img src={image} alt=""></img>
                <h3>{name}</h3>
                <p>{description}</p>
                <a onClick={()=>{navigate(`/products/albums?artist=${name}&&artistId=${id}&&page=1`)}} className="btn btn_custom">shop now</a>
            </div>
        </>
    )
}

export default memo(ArtistCard)