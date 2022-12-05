import {memo, useState,useEffect} from 'react';

import styles from './CartItem.module.css';

import clsx from 'clsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import CartSlice from '../../redux/slices/CartSlice';

function CartItem({type, album}:{type:string, album:any}) {
    // type 1 in_cart, type 2 is in transaction_history, type3 is in sell_mode
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(6.99)
    const dispatch = useDispatch<any>()
    function handleMinusQuanity() {
        // setQuantity(prev => {
        //     prev--;
        //     if (prev < 0)
        //         return 0
        //     else return prev
        // })
        dispatch(CartSlice.actions.handleMinusQuantity({id: album.id}))
    }
    function handlePlusQuanity() {
        // setQuantity(prev => {
        //     prev++;
        //     if (prev > 99)
        //         return 99;
        //     else return prev
        // })
        dispatch(CartSlice.actions.handleAddToCart({ id: album.id, quantity: 1, price: album.price, title: album.title, image: album.avatar }))
    }

    function handleRemoveCartItem() {
        dispatch(CartSlice.actions.handleRemoveCartItem({id: album.id}))
    }


    useEffect(() => {
        setPrice(quantity * 6.99)
    }, [quantity])


    return (
        <>
            <div className={styles.box}>
                <img src={album.image||album.album.avatar} alt=""></img>
                <div className={styles.content}>
                    <h3>{album.title||album.album.title}</h3>
                    <span>{(parseInt(album.price)*album.quantity)||(parseInt(album.album.price)*album.quanity)}{" KVND"}</span>
                    {
                        type=='transaction_history'?
                        <span>Quantity: {album.quanity}</span>
                        :
                        <div className={styles.quantity}>
                            <div onClick={handleMinusQuanity} className={clsx("btn btn_custom", styles.quantity_box)}>-</div>
                            <div className={styles.quantity_box}>{album.quantity}</div>
                            <div onClick={handlePlusQuanity} className={clsx("btn btn_custom", styles.quantity_box)}>+</div>
                        </div>
                    }
                </div>
                {
                    type=="in_cart"&&
                    <FontAwesomeIcon onClick={handleRemoveCartItem} className={clsx(styles.icon, "ms-3")} icon={faTrash as IconProp} />
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