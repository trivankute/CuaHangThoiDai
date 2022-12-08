import { memo } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './BlogCard.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar, faWrench} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { UserStore } from '../../../redux/selectors';
import clsx from 'clsx';

function BlogCard({blog, handleShowAdjustBlog, oldPageId}:{oldPageId?:any, blog:any, handleShowAdjustBlog?:any}) {
    const navigate = useNavigate()
    const user = useSelector(UserStore)
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
                    <div className="w-100 d-flex justify-content-between align-items-center">
                    <a onClick={()=>{navigate(`/products/blogs/${blog.blog_id}`,{state:{
                        oldPageId:oldPageId
                    }})}}className="btn btn_custom">read more</a>
                    {
                        user.data && user.data.account.role!=="customer" &&
                        <>
                        <FontAwesomeIcon 
                        onClick={()=>{handleShowAdjustBlog(blog)}} 
                        className={clsx(styles.icon, styles.icon_wrench)} icon={faWrench as IconProp} />
                        </>
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(BlogCard)