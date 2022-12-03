import { memo } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './BlogCard.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar} from '@fortawesome/free-solid-svg-icons'

function BlogCard({blog}:{blog:any}) {
    const navigate = useNavigate()
    return (
        <>
            <div className={styles.box}>
                <img src={blog.avatar} alt=""></img>
                <div className={styles.content}>
                    <div className={styles.icons}>
                        <a href="#">
                            <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> by {blog.employeeName} </a>
                        <a href="#">
                            <FontAwesomeIcon className={styles.icon} icon={faCalendar as IconProp} /> {blog.date} </a>
                    </div>
                    <h3>{blog.topic}</h3>
                    <p>{blog.content}</p>
                    <a onClick={()=>{navigate(`/products/blogs/${blog.blog_id}`)}}className="btn btn_custom">read more</a>
                </div>
            </div>
        </>
    )
}

export default memo(BlogCard)