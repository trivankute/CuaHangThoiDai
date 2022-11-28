import {memo} from 'react';

import styles from "./TransactionItem.module.css"

function TransactionItem() {
    return (
        <>
            <div className={styles.box}>
                <div>Your delivery is done</div>
                <div>By Grab at 11:22 23/12/2022</div>
            </div>
        </>
    )
}



export default memo(TransactionItem)
