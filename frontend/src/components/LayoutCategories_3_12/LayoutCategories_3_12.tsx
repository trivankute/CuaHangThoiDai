import {memo, useEffect, useState} from 'react'

import styles from "./LayoutCategories_3_12.module.css"

import { Container, Col, Row, Offcanvas } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
    faList, faArrowLeft, faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import clsx from "clsx"

function LayoutCategories_3_12(props:any) {
    // for offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    ////////////////////////////////////////////////////////////
    // for responsive
    const [res, setRes] = useState(() => {
        if (window.innerWidth < 450) { return true } else {
            return false
        }
    })

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
    // const [forBackNavigate, setForBackNavigate] = useState(["/","Home","Products"])
    const [currentPath, setCurrentPath] = useState<string>(() => {
        const path = window.location.pathname;
        const pathArray = path.split("/");
        return pathArray[2]
    })
    useEffect(() => {
        const path = window.location.pathname;
        const pathArray = path.split("/");
        setCurrentPath(pathArray[2])
    }, [window.location.pathname])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <><Container fluid className={styles.container}>
        {/* create lay out with col-2 and col-10 */}
        <Row className={styles.row}>
            {res ?
                <>
                    <div onClick={handleShow} 
                        onMouseEnter={() => setShowCate(true)}
                        onMouseLeave={() => setShowCate(false)}
                        className={clsx(styles.col_3_header, "btn btn_custom", styles.offcanvas_button)}>
                        <div className="w-100 d-flex justify-content-start align-items-center">
                            <FontAwesomeIcon className={styles.icon} icon={faList as IconProp} />
                            <h4>Categories</h4>
                        </div>
                        {
                            showCate ?
                                <FontAwesomeIcon className={styles.icon} icon={faArrowLeft as IconProp} />
                                :
                                <div style={{ fontSize: 12, display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                            {/*load children*/}
                            {props.children}
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
                            {/*load children*/}
                            {props.children}
                    </div>
                </Col>
            }
            <Col xs={res ? 12 : 9} className={styles.col_9}>
                {/* create a box with 100% height */}
                <div className={styles.box}>
                    {/* <Outlet/> */}
                </div>
            </Col>
        </Row>
    </Container>
        </>
    )
}

export default memo(LayoutCategories_3_12)