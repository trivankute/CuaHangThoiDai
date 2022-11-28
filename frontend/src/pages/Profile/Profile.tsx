import { memo, useState, useEffect } from 'react'

import styles from './Profile.module.css'

import clsx from 'clsx'

import {Form} from 'react-bootstrap'

import Header from "../../components/User/Header/Header"

function Profile() {
    const [changeMode, setChangeMode] = useState(false)
    const [fname, setFname] = useState("Van")
    const [lname, setLname] = useState("Trinh Tri")
    const [email, setEmail] = useState("blabla@gmail.com")
    const [phone, setPhone] = useState("0123456789")
    const [gender, setGender] = useState("female")
    const [file, setFile] = useState({file:"", img:"https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c"})

    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className={styles.container}>
                <Header title="My Profile" content="Manage and protect your account"/>
                <div className={styles.body}>
                    <div className={styles.box1}>
                        <div className={styles.fullname}>
                            <div className={clsx(styles.firstName, styles.upper_none)}>
                                <label htmlFor="">First name: </label>
                                {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setFname(e.target.value) }} value={fname}></input> : <>{fname}</>}
                            </div>
                            <div className={clsx(styles.lastName, styles.upper_none)}>
                                <label htmlFor="">Last name: </label>
                                {changeMode ? <input type="text" onChange={(e: any) => { setLname(e.target.value) }} value={lname}></input> : <>{lname} </>}
                            </div>
                        </div>
                        <div className={clsx(styles.email, styles.upper_none)}>
                            <label htmlFor="">Email: </label>
                            {changeMode ? <input type="text" onChange={(e: any) => { setEmail(e.target.value) }} value={email}></input> : <>{email}</>}
                        </div>
                        <div className={clsx(styles.phone, styles.upper_none)}>
                            <label htmlFor="">Phone: </label>
                            {changeMode ? <input type="text" onChange={(e: any) => { setPhone(e.target.value) }} value={phone}></input> : <>{phone}</>}
                        </div>
                        <div className={styles.gender}>
                            <label htmlFor="">Gender: </label>
                            {changeMode ?
                                <select onChange={(e) => {
                                    // lower case first
                                    let value = e.target.value.toLowerCase()
                                    setGender(value)
                                }} value={gender}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                :
                                <>
                                    {gender}
                                </>
                            }
                        </div>
                        <div className={styles.role}>
                            <label htmlFor="">Role: </label> Customer
                        </div>

                    </div>
                    <div className={styles.box2}>
                        <div className={styles.img}>
                            <img src={file.img} alt="" />
                        </div>
                        {/* <input type="file" id="" name="" className={clsx("btn btn_custom", styles.title)}>
                            Select image
                        </input> */}
                        {/* input file */}
                        <Form.Group className={clsx("position-relative mb-3 mt-3")}>
                            <Form.Control
                                type="file"
                                required
                                name="file"
                                // @ts-ignore
                                onChange={(e) => { setFile(() => ({ files: e.target.files, img: URL.createObjectURL(e.target.files[0]) })) }}
                            />
                        </Form.Group>
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
                    {changeMode ?
                        <div onClick={() => { setChangeMode(false) }} className="btn btn_custom">
                            Save
                        </div>
                        :
                        <div onClick={() => { setChangeMode(true) }} className="btn btn_custom">
                            Change
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default memo(Profile)