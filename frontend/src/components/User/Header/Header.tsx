import { memo } from 'react';

import styles from "./Header.module.css"

function Header({title, content}:{title:string, content:string}) {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <span>{content}</span>
            </div>
        </>
    )
}

export default memo(Header)