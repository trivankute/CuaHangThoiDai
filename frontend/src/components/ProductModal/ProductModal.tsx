import clsx from 'clsx';
import { memo, useState, useEffect } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AlbumStore } from '../../redux/selectors';
import { updateAlbum } from '../../redux/slices/AlbumSlice';
import FlashSlice from '../../redux/slices/FlashSlice';
import Loading from '../Loading/Loading';

import styles from './ProductModal.module.css';

function ProductModal({ show, handleClose, album, setForReloadPay }: { show: any, handleClose: any, album:any, setForReloadPay:any }) {
    const [title, setTitle] = useState("");
    const [albumType, setAlbumType] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [albumImage, setAlbumImage] = useState({files:[], img:""})
    const albumFromStore = useSelector(AlbumStore)
    const dispatch = useDispatch<any>()
    function handleSubmit(e:any) {
        // check all fields are filled
        if(title === "" || albumType === "" || price === "" || quantity === "" || albumImage.files.length === 0)
        {
            dispatch(FlashSlice.actions.handleOpen({ message:"Please fill all fields", type:"danger" }))
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        const data = new FormData();
        data.append("title", title);
        data.append("price", price);
        data.append("quantity", quantity);
        data.append("albumType", albumType);
        data.append("albumAvatar", albumImage.files[0]);
        dispatch(updateAlbum({id:album.album_id, input:data}))
            .then((res:any)=>{
                if(res.payload.status === "success")
                {
                    handleClose()
                    dispatch(FlashSlice.actions.handleOpen({ message:"Album updated successfully", type:"success" }))
                    setForReloadPay(true)
                }
                else
                {
                    dispatch(FlashSlice.actions.handleOpen({ message:"Album update failed", type:"danger" }))
                }
            })
    }
    useEffect(()=>{
        setTitle(album.title)
        setAlbumType(album.album_type)
        setPrice(album.price)
        setQuantity(album.quanity)
        setAlbumImage({files:[], img:album.avatar})
    },[])
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
                                <Form.Control value={title} required type="text" placeholder="Album's title" onChange={(e) => { setTitle(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Price:</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>KVNĐ</InputGroup.Text>
                                    <Form.Control value={price} required type="text" aria-label="Amount" onChange={(e) => { setPrice(e.target.value) }} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Quantity:</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Number:</InputGroup.Text>
                                    <Form.Control value={quantity} required type="number" aria-label="Amount" onChange={(e) => { setQuantity(e.target.value) }} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="position-relative mb-3">
                                <Form.Label>Album Type:</Form.Label>
                                {
                                    albumType !== "" &&
                                    <Form.Select value={albumType} required aria-label="Default select example" onChange={(e) => { setAlbumType(e.target.value) }}>
                                        <option selected={albumType.toLowerCase() === "vinyl"?true:false} value="vinyl">Vinyl</option>
                                        <option selected={albumType.toLowerCase() === "cd"?true:false} value="cd">Cd</option>
                                        <option selected={albumType.toLowerCase() === "cassette"?true:false} value="cassette">Cassette</option>
                                    </Form.Select>
                                }
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
                        <Button onClick={handleSubmit} variant="secondary" className="btn btn_custom" type="submit">
                            {
                                albumFromStore.loading &&
                                <Loading small/>
                            }
                            Submit
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(ProductModal)