import { memo, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Blog.module.css'
import { Container, Row } from "react-bootstrap"
import image from "./cd.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import "../../globalCss.css"
import clsx from 'clsx'

function Blog() {
    const navigate = useNavigate()
    const location = useLocation()
    const [topic, setTopic] = useState("")
    const [albumImage, setAlbumImage] = useState({ file: "", img: "" });
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        if (location.state) {
            setTopic(location.state.topic)
            setTitle(location.state.title)
            setContent(location.state.content)
            setAlbumImage({ file: "", img: location.state.img })
        }
    }, [])
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
                                    title: title,
                                    content: content,
                                    img: albumImage.img
                                }
                            })
                        }} className={styles.turnBack}>
                            <FontAwesomeIcon icon={faArrowLeft as IconProp} className={clsx(styles.icon, 'btn btn_custom')} />
                        </div>
                        <div onClick={() => {
                            navigate('/user/writeblog')}} className="btn btn_custom d-flex justify-content-center align-items-center" style={{marginTop:0}}>
                            submit
                        </div>
                    </div>
                        :
                        <div onClick={() => { navigate('/products/blogs') }} className={styles.turnBack}>
                            <FontAwesomeIcon icon={faArrowLeft as IconProp} className={clsx(styles.icon, 'btn btn_custom')} />
                        </div>

                }
            </Row>
            <Row >
                <div className={styles.blogTitle}>
                    <h1>{title}</h1>
                    <h4>Topic: {topic}</h4>
                </div>
            </Row>
            <Row className={styles.notes}>
                <div className={styles.notes}>
                    <div className={styles.icons}>
                        <a href="#">
                            <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> by user </a>
                        <a href="#">
                            <FontAwesomeIcon className={styles.icon} icon={faCalendar as IconProp} /> 1st may, 2021 </a>
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
        </Container>
    </>)
}

export default memo(Blog)