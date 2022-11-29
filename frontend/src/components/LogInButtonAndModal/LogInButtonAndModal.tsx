
import { memo, useState } from 'react'

import styles from './LogInButtonAndModal.module.css'

import { Button, Modal, Form } from "react-bootstrap"

import { useSelector, useDispatch } from 'react-redux'
import { UserStore } from '../../redux/selectors'
import FlashSlice from '../../redux/slices/FlashSlice'
import { login, getMe } from '../../redux/slices/UserSlice'

import clsx from "clsx"
import Loading from '../Loading/Loading'

function LogInButtonAndModal({ linkStyle, showLogin, handleShowLogin, handleCloseLogin, handleShowRegister }: {
    linkStyle: any, showLogin: any, handleShowLogin: any,
    handleCloseLogin: any, handleShowRegister: any
}) {
    const user = useSelector(UserStore)
    const dispatch = useDispatch<any>()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(login({ email, password }))
            .then((res: any) => {
                if (res.payload.status === "success") {
                    dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "success" }))
                    dispatch(getMe())
                    handleCloseLogin()
                }
                else {
                    dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "danger" }))
                }
            })
    }
    return (
        <>
            <a onClick={handleShowLogin} className={linkStyle}>
                Log in
            </a>

            <Modal show={showLogin} onHide={handleCloseLogin} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.title}>login now</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form.Label>Email:</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" className={clsx(styles.box, "mb-3")} />
                    <Form.Label>Password:</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Your password" className={clsx(styles.box, "mb-3")} />
                    <Form.Label className={styles.link_note}>Forget your password <a className={styles.link} href="#">click here</a></Form.Label>
                    <Form.Label className={styles.link_note}>Don't have an account <a
                        onClick={() => { handleCloseLogin(); handleShowRegister(); }}
                        className={styles.link} href="#">create now</a></Form.Label>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="secondary" className="btn btn_custom position-relative" onClick={(e: any) => { handleSubmit(e); }}>
                        {
                            user.loading &&
                            <Loading small />
                        }
                        Login Now
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(LogInButtonAndModal)