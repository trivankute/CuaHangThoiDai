import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Cart.module.css'

import clsx from 'clsx'
import NumberTop from "../NumberTop/NumberTop";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import CartItem from '../CartItem/CartItem'

function Cart() {
    const navigate = useNavigate()
    return (
        <>
            <div id="cart-btn" className={styles.icon_box} style={{ position: 'relative' }}>
                <FontAwesomeIcon className={clsx(styles.icon,styles.icon_cart)} icon={faShoppingCart as IconProp} />
                <NumberTop position={'left'} number={2} />
                <div className={clsx(styles.box_hover)}>
                    <div className={styles.header}>
                        Your cart
                    </div>
                    <div style={{maxHeight:300, overflowY:"auto"}}>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
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