import {memo, useEffect} from 'react';

import styles from "./Password.module.css"; 

import Header from "../../components/User/Header/Header"

function Password() {
    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={styles.container}>
                <Header title="Set Password" content="For your account's security, do not share your password with anyone else"/>
                <div className={styles.box}>
                <input className={styles.password} placeholder="your current password">

                </input>
                <input className={styles.password} placeholder="new password">

                </input>
                </div>
                <div className="btn btn_custom">
                    submit
                </div>
            </div>
        </>
    )
}

export default memo(Password)