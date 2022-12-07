import { memo } from 'react'

import styles from "./CustomerItem.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faMessage, faTrash, faBan, faEye } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { UserStore } from '../../redux/selectors';

function CustomerItem({ handleWarningShow, handleSeeDetailShow, customer }: { customer: any, handleWarningShow?: any, handleSeeDetailShow?: any }) {
    const user = useSelector(UserStore)
    return (
        <>
            <div className={styles.box}>
                <div className={styles.userInformation}>
                    <div className={styles.userImage}>
                        <img src={customer.avatar} alt=""></img>
                    </div>
                    <div className={styles.userNameAndDate}>
                        <div className={styles.name}>
                            <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> Full Name:{" "}
                            {customer.username}
                        </div>
                        <div className={styles.date}>
                            ID: {customer.user_id}
                        </div>
                    </div>
                </div>
                <div className={styles.serviceIcons}>
                    <FontAwesomeIcon className={clsx(styles.icon, styles.icon_chat)} icon={faMessage as IconProp} />
                    {
                        user.data && user.data.account.role === "admin" &&
                        <>
                            <FontAwesomeIcon className={clsx(styles.icon, styles.icon_ban)} icon={faBan as IconProp} />
                            <FontAwesomeIcon onClick={handleWarningShow} className={clsx(styles.icon, styles.icon_trash)} icon={faTrash as IconProp} />
                        </>
                    }
                    <FontAwesomeIcon onClick={() => { handleSeeDetailShow(customer) }} className={clsx(styles.icon, styles.icon_eye)} icon={faEye as IconProp} />
                </div>

            </div>
        </>
    )
}

export default memo(CustomerItem)
