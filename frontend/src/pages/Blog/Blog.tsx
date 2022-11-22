import { memo, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './Blog.module.css'
import { Container, Row } from "react-bootstrap"
import image from "./cd.png"
import BackNavigate from "../../components/BackNavigate/BackNavigate"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faUser, faCalendar} from '@fortawesome/free-solid-svg-icons'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import "../../globalCss.css"
import clsx from 'clsx'

function Blog() {
    const navigate = useNavigate()
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (<>
        <Container fluid className={styles.container}>
            <BackNavigate backPath="/products/blogs" backPage="Products" currentPage="Blog"/>
            <Row >
                {/* faLeft */}
                <div onClick={()=>{navigate('/products/blogs')}} className={styles.turnBack}>
                <FontAwesomeIcon icon={faArrowLeft as IconProp} className={clsx(styles.icon, 'btn btn_custom')}/>
                </div>
            </Row>
            <Row >
                <div className={styles.blogTitle}>
                <h1>Blog Title</h1>
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
                <img src={image} alt="blog image"/>
                </div>
            </Row>
            <Row>
                <div className={styles.blogContent}>
                <p>sdfasfsaljssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                </div>
            </Row>
        </Container>
    </>)
}

export default memo(Blog)