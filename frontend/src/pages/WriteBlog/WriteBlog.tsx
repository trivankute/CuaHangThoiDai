import { memo, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import styles from './WriteBlog.module.css'

import { Form, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../redux/slices/BlogSlice';
import FlashSlice from '../../redux/slices/FlashSlice';
import { BlogStore } from '../../redux/selectors';
import Loading from '../../components/Loading/Loading';

function WriteBlog() {
    const blog = useSelector(BlogStore)
    const dispatch = useDispatch<any>();
    const navigate = useNavigate()
    const location = useLocation()
    const [albumImage, setAlbumImage] = useState(() => {
        if (location.state)
            return location.state.img
        else
            return { files: [], img: "" }
    });
    const [topic, setTopic] = useState(() => {
        if (location.state)
            return location.state.topic
        else
            return ""
    });
    const [headline, setHeadline] = useState(() => {
        if (location.state)
            return location.state.headline
        else
            return ""
    });
    const [content, setContent] = useState(() => {
        if (location.state)
            return location.state.content
        else
            return ""
    });
    function handlePreview() {
        console.log(albumImage)
        navigate('preview', {
            state: {
                topic: topic,
                headline: headline,
                content: content,
                img: albumImage
            }
        })
    }

    function handleSubmit(e: any) {
        // if not empty
        e.preventDefault();
        e.stopPropagation();
        if (topic && headline && content && albumImage.files[0]) {
            const data = new FormData();
            data.append('topic', topic);
            data.append('headline', headline);
            data.append('content', content);
            data.append('image', albumImage.files[0]);
            dispatch(createBlog(data))
                .then((res: any) => {
                    if (res.payload.status === "success") {
                        dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "success" }))
                    }
                    else {
                        dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "danger" }))
                    }
                    //revoke image url
                    URL.revokeObjectURL(albumImage.img);
                    // reset state
                    setAlbumImage({ files: [], img: "" });
                    setTopic("");
                    setHeadline("");
                    setContent("");
                })
        }
        else {
            dispatch(FlashSlice.actions.handleOpen({ message: "Please fill all the fields", type: "danger" }))
        }
    }
    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0)
    }, [location.pathname])
    return (
        <>
            <div className={styles.container}>
                <Form>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Topic"
                        className="mb-3"
                    >
                        <Form.Control value={topic} onChange={(e) => { setTopic(e.target.value) }} as="textarea" placeholder="Topic" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Headline"
                        className="mb-3"
                    >
                        <Form.Control value={headline} onChange={(e) => { setHeadline(e.target.value) }} as="textarea" placeholder="Leave a comment here" />
                    </FloatingLabel>
                    <Form.Group className="position-relative mb-3">

                        <Form.Label>Blog Image</Form.Label>
                        <Form.Control
                            type="file"
                            required
                            name="file"
                            // @ts-ignore
                            onChange={(e) => { setAlbumImage(() => ({ files: e.target.files, img: URL.createObjectURL(e.target.files[0]) })) }}
                        />
                        {albumImage.img &&
                            <div className="d-flex w-100 mt-3 mb-3" style={{ height: 100 }}>
                                <img src={albumImage.img} />
                            </div>}

                    </Form.Group>
                    <FloatingLabel controlId="floatingTextarea2" label="content">

                        <Form.Control
                            as="textarea"
                            placeholder="Content"
                            value={content}
                            onChange={(e) => { setContent(e.target.value) }}
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    <Button onClick={handlePreview} type="submit" variant="secondary" className="btn_custom btn">
                        Preview
                    </Button>
                    <Button onClick={handleSubmit} type="submit" variant="secondary" className="ms-3 btn_custom btn position-relative">
                        {
                            blog.loading &&
                            <Loading small />
                        }
                        Submit
                    </Button>
                </Form>

            </div>
        </>
    )
}

export default memo(WriteBlog)
