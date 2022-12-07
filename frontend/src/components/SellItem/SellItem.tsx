import { memo, useState, useEffect } from 'react';

import styles from './SellItem.module.css';

import clsx from 'clsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { SellStore } from '../../redux/selectors';
import SellSlice from '../../redux/slices/SellSlice';

function SellItem({ type, album }: { type: string, album: any }) {
    // type 1 in_cart, type 2 transaction_history
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(album.price)
    const dispatch = useDispatch<any>()
    const sell = useSelector(SellStore)

    // function handleRemoveSellItem() {
    //     dispatch(CartSlice.actions.handleRemoveSellItem({ id: album.id }))
    // }
    // console.log(album.price)
    function handleAdd() {
        dispatch(SellSlice.actions.handleAddToSellCart({ id: album.album_id, title: album.title, avatar:album.avatar, quantity: quantity, price: price }))
        dispatch(SellSlice.actions.handleLoadSellCart(""))
        // total price
        dispatch(SellSlice.actions.handleTotalPrice(""))
    }

    function handleRemove() {
        dispatch(SellSlice.actions.handleRemoveSellItem({ id: album.id }))
        dispatch(SellSlice.actions.handleLoadSellCart(""))
        // total price
        dispatch(SellSlice.actions.handleTotalPrice(""))
    }

    useEffect(() => {
        setPrice(quantity * album.price)
    }, [quantity])

    return (
        <>
            <div className={styles.box}>
                <img src={album.avatar} alt=""></img>
                <div className={styles.content}>
                    <h3>{album.title}</h3>
                    {
                        type === "in_cart" &&
                        <span>{price}{" KVND"}</span>
                    }
                    {
                        type === "transaction_history" &&
                        <span>{album.price*album.quantity}{" KVND"}</span>
                    }
                    {
                        type === "in_cart" &&
                        <div className={styles.quantity}>Quantity:{" "}
                            <input type="number" style={{ marginLeft: 5, width: 100 }} value={quantity} onChange={(e: any) => {
                                if (parseInt(e.target.value) > 0)
                                    setQuantity(parseInt(e.target.value))
                                else
                                    setQuantity(-parseInt(e.target.value))
                            }} className={styles.quantity_box}></input>
                        </div>
                    }
                    {
                        type === "transaction_history" &&
                        <div className={styles.quantity}>Quantity:{" "}
                            {album.quantity}
                        </div>
                    }
                </div>
                {
                    type === "in_cart" &&
                    <>
                        <FontAwesomeIcon onClick={handleAdd} className={clsx(styles.icon, "ms-3")} icon={faPlus as IconProp} />
                    </>
                }
                {
                    type === "transaction_history" &&
                    <>
                        <FontAwesomeIcon onClick={handleRemove} className={clsx(styles.icon, "ms-3")} icon={faTrash as IconProp} />
                    </>
                }
            </div>
        </>
    )
}

export default memo(SellItem)