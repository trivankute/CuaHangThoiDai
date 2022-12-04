import { memo } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './ServiceCard.module.css';
// import Loading from '../../Loading/Loading'

function ServiceCard({image, title, description}:{image:any, title:string, description:string}) {
    const navigate = useNavigate()
    return (
        <>
            <div className={styles.box}>
                {/* <Loading/> */}
                <img src={image} alt="">
                </img>
                <h3>{title}</h3>
                <p>{description}</p>
                <a onClick={()=>{navigate(`/products/albums?service=${title.toLowerCase()}&&page=1`)}} className="btn btn_custom">Watch now</a>
            </div>
        </>
    )
}

export default memo(ServiceCard)