import {memo} from 'react';

import styles from './Configweb.module.css';

function Configweb() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    Configweb
                </div>
            </div>
        </>
    )
}

export default memo(Configweb)