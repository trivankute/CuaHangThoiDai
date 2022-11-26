import { memo, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'

import styles from './Cart.module.css'
import "../../globalCss.css"

import clsx from 'clsx'

import CartItem from '../../components/CartItem/CartItem'
import BackNavigate from '../../components/BackNavigate/BackNavigate'

function Cart() {
    const navigate = useNavigate()
    useEffect(() => {
        // scroll to top of cart
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={styles.container}>
                <BackNavigate backPath="/" backPage="Home" currentPage="Cart"/>
                <div className={styles.header}>
                    Your cart:
                </div>
                <div className={styles.cartItems}>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />

                </div>
                <div className={styles.footer}>
                    <div className={styles.note}>
                        <div className={styles.note_title}>
                            Note:
                            </div>
                        <textarea className={styles.note_content}>

                        </textarea>
                    </div>
                    <div className={styles.buy}>
                        <div className={styles.totalPrice}>
                            Total: $ 27.96
                        </div>
                        <button onClick={()=>{navigate('/checkout')}} className={clsx('btn', 'btn_custom')}>Buy</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Cart)