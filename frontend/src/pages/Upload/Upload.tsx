import {memo, useEffect} from 'react';

import styles from "./Upload.module.css";

function Upload() {
    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={styles.container}>
                
                </div>
        </>
    )
}

export default memo(Upload)