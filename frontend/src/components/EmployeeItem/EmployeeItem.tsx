import { memo } from 'react';

import styles from "./EmployeeItem.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar, faMessage, faTrash, faBan, faEye } from '@fortawesome/free-solid-svg-icons'

import clsx from 'clsx'

function EmployeeItem({ handleWarningShow, handleSeeDetailShow, employee, handleWarningBanShow }: { handleWarningBanShow: any, employee: any, handleWarningShow?: any, handleSeeDetailShow?: any }) {
    console.log(employee)
    return (
        <>
            <div className={styles.box}>
                <div className={styles.userInformation}>
                    <div className={styles.userImage}>
                        <img src={employee.avatar} alt=""></img>
                    </div>
                    <div className={styles.userNameAndDate}>
                        <div className={styles.name}>
                            <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> Full Name: {" "}
                            {employee.username}
                        </div>
                        <div className={styles.date}>
                            ID: {employee.user_id}
                        </div>
                        <div className={styles.date}>
                            state: <span className={clsx({
                                [styles.banned]: employee.state === "banned",
                                [styles.notUsed]: employee.state === "notUsed",
                                [styles.notBanned]: employee.state === "new",
                            })}>{employee.state}</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-between">
                    <div className={styles.serviceIcons}>
                        <FontAwesomeIcon className={clsx(styles.icon, styles.icon_chat)} icon={faMessage as IconProp} />
                        <FontAwesomeIcon onClick={()=>{handleWarningBanShow(employee)}} className={clsx(styles.icon, styles.icon_ban)} icon={faBan as IconProp} />
                        <FontAwesomeIcon onClick={()=>{handleWarningShow(employee)}} className={clsx(styles.icon, styles.icon_trash)} icon={faTrash as IconProp} />
                        <FontAwesomeIcon onClick={()=>{handleSeeDetailShow(employee)}} className={clsx(styles.icon, styles.icon_eye)} icon={faEye as IconProp} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default memo(EmployeeItem)
