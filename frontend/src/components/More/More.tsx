import {memo} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {faGreaterThan} from '@fortawesome/free-solid-svg-icons'
import "../../globalCss.css"
import styles from "./More.module.css"

function More() {
    return (
        <span className={styles.box}>
            Show All <FontAwesomeIcon className={styles.icon} icon={faGreaterThan as IconProp}/>
        </span>
    )
}

export default memo(More)