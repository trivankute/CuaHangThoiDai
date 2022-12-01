import {memo, useEffect, useState} from 'react';

import styles from "./Password.module.css"; 

import Header from "../../components/User/Header/Header"
import { useDispatch } from 'react-redux';
import { changePassword } from '../../redux/slices/UserSlice';
import FlashSlice from '../../redux/slices/FlashSlice';
import { useNavigate } from 'react-router-dom';
import LoadingLogic from '../../middlewares/LoadingLogic/LoadingLogic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'

function Password() {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [stringMode, setStringMode] = useState<boolean>(false)

    function handleSubmit(){
        dispatch(changePassword({
            oldPassword,
            newPassword,
            confirmNewPassword
        }))
        .then((res:any)=>{
            if(res.payload.status === "success"){
                dispatch(FlashSlice.actions.handleOpen({message:res.payload.msg+" ,please sign in again", type:"success"}))
                navigate('/')
            }
            else{
                dispatch(FlashSlice.actions.handleOpen({message:res.payload.msg, type:"danger"}))
            }
        })
    }
    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={styles.container}>
                <Header title="Set Password" content="For your account's security, do not share your password with anyone else"/>
                <div className={styles.box}>
                <input type={stringMode?"text":"password"} value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} className={styles.password} placeholder="Your current password">

                </input>
                <input type={stringMode?"text":"password"} value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} className={styles.password} placeholder="New password">

                </input>
                <input type={stringMode?"text":"password"} value={confirmNewPassword} onChange={(e)=>{setConfirmNewPassword(e.target.value)}} className={styles.password} placeholder="Confirm new password">

                </input>
                {
                    stringMode?
                    <FontAwesomeIcon onClick={()=>{setStringMode(!stringMode)}} className={styles.icon_eye} icon={faEye as IconProp} />
                    :
                    <FontAwesomeIcon onClick={()=>{setStringMode(!stringMode)}} className={styles.icon_eye_slash} icon={faEyeSlash as IconProp} />
                }
                </div>
                <div onClick={handleSubmit} className="btn btn_custom">
                    <LoadingLogic small>
                    submit
                    </LoadingLogic>
                </div>
            </div>
        </>
    )
}

export default memo(Password)