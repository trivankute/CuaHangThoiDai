import { memo, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Blog.module.css'
import { Button, Container, Form, Row } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import "../../globalCss.css"
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { BlogStore, UserStore } from '../../redux/selectors'
import { createBlog, getBlogById } from '../../redux/slices/BlogSlice'
import FlashSlice from '../../redux/slices/FlashSlice'
import Loading from '../../components/Loading/Loading'

function Blog() {
    const user = useSelector(UserStore)
    const blog = useSelector(BlogStore)
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const location = useLocation()
    // get url
    const url = location.pathname.split("/")
    const blogId = url[url.length - 1]
    const [topic, setTopic] = useState("")
    const [albumImage, setAlbumImage] = useState({ files: [], img: "" });
    const [headline, setHeadline] = useState("");
    const [content, setContent] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0)
        if (location.state) {
            setTopic(location.state.topic)
            setHeadline(location.state.headline)
            setContent(location.state.content)
            setAlbumImage(location.state.img)
            //revoke image url
            URL.revokeObjectURL(albumImage.img);
        }
        if(!location.pathname.includes("writeblog"))
        dispatch(getBlogById({id:blogId}))
    }, [blogId])
    function handleSubmit(e:any) {
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
            if(res.payload.status === "success"){
                    navigate('/products/blogs', {state:{
                        afterSubmitBlog: true
                    }})
            }
            else {
                dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "danger" }))
                }
                //revoke image url
                URL.revokeObjectURL(albumImage.img);
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
    return (<>
        <Container fluid className={styles.container}>
            <Row >
                {
                    location.pathname.includes("preview") ?
                    <div className="w-100 d-flex justify-content-between">
                        <div onClick={() => {
                            navigate('/user/writeblog', {
                                state: {
                                    topic: topic,
                                    headline: headline,
                                    content: content,
                                    img: albumImage
                                }
                            })
                        }} className={styles.turnBack}>
                            <FontAwesomeIcon icon={faArrowLeft as IconProp} className={clsx(styles.icon, 'btn btn_custom')} />
                        </div>
                        <Form>
                        <Button type="submit" variant="secondary" onClick={(e:any) => {handleSubmit(e);
                            }} className="btn btn_custom d-flex justify-content-center align-items-center position-relative" style={{marginTop:0}}>
                                {
                                    blog.loading &&
                                    <Loading small/>
                                }
                            submit
                        </Button>
                        </Form>
                    </div>
                        :
                        <div onClick={() => { navigate('/products/blogs') }} className={styles.turnBack}>
                            <FontAwesomeIcon icon={faArrowLeft as IconProp} className={clsx(styles.icon, 'btn btn_custom')} />
                        </div>

                }
            </Row>
            {
                !location.pathname.includes('writeblog')
                ?
                <>
                {
                    blog.data &&
                    <>
                    <Row >
                        <div className={styles.blogTitle}>
                            <h1>{blog.data.headline}</h1>
                            <h4>Topic: {blog.data.topic}</h4>
                        </div>
                    </Row>
                    <Row className={styles.notes}>
                        <div className={styles.notes}>
                            <div className={styles.icons}>
                                <a href="#">
                                    <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> by {blog.data.employeeName} </a>
                                <a href="#">
                                    <FontAwesomeIcon className={styles.icon} icon={faCalendar as IconProp} /> {blog.data.date} </a>
                            </div>
                        </div>
                    </Row>
                    <Row >
                        <div className={styles.blogImage}>
                            <img src={blog.data.avatar} alt="blog image" />
                        </div>
                    </Row>
                    <Row>
                        <div className={styles.blogContent}>
                            <p>{blog.data.content}</p>
                        </div>
                    </Row>
                    </>
                }
                </>
                :
                <>
                <Row >
                    <div className={styles.blogTitle}>
                        <h1>{headline}</h1>
                        <h4>Topic: {topic}</h4>
                    </div>
                </Row>
                <Row className={styles.notes}>
                    <div className={styles.notes}>
                        <div className={styles.icons}>
                            <a href="#">
                                <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> by {user.data&&user.data.account.username} </a>
                            <a href="#">
                                <FontAwesomeIcon className={styles.icon} icon={faCalendar as IconProp} /> 
                                {/* get date now */}
                                {new Date().toLocaleDateString()}
                                </a>
                        </div>
                    </div>
                </Row>
                <Row >
                    <div className={styles.blogImage}>
                        <img src={albumImage.img} alt="blog image" />
                    </div>
                </Row>
                <Row>
                    <div className={styles.blogContent}>
                        <p>{content}</p>
                    </div>
                </Row>
                </>
            }
        </Container>
    </>)
}

export default memo(Blog)