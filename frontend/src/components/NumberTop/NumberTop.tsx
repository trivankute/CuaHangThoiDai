import {memo} from 'react';

import styles from './NumberTop.module.css';

import clsx from 'clsx'

function NumberTop({position, number}:{position:any, number:any}) {
    return (
        <>
        <div className={clsx(styles.box, {
            [styles.left]: position === 'left',
            [styles.right]: position === 'right'
        })}>{number}</div>
        </>
    )
}

export default memo(NumberTop)