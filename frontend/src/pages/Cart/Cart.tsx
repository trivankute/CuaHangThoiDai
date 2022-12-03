import { memo, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'

import styles from './Cart.module.css'
import "../../globalCss.css"

import clsx from 'clsx'

import CartItem from '../../components/CartItem/CartItem'
import BackNavigate from '../../components/BackNavigate/BackNavigate'
import { useDispatch, useSelector } from 'react-redux'
import { CartStore } from '../../redux/selectors'
import CartSlice from '../../redux/slices/CartSlice'

function Cart() {
    const navigate = useNavigate()
    const cart = useSelector(CartStore)
    const dispatch = useDispatch<any>()
    useEffect(() => {
        // scroll to top of cart
        window.scrollTo(0, 0)
        // get cart from local storage
        dispatch(CartSlice.actions.handleLoadCart(""))
        dispatch(CartSlice.actions.handleTotalPrice(""))
    }, [cart.loading])
    return (
        <>
            <div className={styles.container}>
                <BackNavigate backPath="/" backPage="Home" currentPage="Cart"/>
                <div className={styles.header}>
                    Your cart:
                </div>
                <div className={styles.cartItems}>
                    {
                        cart.data && cart.data.map((album:any, index:any)=>{
                            return <CartItem key={index} type="in_cart" album={album} />
                        })
                    }

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
                            Total: $ {cart.data && cart.totalPrice}
                        </div>
                        <button onClick={()=>{navigate('/checkout')}} className={clsx('btn', 'btn_custom')}>Buy</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Cart)