import { memo } from 'react';

import styles from './Loading.module.css';

import Spinner from 'react-bootstrap/Spinner';

function Loading(
) {
    return (
        <>
            <div className={styles.container}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>
        </>
    )
}

export default memo(Loading);