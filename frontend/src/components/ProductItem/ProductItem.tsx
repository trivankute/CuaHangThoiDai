import { memo, useState } from 'react';

import styles from './ProductItem.module.css';

import image from './cd.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';

function ProductItem({handleWarningShow, handleEditShow, album}:{handleWarningShow?:any, handleEditShow?:any, album:any}) {
    return (
        <>
            <div className={styles.box}>
                <img src={album.avatar} alt=""></img>
                <div className={styles.content}>
                    <h3>{album.title}</h3>
                    <span>{album.price} KVND</span>
                    <span>Quantity: {album.quanity}</span>
                </div>
                <FontAwesomeIcon onClick={()=>{handleWarningShow(()=>{return album});}}className={clsx(styles.icon, styles.icon_trash, "ms-3")} icon={faTrash as IconProp} />
                <FontAwesomeIcon onClick={()=>{handleEditShow(()=>{return album})}} className={clsx(styles.icon, styles.icon_edit, "ms-3")} icon={faPenSquare as IconProp} />
            </div>
        </>
    )
}

export default memo(ProductItem)