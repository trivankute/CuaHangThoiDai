import {memo} from 'react';

import styles from "./Transactions.module.css"

import TransactionItem from '../../components/TransactionItem/TransactionItem'
function Transactions() {
    return (
        <>
            <div className={styles.container}>
              <TransactionItem/>
            </div>
        </>
    )
}

export default memo(Transactions)
