import {memo, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import BackNavigate from '../../components/BackNavigate/BackNavigate'

import styles from './PageForNotification.module.css'
import clsx from 'clsx'
function PageForNotification() {
    const navigate = useNavigate();
    const location = useLocation()
    const [state, setState] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [btnTitle, setBtnTitle] = useState("")
    const [btnPath, setBtnPath] = useState("")
        // scroll to top
        useEffect(() => {
            window.scrollTo(0, 0)
            // get data from navigate
            const data = location.state
            if (data) {
                setTitle(data.title)
                setDescription(data.description)
                setState(data.state)
                setBtnTitle(data.btn_title)
                setBtnPath(data.btn_path)
            }

        }, [])
    return(
        <>
            <div className={styles.container}>
                <BackNavigate backPath="/" backPage="Home" currentPage="Notification"/>
                <div className={styles.box}>
                <div className={styles.header}>
                    Notification
                </div>
                <div className={styles.content}>
                    <div className={clsx(styles.content_title,{
                        [styles.success]: state === "success",
                        [styles.error]: state === "error",
                    })}>
                        {title?title:"Please goes back"}
                    </div>
                    <div className={styles.content_description}>
                        {description?description:""}
                    </div>
                </div>
                <div onClick={()=>{navigate(btnPath?btnPath:"/",{state:{
                    type:btnPath?"order_online":"pickup_at_store"
                }})}} className={clsx("btn btn_custom", styles.btn)}>
                    {btnTitle?btnTitle:"Please go back"}
                </div>
                </div>
            </div>
        </>
    )
}

export default memo(PageForNotification)