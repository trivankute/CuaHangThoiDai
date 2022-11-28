import {memo, useEffect, useState} from 'react';

import styles from "./Upload.module.css";

import {Container, Form, InputGroup, Button} from 'react-bootstrap';

import clsx from 'clsx'

function Upload() {
    const [image, setImage] = useState({file:"", img:""}) 
    const [title, setTitle] = useState("") 
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [averageRating, setAverageRating] = useState("")
    

    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0)
    }, [])
    function handleSubmit(e:any) {
        e.preventDefault();

    }
    return (
        <>
            <Container className={clsx("mt-3 mb-3")} style={{minWidth:300, maxWidth:500}}>
                <div className={clsx("text-center",styles.topic)}>
                    New album
                </div>
                <section className={clsx("d-flex flex-column align-items-center p-3",styles.box)}>
                <Form className="w-100" onSubmit={(e)=>{e.preventDefault(); handleSubmit(e)}}>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control required type="text" placeholder="Enter your title" onChange={(e)=>{setTitle(e.target.value)}} />
                    </Form.Group>


                    <Form.Group className="position-relative mb-3">
                    <Form.Label>Category:</Form.Label>
                    <Form.Select required aria-label="Default select example" onChange={(e)=>{setCategory(e.target.value)}}>
                    <option value="Food">Category</option>
                    <option value="Food">Food</option>
                    </Form.Select>
                    </Form.Group>


                    <Form.Group className="position-relative mb-3">
                        <Form.Label>File</Form.Label>
                        <Form.Control
                        type="file"
                        required
                        name="file"
                        // @ts-ignore
                        onChange={(e)=>{setImage(()=>({files:e.target.files, img:URL.createObjectURL(e.target.files[0])}))}}
                        />
                    </Form.Group>

                    {Object.keys(image).length > 0 && 
                    <div className="d-flex w-100 mb-3" style={{height:100}}>
                                <img src={image.img}/>
                    </div>}
                    

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Price:</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control required type="number" aria-label="Amount (to the nearest dollar)" onChange={(e)=>{setPrice(e.target.value)}}/>
                        </InputGroup>
                    </Form.Group>

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