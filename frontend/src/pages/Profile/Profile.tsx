import { memo, useState, useEffect } from 'react'

import styles from './Profile.module.css'

import clsx from 'clsx'

import { Form } from 'react-bootstrap'

import Header from "../../components/User/Header/Header"
import { useDispatch, useSelector } from 'react-redux'
import { UserStore } from '../../redux/selectors'
import { getMe, updateAvatar, updateInformation } from '../../redux/slices/UserSlice'
import FlashSlice from '../../redux/slices/FlashSlice'
import LoadingLogic from '../../middlewares/LoadingLogic/LoadingLogic'

function Profile() {
    const user = useSelector(UserStore)
    const dispatch = useDispatch<any>()
    const [changeMode, setChangeMode] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("Male")
    const [birthday, setBirthday] = useState("")
    const [address, setAddress] = useState("")
    const [file, setFile] = useState({ files: "", img: `https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c` })
    const [changeAvatarMode, setChangeAvatarMode] = useState(false)
    const [dataBeforeChangeMode, setDataBeforeChangeMode] = useState<any>({})
    const [res, setRes] = useState(() => {
        if (window.innerWidth < 450) {
            return (true)
        }
        else {
            return (false)
        }
    })
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
        function handleResize() {
            if (window.innerWidth < 450) {
                setRes(true)
            }
            else {
                setRes(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)

    }, [])

    useEffect(() => {
        if (user.data) {
            setUsername(user.data.account.username)
            setEmail(user.data.account.email)
            setPhone(user.data.phone)
            setGender(user.data.gender || "Male")
            setBirthday(user.data.Bdate)
            setAddress(user.data.address)
            setFile({ files: "", img: `${user.data.account.avatar}` })
        }
    }, [user.loading])

    function handleUpdateAvatar(e: any) {
        const data = new FormData();
        data.append("avatar", file.files[0]);
        dispatch(updateAvatar(data))
            .then((res: any) => {
                if (res.payload.status === "success") {
                    dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "success" }))
                    dispatch(getMe())
                }
                else {
                    dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "danger" }))
                }

            })
    }

    function handleChangeMode () {
        setDataBeforeChangeMode({
            username,
            gender,
            birthday,
            address,
            phone,
        })
        setChangeMode(true)
    }

    function handleCancelChangeMode () {
        setChangeMode(false)
        setUsername(dataBeforeChangeMode.username)
        setGender(dataBeforeChangeMode.gender)
        setBirthday(dataBeforeChangeMode.birthday)
        setAddress(dataBeforeChangeMode.address)
        setPhone(dataBeforeChangeMode.phone)
    }

    function handleSave() {
        // if not empty
        if (username && gender && phone && address && birthday) {
            dispatch(updateInformation(
                {
                    "gender": gender,
                    "phone": phone,
                    "address": address,
                    "bdate": birthday,
                    "username": username
                  }
            ))
                .then((res: any) => {
                    if (res.payload.status === "success") {
                        dispatch(FlashSlice.actions.handleOpen({ message: "Updated successfully", type: "success" }))
                        dispatch(getMe())
                    }
                    else {
                        dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "danger" }))
                    }
                })
        }
        else {
            dispatch(FlashSlice.actions.handleOpen({ message: "Please fill all fields", type: "danger" }))
        }
    }

    return (
        <>
            <div className={clsx(styles.container, "position-relative")}>
                <Header title="My Profile" content="Manage and protect your account" />
                <div className={styles.body}>
                    <div className={styles.box1}>
                        <div className={styles.fullname}>
                            <div className={clsx(styles.firstName, styles.upper_none)}>
                                <label htmlFor="">Full name: </label>
                                {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setUsername(e.target.value) }} value={username}></input> : <>{username}</>}
                            </div>
                        </div>
                        <div className={clsx(styles.email, styles.upper_none)}>
                            <label htmlFor="">Email: </label>
                            <>{email}</>
                        </div>
                        <div className={clsx(styles.phone, styles.upper_none)}>
                            <label htmlFor="">Phone: </label>
                            {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setPhone(e.target.value) }} value={phone}></input> : <>{phone}</>}
                        </div>
                        <div className={styles.gender}>
                            <label htmlFor="">Gender: </label>
                            {changeMode ?
                                <select onChange={(e) => {
                                    setGender(e.target.value)
                                }} value={gender}>
                                    <option selected={gender === "Male" ? true : false} value="Male">Male</option>
                                    <option selected={gender === "Female" ? true : false} value="Female">Female</option>
                                    <option selected={gender === "Other" ? true : false} value="Other">Other</option>
                                </select>
                                :
                                <>
                                    {gender}
                                </>
                            }
                        </div>
                        <div className={clsx(styles.birthday, styles.upper_none)}>
                            <label htmlFor="">Birthday: </label>
                            {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setBirthday(e.target.value) }} value={birthday}></input> : <>{birthday}</>}
                        </div>
                        <div className={clsx(styles.birthday, styles.upper_none)}>
                            <label htmlFor="">Address: </label>
                            {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setAddress(e.target.value) }} value={address}></input> : <>{address}</>}
                        </div>
                        <div className={styles.role} style={{ textTransform: "capitalize" }}>
                            <label htmlFor="">Role: </label> {user.data ? user.data.account.role : ""}
                        </div>

                    </div>

                    {
                        res &&
                        <>
                            <div className={clsx(styles.footer, "mb-3")}>
                                {changeMode ?
                                    <>
                                        <div onClick={() => { handleCancelChangeMode() }} className="btn btn_custom me-3">
                                            Back
                                        </div>
                                        <div onClick={() => { setChangeMode(false); handleSave() }} className="btn btn_custom">
                                            Save
                                        </div>
                                    </>
                                    :
                                    <div onClick={() => { handleChangeMode() }} className="btn btn_custom">
                                        Change
                                    </div>
                                }
                            </div>
                        </>
                    }

                    <div className={styles.box2}>
                        <div className={styles.img}>
                            <img src={file.img} alt="" />
                        </div>
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
                        {
                            !changeAvatarMode &&
                            <div onClick={() => { setChangeAvatarMode(true) }} className="btn btn_custom">
                                New avatar
                            </div>
                        }
                        {changeAvatarMode && file.img &&
                            <div className="mt-3 d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-column me-3">
                                    <div className="d-flex w-100 mb-3 me-3" style={{ height: 50, }}>
                                        <img src={file.img} style={{ height: 50, width: 50 }} />
                                    </div>
                                    New avatar
                                </div>
                                <div className="d-flex flex-column">
                                    <div onClick={handleUpdateAvatar} className="btn btn_custom d-flex justify-content-center align-items-center position-relative" style={{ height: 50 }}>
                                        <LoadingLogic small>
                                            Set
                                        </LoadingLogic>
                                    </div>
                                    <div onClick={handleUpdateAvatar} className="btn btn_custom d-flex justify-content-center align-items-center position-relative" style={{ height: 50 }}>
                                        <LoadingLogic small>
                                            Back
                                        </LoadingLogic>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </div>
                {
                    !res &&
                    <>
                        <div className={styles.footer}>
                            {changeMode ?
                                <>
                                    <div onClick={() => {  handleCancelChangeMode() }} className="btn btn_custom me-3">
                                        Back
                                    </div>
                                    <div onClick={() => { setChangeMode(false); handleSave(); }} className="btn btn_custom">
                                        Save
                                    </div>
                                </>
                                :
                                <div onClick={() => { handleChangeMode() }} className="btn btn_custom">
                                    Change
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default memo(Profile)