import clsx from 'clsx';
import { memo, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

import styles from './ProductModal.module.css';

function ProductModal({ show, handleClose }: { show: any, handleClose: any }) {
    const [title, setTitle] = useState("");
    const [albumType, setAlbumType] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("2")
    const [albumImage, setAlbumImage] = useState({files:[], img:""})
    function handleSubmit(e:any) {
        console.log(e)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit album</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className={clsx("d-flex flex-column align-items-center p-3", styles.box)}>
                        <Form className="w-100" onSubmit={(e) => { handleSubmit(e) }}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Title:</Form.Label>
                                <Form.Control required type="text" placeholder="Album's title" onChange={(e) => { setTitle(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Price:</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Đ</InputGroup.Text>
                                    <Form.Control required type="number" aria-label="Amount (to the nearest dollar)" onChange={(e) => { setPrice(e.target.value) }} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Quantity:</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Number:</InputGroup.Text>
                                    <Form.Control required type="number" aria-label="Amount (to the nearest dollar)" onChange={(e) => { setQuantity(e.target.value) }} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="position-relative mb-3">
                                <Form.Label>Album Type:</Form.Label>
                                <Form.Select required aria-label="Default select example" onChange={(e) => { setAlbumType(e.target.value) }}>
                                    <option value="category">Album type</option>
                                    <option value="vinyl">Vinyl</option>
                                    <option value="cd">Cd</option>
                                    <option value="cassette">Cassette</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="position-relative mb-3">
                                <Form.Label>Album Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    required
                                    name="file"
                                    // @ts-ignore
                                    onChange={(e) => { setAlbumImage(() => ({ files: e.target.files, img: URL.createObjectURL(e.target.files[0]) })) }}
                                />
                            </Form.Group>
                            {albumImage.img &&
                                <div className="d-flex w-100 mt-3 mb-3" style={{ height: 100 }}>
                                    <img src={albumImage.img} />
                                </div>}
                        </Form>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(ProductModal)