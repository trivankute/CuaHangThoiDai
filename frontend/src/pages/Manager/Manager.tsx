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
                <Header title="Store Manager" content="Manage your products, orders, coupons"/>
                <div className={styles.brand_box}>
                <Brand brand_style={styles.brand_style}/>
                </div>
                <div className={styles.btn_box}>
                <div className={clsx("btn btn_custom",styles.btn)}>
                    Manager Products
                </div>
                <div className={clsx("btn btn_custom",styles.btn)}>
                    Manager Orders
                </div>
                <div className={clsx("btn btn_custom",styles.btn)}>
                    Manager Vouchers
                </div>
                </div>

            </div>
        </>
    )
}

export default memo(Manager)