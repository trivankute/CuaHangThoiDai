import {memo} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {faCompactDisc} from '@fortawesome/free-solid-svg-icons'
import styles from "./Brand.module.css"
import "../../globalCss.css"
import clsx from "clsx"
function Brand({brand_style, logo_style, logo_content}: {brand_style?: any, logo_style?: any, logo_content?:any}) {
    return (
        <div className={clsx(styles.brand, brand_style)}>
        <FontAwesomeIcon className={clsx(styles.logo, logo_style)} icon={faCompactDisc as IconProp}/>
        <h1 className={clsx(styles.logo_content, logo_content)}>
        Timesrecord
        </h1>
        </div>
    )
}

export default memo(Brand)