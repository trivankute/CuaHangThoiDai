import { memo, useState } from 'react'
import styles from './ChatAppHome.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faComments, faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import clsx from "clsx"

function ChatAppHome() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)
    return (
        <>
        {open ? <div className={styles.box_open}>
            <div className={styles.box_open_header}>
                <div >
                    <h4 className={styles.box_open_title}>Chat</h4>
                    <span className={styles.box_open_number}>2</span>
                </div>
                <FontAwesomeIcon onClick={handleClose} className={styles.box_open_icon} icon={faArrowDown as IconProp} />
            </div>
            <div className={styles.box_open_body}></div>
            <div className={styles.box_open_footer}>
                <input type="text" className={styles.box_open_chatbox} placeholder="send text"/>
                <FontAwesomeIcon className={styles.box_open_icon} icon={faArrowRight as IconProp} />
            </div>
        </div>
         : 
            <div onClick={handleOpen} className={styles.box}>
            <span className={styles.number}>2</span>
            <FontAwesomeIcon  className={clsx(styles.icon,"me-3")} icon={faComments as IconProp} />
            <h4 className={styles.title}>Chat</h4>
            </div>
        }
        </>
    )
}

export default memo(ChatAppHome)
