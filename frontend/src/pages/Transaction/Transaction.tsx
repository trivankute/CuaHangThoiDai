import { memo, useEffect } from 'react'

import { useLocation, useSearchParams } from 'react-router-dom'

import styles from "./Transaction.module.css"

import CartItem from '../../components/CartItem/CartItem'
import note_content from '../../components/CartItem/CartItem'
import BackNavigate from '../../components/BackNavigate/BackNavigate'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactionById } from '../../redux/slices/TransactionSlice'
import { TransactionStore } from '../../redux/selectors'

function Transaction() {
  // type 1 is order_online, type 2 is pickup_at_store
  const location = useLocation()
  const dispatch = useDispatch<any>()
  const transaction = useSelector(TransactionStore)
  // get id from url
  const id = location.pathname.split("/")[2]
  // get page=
  const [url] = useSearchParams()
  let page = url.get("page")
  // get data from navigate
  const type = location.state.type
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getTransactionById({ id }))
  }, [])
  return (
    <>

      <div className={styles.container}>
        <BackNavigate backPath={`/user/transactions?page=${page}`} backPage="Transactions" currentPage="Summary" />
        {
          transaction.data &&
          <>
            <p className={styles.note_title}>Order Summary</p>
            <p>Transaction ID: {transaction.data.transaction_id}</p>
            {
              type === "order_online" ? (
                <>
                  <p>Name: {transaction.data.customer.username}</p>
                  <p>Phone: {transaction.data.shipping.receiver_phone}</p>
                  <p>Address: {transaction.data.shipping.receiver_address}</p>
                </>
              ) : (
                <p>Guest picked up at store</p>
              )
            }
            <p>Time: {transaction.data.time } {transaction.data.date}</p>

            {/* <CartItem type="transaction_history"/> */}
            {
              transaction.data.transaction_items.map((album: any, index: any) => {
                return <CartItem key={index} type="transaction_history" album={album} />
              })
            }
            {
              type === "order_online" &&
              <div className={styles.note}>
                <div className={styles.note_title}>
                  Note:
                </div>
                <div className={styles.note_content}>
                  Please nhe nhang with my shipping
                </div>
              </div>
            }
            <div className={styles.buy}>
              <div className={styles.totalPrice}>
                <p>Subtotal: {transaction.data.total_price + " kVND"}</p>
                <p>Shipping: 0 KVND</p>
                <p>Total to pay : {transaction.data.total_price + " kVND"}</p>
              </div>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default memo(Transaction)
