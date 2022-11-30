import {memo} from 'react';
import { Button, Modal } from 'react-bootstrap';

import styles from './ProductModal.module.css';

function ProductModal({show, handleShow, handleClose}:{show:any,handleShow:any, handleClose:any}) {
    return (
        <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default memo(ProductModal)