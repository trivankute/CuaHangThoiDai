import {memo} from 'react';

import styles from "./EmployeeItem.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar, faMessage, faTrash, faBan, faEye } from '@fortawesome/free-solid-svg-icons'

import clsx from 'clsx'

function EmployeeItem({handleWarningShow}:{handleWarningShow?:any}) {
    return(
        <>
        <div className={styles.box}>
            <div className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt=""></img>
                </div>
                <div className={styles.userNameAndDate}>
                    <div className={styles.name}>
                        <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> username:
                        Trivan
                    </div>
                    <div className={styles.date}>
                        <FontAwesomeIcon className={styles.icon} icon={faCalendar as IconProp} /> Created: 1st may, 2021
                        2021-08-01
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-between">
            <div className={styles.serviceIcons}>
                <FontAwesomeIcon className={clsx(styles.icon, styles.icon_chat)} icon={faMessage as IconProp} />
                <FontAwesomeIcon className={clsx(styles.icon, styles.icon_ban)} icon={faBan as IconProp} />
                <FontAwesomeIcon onClick={handleWarningShow} className={clsx(styles.icon, styles.icon_trash)} icon={faTrash as IconProp} />
                    <FontAwesomeIcon className={clsx(styles.icon, styles.icon_eye)} icon={faEye as IconProp} />
            </div>
            <div className={clsx(styles.status, styles.notUsed)}>
                In used
            </div>
            </div>

        </div>
        </>
    )
}

export default memo(EmployeeItem)