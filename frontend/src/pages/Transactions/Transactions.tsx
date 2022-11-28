import {memo} from 'react';
import {useNavigate} from 'react-router-dom'
import styles from "./Transactions.module.css"

import TransactionItem from '../../components/TransactionItem/TransactionItem'
function Transactions() {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.container}>
              <TransactionItem onClick={()=>{navigate('/transactions/1')}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} time={"11:22 12/12/2012"}/>
            </div>
        </>
    )
}

export default memo(Transactions)
