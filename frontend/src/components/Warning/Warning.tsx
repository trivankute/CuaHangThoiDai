import {memo} from 'react';
import styles from './Warning.module.css'

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Warning({show, handleShow, handleClose}:{show:any,handleShow:any, handleClose:any}) {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure about that</Modal.Title>
        </Modal.Header>
        <Modal.Body>You cannot undo this action</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary"  className={styles.save} onClick={handleClose} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default memo(Warning)