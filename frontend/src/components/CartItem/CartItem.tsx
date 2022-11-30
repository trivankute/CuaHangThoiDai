import {memo, useState,useEffect} from 'react';

import styles from './CartItem.module.css';

import clsx from 'clsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import image from './cd.png'

function CartItem({type}:{type:string}) {
    // type 1 in_cart, type 2 is in transaction_history, type3 is in sell_mode
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(6.99)
    function handleMinusQuanity() {
        setQuantity(prev => {
            prev--;
            if (prev < 0)
                return 0
            else return prev
        })

    }
    function handlePlusQuanity() {
        setQuantity(prev => {
            prev++;
            if (prev > 99)
                return 99;
            else return prev
        })
    }
    useEffect(() => {
        setPrice(quantity * 6.99)
    }, [quantity])
    

    return (
        <>
            <div className={styles.box}>
                <img src={image} alt=""></img>
                <div className={styles.content}>
                    <h3>1989</h3>
                    <span>${price}</span>
                    {
                        type=='transaction_history'?
                        <span>Quantity: 2</span>
                        :
                        <div className={styles.quantity}>
                            <div onClick={handleMinusQuanity} className={clsx("btn btn_custom", styles.quantity_box)}>-</div>
                            <div className={styles.quantity_box}>{quantity}</div>
                            <div onClick={handlePlusQuanity} className={clsx("btn btn_custom", styles.quantity_box)}>+</div>
                        </div>
                    }
                </div>
                {
                    type=="in_cart"&&
                    <FontAwesomeIcon className={clsx(styles.icon, "ms-3")} icon={faTrash as IconProp} />
                }
                {
                    type=='transaction_history' && <></>
                }
                {
                    type=='sell_mode' && <>
                    <FontAwesomeIcon className={clsx(styles.icon, "ms-3")} icon={faPlus as IconProp} />
                    </>
                }
            </div>
        </>
    )
}

export default memo (CartItem)