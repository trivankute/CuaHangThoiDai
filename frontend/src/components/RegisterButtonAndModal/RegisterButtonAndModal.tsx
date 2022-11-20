
import { memo, useState } from 'react'

import styles from './RegisterButtonAndModal.module.css'

import { Button, Modal, Form } from "react-bootstrap"

import clsx from "clsx"

function RegisterButtonAndModal({ linkStyle, showRegister, handleShowRegister, handleCloseRegister, handleShowLogin }
    : { linkStyle: any, showRegister: any, handleShowRegister: any, handleCloseRegister: any, handleShowLogin:any }) {
    return (
        <>
            <a onClick={handleShowRegister} className={linkStyle}>
                Register
            </a>

            <Modal show={showRegister} onHide={handleCloseRegister} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.title}>register now</Modal.Title>
                </Modal.Header>
                <Modal.Body >

                <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="your email" className={clsx(styles.box, "mb-3")} />
                <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="your username" className={clsx(styles.box, "mb-3")} />
                <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="your password" className={clsx(styles.box, "mb-3")} />
                <Form.Label>Confirm password:</Form.Label>
                    <Form.Control type="password" placeholder="your confirm password" className={clsx(styles.box, "mb-3")} />
                    <Form.Label className={styles.link_note}>Have an account? <a
                    onClick={()=>{handleCloseRegister(); handleShowLogin();}}
                    className={styles.link} href="#">Log In</a></Form.Label>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="secondary" className="btn btn_custom" onClick={handleCloseRegister}>
                        Sign up
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(RegisterButtonAndModal)