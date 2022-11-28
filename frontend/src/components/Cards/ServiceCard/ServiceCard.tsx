import { memo } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './ServiceCard.module.css';

function ServiceCard({image, title, description}:{image:any, title:string, description:string}) {
    const navigate = useNavigate()
    return (
        <>
            <div className={styles.box}>
                <img src={image} alt=""></img>
                <h3>{title}</h3>
                <p>{description}</p>
                <a onClick={()=>{navigate('/products/albums?service=Vinyl')}} className="btn btn_custom">Watch now</a>
            </div>
        </>
    )
}

export default memo(ServiceCard)