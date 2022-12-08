import { memo, useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteBlog, updateBlog } from '../../redux/slices/BlogSlice';
import FlashSlice from '../../redux/slices/FlashSlice';

import styles from './BlogModal.module.css';

function BlogModal({ show, handleClose, blog, setForReloadPage }: { setForReloadPage: any, blog: any, show: any, handleClose: any }) {
    const [areYouSure, setAreYouSure] = useState(false);
    const [topic, setTopic] = useState("");
    const [headline, setHeadline] = useState("");
    const [content, setContent] = useState("");
    function handleSetDefault() {
        setTopic("")
        setHeadline("")
        setContent("")
    }
    const dispatch = useDispatch<any>()
    function handleAdjust() {
        if(topic!==""||headline!==""||content!=="")
        {
            if(topic==="") setTopic(blog.topic)
            if(headline==="") setHeadline(blog.headline)
            if(content==="") setContent(blog.content)
            if(areYouSure)
            {
                dispatch(updateBlog({
                    id: blog.blog_id,
                    topic: topic,
                    headline: headline,
                    content: content
                    }))
                    .then((res: any) => {
                        if (res.payload.status === 'success') {
                            setForReloadPage((prev: boolean) => !prev)
                            handleClose()
                            dispatch(FlashSlice.actions.handleOpen({ message: "Update blog successfully", type: "success" }))
                            setAreYouSure(false)
                            handleSetDefault()
                        }
                        else {
                            dispatch(FlashSlice.actions.handleOpen({ message: "Update blog failed", type: "danger" }))
                            setAreYouSure(false)
                            handleSetDefault()
                        }
                    })
            }
            else {
                dispatch(FlashSlice.actions.handleOpen({ message: "Are you sure?", type: "danger" }))
                setAreYouSure(true)
            }
        }
        else
        {
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info" }))
        }
    }
    function handleDelete() {
        if(areYouSure)
        {
            dispatch(deleteBlog({
                id: blog.blog_id
                }))
                .then((res: any) => {
                    if (res.payload.status === 'success') {
                        setForReloadPage((prev: boolean) => !prev)
                        handleClose()
                        dispatch(FlashSlice.actions.handleOpen({ message: "Delete blog successfully", type: "success" }))
                        setAreYouSure(false)
                        handleSetDefault()
                    }
                    else {
                        dispatch(FlashSlice.actions.handleOpen({ message: "Delete blog failed", type: "danger" }))
                        setAreYouSure(false)
                        handleSetDefault()
                    }
                })
        }
        else {
            dispatch(FlashSlice.actions.handleOpen({ message: "Are you sure?", type: "danger" }))
            setAreYouSure(true)
        }
    }
    return (
        <>
            <Modal size="lg" show={show} onHide={() => {
                handleClose();
                setAreYouSure(false)
                handleSetDefault()
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>BlogID {blog.blog_id} Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form >
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="Topic"
                            className="mb-3"
                        >
                            <Form.Control style={{ textTransform: "none" }} value={topic === "" ? blog.topic : topic} onChange={(e) => { setTopic(e.target.value) }} as="textarea" placeholder="Topic" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="Headline"
                            className="mb-3"
                        >
                            <Form.Control style={{ textTransform: "none" }} value={headline === "" ? blog.headline : headline} onChange={(e) => { setHeadline(e.target.value) }} as="textarea" placeholder="Leave a comment here" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingTextarea2" label="content">

                            <Form.Control
                                as="textarea"
                                placeholder="Content"
                                value={content === "" ? blog.content : content}
                                style={{ height: 200, textTransform: "none" }}
                                onChange={(e) => { setContent(e.target.value) }}
                            />
                        </FloatingLabel>
                    </Form>
                    <div onClick={handleAdjust} className={styles.formGroup} style={{ width: 150 }}>
                        <button type="submit" className="btn btn_custom">Adjust</button>
                    </div>
                    <Button variant="danger" className="mt-3" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose()
                        setAreYouSure(false)
                        handleSetDefault()
                    }}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(BlogModal)