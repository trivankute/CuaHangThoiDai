import { memo , useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Cart.module.css'

import clsx from 'clsx'
import NumberTop from "../NumberTop/NumberTop";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import CartItem from '../CartItem/CartItem'
import CartSlice from '../../redux/slices/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CartStore } from '../../redux/selectors';

function Cart() {
    const navigate = useNavigate()
    const cart = useSelector(CartStore)
    const dispatch = useDispatch<any>()
    useEffect(() => {
        // get cart from local storage
        dispatch(CartSlice.actions.handleLoadCart(""))
    },[cart.loading])
    return (
        <>
            <div id="cart-btn" className={styles.icon_box} style={{ position: 'relative' }}>
                <FontAwesomeIcon className={clsx(styles.icon,styles.icon_cart)} icon={faShoppingCart as IconProp} />
                <NumberTop position={'left'} number={cart.data?cart.data.length:0} />
                <div className={clsx(styles.box_hover)}>
                    <div className={styles.header}>
                        Your cart
                    </div>
                    <div style={{maxHeight:300, overflowY:"auto"}}>
                    {
                        cart.data && cart.data.map((album:any, index:any)=>{
                            return <CartItem key={index} type="in_cart" album={album} />
                        })
                    }
                    </div>
                    <div onClick={()=>{navigate("/cart")}} className={styles.footer}>
                        Click to see all
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Cart)