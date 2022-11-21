import { memo } from 'react';

import styles from './ServiceCard.module.css';

function ServiceCard({image, title, description}:{image:any, title:string, description:string}) {
    return (
        <>
            <div className={styles.box}>
                <img src={image} alt=""></img>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href="#" className="btn btn_custom">Shop now</a>
            </div>
        </>
    )
}

export default memo(ServiceCard)