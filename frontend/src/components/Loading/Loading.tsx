import { memo } from 'react';

import styles from './Loading.module.css';

import Spinner from 'react-bootstrap/Spinner';

function Loading({small}:{small?:boolean}) {
    return (
        <>
            <div className={styles.container}>
            {
                small?
                <Spinner size="sm" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            </div>
        </>
    )
}

export default memo(Loading);