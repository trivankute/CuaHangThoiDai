import { memo, useState, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom"

import styles from './ProductsLayout.module.css';

import { Container, Col, Row, Offcanvas, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faList, faCompactDisc, faMusic, faBlog, faLayerGroup, faArrowLeft, faArrowRight,
 } from '@fortawesome/free-solid-svg-icons'

import ListItem from "../../components/ProductsLayout/ListItem/ListItem"

import clsx from "clsx"

function ProductsLayout() {
    const navigate = useNavigate();
    // for offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
////////////////////////////////////////////////////////////
// for responsive
    const [res, setRes] = useState(()=>{
        if (window.innerWidth < 450) {return true} else {
        return false
    }})

    useEffect(() => {
        function hanldeResize() {
            if (window.innerWidth < 450) {
                setRes(true)
            } else {
                setRes(false)
            }
        }
        window.addEventListener('resize', hanldeResize)
        return () => {
            window.removeEventListener('resize', hanldeResize)
        }
    }, [])
    const [showCate, setShowCate] = useState(false)
    /////////////////////////////////////////////////////////////////////
    // for navigate application
    const [currentPath, setCurrentPath] = useState<string>(()=>{
        const path = window.location.pathname;
        const pathArray = path.split("/");
        return pathArray[2]
    })
    useEffect(() => {
            const path = window.location.pathname;
            const pathArray = path.split("/");
            setCurrentPath(pathArray[2])
        },[currentPath])

    return (
        <Container fluid className={styles.container}>
            {/* create lay out with col-2 and col-10 */}
            <Row className={styles.row}>
                {res ? 
                <>
                <div onClick={handleShow}  onMouseEnter={() => setShowCate(true)}
                                             onMouseLeave={() => setShowCate(false)}
                 className={clsx(styles.col_3_header,"btn btn_custom", styles.offcanvas_button)}>
                    <div className="w-100 d-flex justify-content-start align-items-center">
                    <FontAwesomeIcon className={styles.icon} icon={faList as IconProp} />
                    <h4>Categories</h4>
                    </div>
                    {
                        showCate ?
                        <FontAwesomeIcon className={styles.icon} icon={faArrowLeft as IconProp} />
                        :
                        <div style={{fontSize:12, display:"flex", justifyContent: "center", alignItems: "center"}}>
                        {currentPath} <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp} />
                        </div>
                    }
                    </div>

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className={styles.offcanvas_header}>
                            <FontAwesomeIcon className={styles.icon} icon={faList as IconProp} />
                            <h4>Categories</h4>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className={styles.offcanvas_body}>
                        <ListItem button_style={currentPath=='albums'?styles.cate_button_style:""} title={"Albums"} icon={faCompactDisc}></ListItem>
                        <ListItem button_style={currentPath=='services'?styles.cate_button_style:""} title={"Services"} icon={faLayerGroup}></ListItem>
                        <ListItem button_style={currentPath=='artists'?styles.cate_button_style:""} title={"Artists"} icon={faMusic}></ListItem>
                        <ListItem button_style={currentPath=='blogs'?styles.cate_button_style:""} title={"Blogs"} icon={faBlog}></ListItem>
                    </Offcanvas.Body>
                </Offcanvas>
                </>
                :
                <Col xs={3} className={styles.col_3}>
                    {/* create a box with 100% height */}
                    <div className={styles.box}>
                        <div className={styles.col_3_header}>
                            <FontAwesomeIcon className={styles.icon} icon={faList as IconProp} />
                            <h4>Categories</h4>
                        </div>
                        <ListItem button_style={currentPath=='albums'?styles.cate_button_style:""} title={"Albums"} icon={faCompactDisc}></ListItem>
                        <ListItem button_style={currentPath=='services'?styles.cate_button_style:""} title={"Services"} icon={faLayerGroup}></ListItem>
                        <ListItem button_style={currentPath=='artists'?styles.cate_button_style:""} title={"Artists"} icon={faMusic}></ListItem>
                        <ListItem button_style={currentPath=='blogs'?styles.cate_button_style:""} title={"Blogs"} icon={faBlog}></ListItem>

                    </div>
                </Col>
                }
                <Col xs={res?12:9} className={styles.col_9}>
                    {/* create a box with 100% height */}
                    <div className={styles.box}>
                        <Outlet></Outlet>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default memo(ProductsLayout)