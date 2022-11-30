import { memo, useState } from 'react';

import styles from './ProductItem.module.css';

import image from './cd.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';

function ProductItem({handleWarningShow}:{handleWarningShow?:any}) {
    const [price, setPrice] = useState("2")
    const [quantity, setQuantity] = useState("2")
    const [name, setName] = useState("1999")
    const [description, setDescription] = useState("")
    const [editMode, setEditMode] = useState(false)
    return (
        <>
            <div className={styles.box}>
                <img src={image} alt=""></img>
                <div className={styles.content}>
                    <h3>{name}</h3>
                    <span>${price}</span>
                    <span>Quantity: {quantity}</span>
                </div>
                <FontAwesomeIcon onClick={()=>{handleWarningShow();}}className={clsx(styles.icon, "ms-3")} icon={faTrash as IconProp} />
                <FontAwesomeIcon onClick={()=>{setEditMode(true)}} className={clsx(styles.icon, "ms-3")} icon={faPenSquare as IconProp} />
            </div>
        </>
    )
}

export default memo(ProductItem)