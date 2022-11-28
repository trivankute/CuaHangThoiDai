import {memo} from 'react';

import styles from "./Transactions.module.css"

function Transactions() {
    return (
        <>
            <div className={styles.container}></div>
        </>
    )
}

export default memo(Transactions)