import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../../redux/selectors';
import { updateShippingTransactionShippingPartner, updateShippingTransactionState } from '../../redux/slices/TransactionSlice';

import styles from "./TransactionItem.module.css"


// function TransactionItem({type, state,transaction_id, delivery_parner, time,onClick,total_amount}:{type:any,onClick:any,state:any,transaction_id:any,delivery_parner:any,time:any,total_amount:any}) {
function TransactionItem({ transaction, pageId, setForReloadPage }: { setForReloadPage:any, transaction: any, pageId: any }) {
  // type1 is order_online, type2 is pickup_at_store
  const navigate = useNavigate();
  const dispatch = useDispatch<any>()
  const user = useSelector(UserStore)
  function handleOnClick() {
    navigate(`/transactions/${transaction.transaction_id}&&page=${pageId}`, {
      state: {
        type: "order_online"
      }
    })
  }
  function handleCancel() {

  }
  function handleShip() {
    dispatch(updateShippingTransactionShippingPartner({
      id:transaction.transaction_id,
      deliverPartner:user.data.account.username
    }))
    .then((res:any)=>{
      if(res.payload.status === 'success'){
        dispatch(updateShippingTransactionState({
          id:transaction.transaction_id,
          state:"delivering"
        }))
        .then((res:any)=>{
          if(res.payload.status === 'success'){
            setForReloadPage((prev:boolean)=>!prev)
          }
        })
      }
    })
  }
  function handleDone() {
    dispatch(updateShippingTransactionState({
      id:transaction.transaction_id,
      state:"delivered"
    }))
    .then((res:any)=>{
      if(res.payload.status === 'success'){
        setForReloadPage((prev:boolean)=>!prev)
      }
    })
  }
  return (
    <>
      <div className={styles.box}>
        {
          transaction.type_of_shipping === "shipping" &&
          <>
            <div className={styles.box1}>
              <div>DeliveryID <span className={styles.id}>{transaction.transaction_id}</span> is {transaction.shipping.state}</div>
              <div className={styles.total}>Total {transaction.total_price} KVND</div>
              <div> Shipping By <span className={styles.id}>{transaction.shipping.deliver_partner || "Your shipping is not accepted"}</span> at {transaction.shipping.date_arrive || "..."} {transaction.shipping.time_arrive || "..."}</div>
            </div>
            <div className={styles.box2}>
              <button onClick={handleOnClick} className="btn btn_custom ">View more</button>
              {
                user.data && user.data.account.role !== "customer" &&
                <div className={styles.actionLinks}>
                  {
                    transaction.shipping.state !== "delivered" &&
                    <a style={{ cursor: "pointer" }} onClick={handleCancel}>
                      Cancel
                    </a>
                  }
                  {
                    !transaction.shipping.deliver_partner &&
                    <a style={{ cursor: "pointer" }} onClick={handleShip}>
                      Ship
                    </a>
                  }
                  {
                    transaction.shipping.state !== "delivered" &&
                    <a style={{ cursor: "pointer" }} onClick={handleDone}>
                      Done
                    </a>
                  }
                </div>
              }
              <span>
                {transaction.type_of_shipping}
              </span>
            </div>
          </>
        }
        {
          transaction.type_of_shipping === "pick_up" &&
          <>
            <div className={styles.box1}>
              <div>DeliveryID <span className={styles.id}>{transaction.transaction_id}</span> is sold at store</div>
              <div className={styles.total}>Total {transaction.total_price} KVND</div>
            </div>
            <div className={styles.box2}>
              <button onClick={handleOnClick} className="btn btn_custom mb-3">View more</button>

              <span>
                {transaction.type_of_shipping}
              </span>
            </div>
          </>
        }

      </div>
    </>
  )
}



export default memo(TransactionItem)
