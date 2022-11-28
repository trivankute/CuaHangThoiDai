import { memo, useEffect } from 'react'

import {useLocation} from 'react-router-dom'

import styles from "./Transaction.module.css"

import CartItem from '../../components/CartItem/CartItem'
import note_content from '../../components/CartItem/CartItem'
import BackNavigate from '../../components/BackNavigate/BackNavigate'

function Transaction() {
  // type 1 is order_online, type 2 is pickup_at_store
  const location = useLocation()
  // get data from navigate
  const type = location.state.type
  console.log(type)
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>

      <div className={styles.container}>
        <BackNavigate backPath="/user/transactions" backPage="Transactions" currentPage="Summary"/>

        <p className={styles.note_title}>Order Summary</p>
        <p>Transaction ID: 222333</p>
        {
          type === "order_online" ? (
            <>
          <p>Name: Trinh Tri Van</p>
          <p>Phone: 113</p>
          <p>Address: Hoa Lo prison</p>
            </>
          ) : (
          <p>Guest picked up at store</p>
          )
        }
        <p>Time: 19:43 22/12/2022</p>

        <CartItem type="transaction_history"/>
        {
          type === "order_online" &&
          <div className={styles.note}>
            <div className={styles.note_title}>
              Note:
                      </div>
            <div className={styles.note_content}>

            </div>
          </div>
        }
        <div className={styles.buy}>
          <div className={styles.totalPrice}>
            <p>Subtotal: $ 27.99</p>
            <p>Shipping: $ 0</p>
            <p>Total to pay : $ 27.99</p>
        </div>
        </div>
      </div>
    </>
  )
}

export default memo(Transaction)
