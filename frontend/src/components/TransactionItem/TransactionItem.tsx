import {memo} from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./TransactionItem.module.css"


// function TransactionItem({type, state,transaction_id, delivery_parner, time,onClick,total_amount}:{type:any,onClick:any,state:any,transaction_id:any,delivery_parner:any,time:any,total_amount:any}) {
function TransactionItem({transaction}:{transaction:any}) {
// type1 is order_online, type2 is pickup_at_store
    const navigate = useNavigate();
    function handleOnClick(){
      navigate(`/transactions/${transaction.transaction_id}`, {
        state: {
          type: "order_online"
        }
    })}
    return (
        <>
            <div className={styles.box}>
              <div className={styles.box1}>
                <div>Delivery <span className={styles.id}>{transaction.transaction_id}</span> is {transaction.shipping.state}</div>
                <div className={styles.total}>Total {transaction.total_price}</div>
                <div>By {transaction.shipping.delivery_partner} at {transaction.shipping.date_arrive} {transaction.shipping.time_arrive}</div>
              </div>
              <div className={styles.box2}>
                  <button onClick={handleOnClick} className="btn btn_custom ">View more</button>
                  <div className={styles.actionLinks}>
                    <a href="">
                      Cancel
                    </a>
                    <a href="">
                      Done
                    </a>
                  </div>
                  <span>
                  {transaction.type_of_shipping}
                  </span>
              </div>

            </div>
        </>
    )
}



export default memo(TransactionItem)
