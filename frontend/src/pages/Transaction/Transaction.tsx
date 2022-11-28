import { memo } from 'react'

import styles from "./Transaction.module.css"

import CartItem from '../../components/CartItem/CartItem'
import note_content from '../../components/CartItem/CartItem'
import BackNavigate from '../../components/BackNavigate/BackNavigate'

function Transaction() {
  return (
    <>

      <div className={styles.container}>
        <BackNavigate backPath="/user/transactions" backPage="Transactions" currentPage="Summary"/>

        <p className={styles.note_title}>Order Summary</p>
        <p>Transaction ID: 222333</p>
        <p>Name: Trinh Tri Van</p>
        <p>Phone: 113</p>
        <p>Address: Hoa Lo prison</p>
        <p>Time: 19:43 22/12/2022</p>

        <CartItem />
        <div className={styles.note}>
          <div className={styles.note_title}>
            Note:
                    </div>
          <div className={styles.note_content}>

          </div>
        </div>
        <div className={styles.buy}>
          <div className={styles.totalPrice}>
            <p>Subtotal: $ 27.99</p>
            <p>Shipping: $ 0</p>
            <p>Total to pay : $ 27.99</p>
                    </div>
          <div className={styles.icons}>
            Choose your payment method
                  <div>
                      <img src="https://img.icons8.com/color/48/000000/visa.png"></img>
                      <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png"></img>
                      <img src="https://img.icons8.com/color/48/000000/maestro.png"></img>
                  </div>

          </div>
        </div>
        <button className={styles.btn}>Place order</button>
        <button className={styles.btn}>Update</button>
      </div>
    </>
  )
}

export default memo(Transaction)
