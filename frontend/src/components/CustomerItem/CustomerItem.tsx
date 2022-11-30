import { memo } from 'react'

import styles from "./CustomerItem.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar, faMessage, faTrash, faBan, faEye } from '@fortawesome/free-solid-svg-icons'

function CustomerItem({handleWarningShow, handleSeeDetailShow}:{handleWarningShow?:any, handleSeeDetailShow?:any}) {
    return (
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
                <div className={styles.serviceIcons}>
                    <FontAwesomeIcon className={styles.icon} icon={faMessage as IconProp} />
                    <FontAwesomeIcon className={styles.icon} icon={faBan as IconProp} />
                    <FontAwesomeIcon onClick={handleWarningShow} className={styles.icon} icon={faTrash as IconProp} />
                    <FontAwesomeIcon onClick={handleSeeDetailShow}className={styles.icon} icon={faEye as IconProp} />
                </div>

            </div>
        </>
    )
}

export default memo(CustomerItem)
