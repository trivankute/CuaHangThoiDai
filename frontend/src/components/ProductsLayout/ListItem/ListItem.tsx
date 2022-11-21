import {memo} from "react"

import styles from "./ListItem.module.css"

import clsx from "clsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function ListItem({title, icon, button_style}:{title:string, icon:any, button_style?:any}){
    return(
        <>
        <div className={clsx(styles.box, "btn", "btn_custom", button_style)}>
            <div>{title}</div>
            <FontAwesomeIcon className={styles.icon} icon={icon as IconProp} />
        </div>
        </>
    )
}

export default memo(ListItem)