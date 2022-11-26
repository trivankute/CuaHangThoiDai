import {memo} from 'react';

import styles from './Profile.module.css';

import clsx from 'clsx';

import {useNavigate} from 'react-router-dom';

function Profile() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    Profile
                </div>
                <div className={styles.content}>
                    <div className={styles.content_title}>
                        Profile
                    </div>
                    <div className={styles.content_description}>
                        Profile
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Profile);