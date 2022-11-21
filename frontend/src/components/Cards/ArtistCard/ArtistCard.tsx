import { memo } from 'react';

import styles from './ArtistCard.module.css';

function ArtistCard({image, name, description}:{image:any, name:string, description:string}) {
    return (
        <>
            <div className={styles.box}>
                <img src={image} alt=""></img>
                <h3>{name}</h3>
                <p>{description}</p>
                <a href="#" className="btn btn_custom">shop now</a>
            </div>
        </>
    )
}

export default memo(ArtistCard)