import {memo} from 'react'

import styles from './Profile.module.css'

import clsx from 'clsx'

function Profile() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>My Profile</div>
                    <span>Manage and protect your account</span>
                </div>
                <div className={styles.body}>
                    <div className={styles.box1}>
                        <div className={styles.fullname}>
                            <div className={styles.firstName}>
                            <label htmlFor="">First name: </label> Van
                            </div>
                            <div className={styles.lastName}>
                            <label htmlFor="">Last name: </label> Trinh Tri
                            </div>
                        </div>
                        <div className={styles.emal}>
                        <label htmlFor="">Email: </label>blabla@gmail.com
                        </div>
                        <div className={styles.phone}>
                        <label htmlFor="">Phone: </label> 0123456789
                        </div>
                        <div className={styles.gender}>
                        <label htmlFor="">Gender: </label>
                            <select>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className={styles.role}>
                        <label htmlFor="">Role: </label> Customer
                        </div>

                    </div>
                    <div className={styles.box2}>
                        <div className={styles.img}>
                            <img src="https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c" alt="" />
                        </div>
                        <div className={clsx("btn btn_custom", styles.title)}>
                            Select image
                        </div>
                        <div className={styles.notes}>
                            <div className={styles.note}>
                            File size: maximum 1 MB
                            </div>
                            <div className={styles.note}>
                            File extension: .JPEG, .PNG
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className="btn btn_custom">
                        Change
                    </div>
                    {/* <div className="btn btn_custom">
                        Save
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default memo(Profile)