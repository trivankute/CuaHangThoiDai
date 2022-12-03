import { memo, useEffect, useState } from 'react';

import styles from "./Upload.module.css";

import { Container, Form, InputGroup, Button } from 'react-bootstrap';

import clsx from 'clsx'
import { getAllAlbums, uploadAlbum } from '../../utils/album.utils';

function Upload() {
    const [title, setTitle] = useState("");
    const [albumType, setAlbumType] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("1")
    const [albumImage, setAlbumImage] = useState({files:[], img:""}) 
    const [artistName, setArtistName] = useState("");
    const [artistAvatar, setArtistAvatar] = useState({files:[], img:""})

    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0)
    }, [])
    async function handleSubmit(e: any) {
        e.preventDefault();
        e.stopPropagation();
        const data = new FormData();
        data.append("title", title);
        data.append("price", price);
        data.append("artistName", artistName);
        data.append("albumType", albumType);
        data.append("artistAvatar", artistAvatar.files[0]);
        data.append("albumAvatar", albumImage.files[0]);
        const result = await uploadAlbum(data);
        console.log(result);
    }
    return (
        <>
            <Container className={clsx("mt-3 mb-3")} style={{ minWidth: 300, maxWidth: 500 }}>
                <div className={clsx("text-center", styles.topic)}>
                    New album
                </div>
                <section className={clsx("d-flex flex-column align-items-center p-3", styles.box)}>
                    <Form className="w-100" onSubmit={(e) => {handleSubmit(e)}}>
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
                                <Form.Control required type="number" aria-label="Amount (to the nearest dollar)" onChange={(e) => { setQuantity(e.target.value) }} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Artist name:</Form.Label>
                            <Form.Control required type="text" placeholder="Artist name" onChange={(e) => { setArtistName(e.target.value) }} />
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
                        <Form.Group className="position-relative mb-3">
                            <Form.Label>Artist Avatar</Form.Label>
                            <Form.Control
                                type="file"
                                required
                                name="file"
                                // @ts-ignore
                                onChange={(e) => { setArtistAvatar(() => ({ files: e.target.files, img: URL.createObjectURL(e.target.files[0]) })) }}
                            />
                        </Form.Group>
                        {artistAvatar.img &&
                            <div className="d-flex w-100 mt-3 mb-3" style={{ height: 100 }}>
                                <img src={artistAvatar.img} />
                        </div>}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </section>
            </Container>
        </>
    )
}

export default memo(Upload)