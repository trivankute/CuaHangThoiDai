
import { memo } from 'react'

import styles from './LogInButtonAndModal.module.css'

import { Button, Modal, Form } from "react-bootstrap"

import clsx from "clsx"

function LogInButtonAndModal({ linkStyle, showLogin, handleShowLogin, handleCloseLogin, handleShowRegister }: { 
    linkStyle: any, showLogin:any, handleShowLogin:any, 
    handleCloseLogin:any, handleShowRegister:any}) {
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
                    <Form.Control type="email" placeholder="your email" className={clsx(styles.box, "mb-3")} />
                <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="your password" className={clsx(styles.box, "mb-3")} />
                    <Form.Label className={styles.link_note}>forget your password <a className={styles.link} href="#">click here</a></Form.Label>
                    <Form.Label className={styles.link_note}>don't have an account <a
                    onClick={()=>{handleCloseLogin(); handleShowRegister();}}
                    className={styles.link} href="#">create now</a></Form.Label>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="secondary" className="btn btn_custom" onClick={handleCloseLogin}>
                        Login Now
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(LogInButtonAndModal)