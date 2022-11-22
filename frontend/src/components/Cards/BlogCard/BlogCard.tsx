import { memo } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './BlogCard.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar} from '@fortawesome/free-solid-svg-icons'

function BlogCard({image, title, description}:{image:any, title:string, description:string}) {
    const navigate = useNavigate()
    return (
        <>
            <div className={styles.box}>
                <img src={image} alt=""></img>
                <div className={styles.content}>
                    <div className={styles.icons}>
                        <a href="#">
                            <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> by user </a>
                        <a href="#">
                            <FontAwesomeIcon className={styles.icon} icon={faCalendar as IconProp} /> 1st may, 2021 </a>
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <a onClick={()=>{navigate('/products/blogs/1')}}className="btn btn_custom">read more</a>
                </div>
            </div>
        </>
    )
}

export default memo(BlogCard)