import {memo} from 'react';

import styles from "./TransactionItem.module.css"


function TransactionItem({type, state,transaction_id, delivery_parner, time,onClick}:{type:any,onClick:any,state:any,transaction_id:any,delivery_parner:any,time:any}) {
// type1 is order_online, type2 is pickup_at_store
    return (
        <>
            <div className={styles.box}>
              <div className={styles.box1}>
                <div>Your delivery <span className={styles.id}>{transaction_id}</span> is {state}</div>
                <div>By {delivery_parner}</div>
                <div>at {time}</div>
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
