import {memo, useEffect} from 'react'

import styles from "./Manager.module.css"

import Header from "../../components/User/Header/Header"

import Brand from "../../components/Brand/Brand"

import clsx from 'clsx'

function Manager() {
    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={styles.container}>
                <Header title="Store Manager" content="Manage your products"/>

            </div>
        </>
    )
}

export default memo(Manager)