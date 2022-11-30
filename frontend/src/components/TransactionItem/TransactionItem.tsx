import {memo} from 'react';

import styles from "./TransactionItem.module.css"


function TransactionItem({type, state,transaction_id, delivery_parner, time,onClick,total_amount}:{type:any,onClick:any,state:any,transaction_id:any,delivery_parner:any,time:any,total_amount:any}) {
// type1 is order_online, type2 is pickup_at_store
    return (
        <>
            <div className={styles.box}>
              <div className={styles.box1}>
                <div>Delivery <span className={styles.id}>{transaction_id}</span> is {state}</div>
                <div className={styles.total}>Total {total_amount}</div>
                <div>By {delivery_parner} at {time}</div>
              </div>
              <div className={styles.box2}>
                  <button onClick={onClick} className="btn btn_custom ">View more</button>
                  <span>
                  {type}
                  </span>
              </div>


            </div>
        </>
    )
}



export default memo(TransactionItem)
