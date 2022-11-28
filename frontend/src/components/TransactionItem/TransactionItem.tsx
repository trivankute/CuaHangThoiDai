import {memo} from 'react';

import styles from "./TransactionItem.module.css"

function TransactionItem() {
    return (
        <>
            <div className={styles.box}></div>
        </>
    )
}

export default memo(TransactionItem)

