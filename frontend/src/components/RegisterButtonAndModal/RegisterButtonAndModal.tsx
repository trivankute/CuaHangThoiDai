
import { memo, useState } from 'react'

import styles from './RegisterButtonAndModal.module.css'

import { Button, Modal, Form } from "react-bootstrap"

import {useDispatch, useSelector} from 'react-redux'
import {UserStore} from '../../redux/selectors'
import {register, registerEmployee} from '../../redux/slices/UserSlice'
import FlashSlice from '../../redux/slices/FlashSlice'

import clsx from "clsx"
import Loading from '../Loading/Loading'

function RegisterButtonAndModal({ type, linkStyle, showRegister, handleShowRegister, handleCloseRegister, handleShowLogin }
    : { type:any, linkStyle: any, showRegister: any, handleShowRegister: any, handleCloseRegister: any, handleShowLogin?: any }) {
    const dispatch = useDispatch<any>()
    const user = useSelector(UserStore)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState({ files: [], img: "" });
    const handleRegisterCustomer = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const data = new FormData();
        data.append("email", email);
        data.append("password", password);
        data.append("confirmPassword", confirmPassword);
        data.append("username", username);
        data.append("avatar", avatar.files[0]);
        data.append("role", "customer");
        dispatch(register(data))
            .then((res: any) => {
                if (res.payload.status === "success") {
                    handleCloseRegister();
                    handleShowLogin();
                    dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "success" }))
                }
                else {
                    dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "danger" }))
                }
            })
        // console.log(result);
        //revoke image url
        URL.revokeObjectURL(avatar.img);
        //reset state
    }
    const handleRegisterEmployee = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const data = new FormData();
        data.append("email", email);
        data.append("password", "123456");
        data.append("confirmPassword", "123456");
        data.append("username", "New Employee");
        data.append("avatar", avatar.files[0]);
        data.append("role", "employee");
        dispatch(registerEmployee(data))
            .then((res: any) => {
                if (res.payload.status === "success") {
                    handleCloseRegister();
                    handleShowLogin();
                    dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "success" }))
                }
                else {
                    dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "danger" }))
                }
            })
        // console.log(result);
        //revoke image url
        URL.revokeObjectURL(avatar.img);
        //reset state
    }
    return (
        <>
            <a onClick={handleShowRegister} className={linkStyle}>
                Register
            </a>

            <Modal show={showRegister} onHide={handleCloseRegister} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.title}>register now</Modal.Title>
                </Modal.Header>
                <Form>
                <Modal.Body >
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Your email" className={clsx(styles.box, "mb-3")} onChange={(e) => setEmail(e.target.value)} />
                    {
                        type === "customer" &&
                        <>
                        <Form.Label>Fullname:</Form.Label>
                        <Form.Control type="text" placeholder="Your Full name" className={clsx(styles.box, "mb-3")} onChange={(e) => setUsername(e.target.value)} />
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Your password" className={clsx(styles.box, "mb-3")} onChange={(e) => setPassword(e.target.value)} />
                        <Form.Label>Confirm password:</Form.Label>
                        <Form.Control type="password" placeholder="Your confirm password" className={clsx(styles.box, "mb-3")} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </>
                    }
                    {
                        type === "employee" &&
                        <>
                        <Form.Label>Password is default 123456</Form.Label><br></br>
                        </>
                    }
                    <Form.Label>Avatar :</Form.Label>
                    <Form.Control
                        type="file"
                        required
                        name="file"
                        // @ts-ignore
                        onChange={(e) => { setAvatar(() => ({ files: e.target.files, img: URL.createObjectURL(e.target.files[0]) })) }}
                    />
                    {avatar.img &&
                        <div className="d-flex w-100 mb-3 mt-3" style={{ height: 100 }}>
                            <img src={avatar.img} />
                        </div>}
                    <Form.Label className={clsx(styles.link_note, 'mt-3')}>Have an account? <a
                        onClick={() => { handleCloseRegister(); handleShowLogin(); }}
                        className={styles.link} href="#">Log In</a>
                    </Form.Label>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button type="submit" variant="secondary" className="btn btn_custom position-relative" onClick={(e) => { 
                        if(type==="customer")
                        handleRegisterCustomer(e) 
                        else if(type==="employee")
                        handleRegisterEmployee(e)
                        }}>
                        {
                            user.loading && 
                            <Loading small/>
                        }
                        Sign up
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default memo(RegisterButtonAndModal)