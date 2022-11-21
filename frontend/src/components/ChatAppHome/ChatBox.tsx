import {memo} from "react"

import styles from "./ChatBox.module.css"

import clsx from "clsx"

function ChatBox({ofUser, chatContent}:{ofUser:boolean, chatContent?:string}) {
    return (
        <>
        <div className={clsx(styles.container,{
                [styles.ofUser]:ofUser,
                [styles.notOfUser]:!ofUser
        })}>
            <div className={clsx(styles.box)}>
                <p>{chatContent}</p>
            </div>
        </div>
        </>
    )
}

export default memo(ChatBox)