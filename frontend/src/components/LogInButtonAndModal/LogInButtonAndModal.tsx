
import { memo, useState } from 'react'

import styles from './LogInButtonAndModal.module.css'

import { Button, Modal, Form } from "react-bootstrap"

import clsx from "clsx"
import { login } from '../../utils/account.utils'

function LogInButtonAndModal({ linkStyle, showLogin, handleShowLogin, handleCloseLogin, handleShowRegister }: {
    linkStyle: any, showLogin: any, handleShowLogin: any,
    handleCloseLogin: any, handleShowRegister: any
}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        event.stopPropagation();
        const result = await login({ email, password });
        console.log(result);
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
                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" className={clsx(styles.box, "mb-3")} />
                    <Form.Label>Password:</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Your password" className={clsx(styles.box, "mb-3")} />
                    <Form.Label className={styles.link_note}>Forget your password <a className={styles.link} href="#">click here</a></Form.Label>
                    <Form.Label className={styles.link_note}>Don't have an account <a
                        onClick={() => { handleCloseLogin(); handleShowRegister(); }}
                        className={styles.link} href="#">create now</a></Form.Label>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="secondary" className="btn btn_custom" onClick={(e:any) => { handleCloseLogin(); handleSubmit(e); }}>
                        Login Now
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(LogInButtonAndModal)