import { memo, useState, useEffect } from 'react';

import styles from './User.module.css';

import clsx from 'clsx';

import { useNavigate, Outlet } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
    faList, faArrowLeft, faArrowRight,faUser, faWallet, faBell, faTicket, faKey, faUsers
    ,faUpload, faStore
} from '@fortawesome/free-solid-svg-icons'

import { Container, Row, Col, Offcanvas } from 'react-bootstrap'
import BackNavigate from '../../components/BackNavigate/BackNavigate';
import ListItem from '../../components/ProductsLayout/ListItem/ListItem';

function User() {
    const navigate = useNavigate();
    /////////////////////////////////////////////////////////////////////
    // for navigate application
    const [forBackNavigate, setForBackNavigate] = useState(["/", "Home", "Products"])
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
    function ListItemsFunction(type:any) {
        switch (type) {
            case "user":
                return (
                    <>
                    <ListItem onClick={() => {
                        handleClose();
                        navigate('/user/profile')
                    }} button_style={currentPath == 'profile' ? styles.cate_button_style : ""} title={"Profile"} icon={faUser}></ListItem>
                    <ListItem onClick={() => {
                        handleClose();
                        navigate('/user/password')
                    }} button_style={currentPath == 'password' ? styles.cate_button_style : ""} title={"Password"} icon={faKey}></ListItem>
                    <ListItem onClick={() => {
                        handleClose();
                        navigate('/user/transactions')
                    }} button_style={currentPath == 'transactions' ? styles.cate_button_style : ""} title={"Transactions"} icon={faWallet}></ListItem>
                    <ListItem onClick={() => {
                        handleClose();
                        navigate('/user/notifications')
                    }} button_style={currentPath == 'notifications' ? styles.cate_button_style : ""} title={"Notifications"} icon={faBell}></ListItem>
                    <ListItem onClick={() => {
                        handleClose();
                        navigate('/user/vouchers')
                    }} button_style={currentPath == 'vouchers' ? styles.cate_button_style : ""} title={"Vouchers"} icon={faTicket}></ListItem>
                    </>
                );
            case "employee":
            return (
                <>
                <ListItem onClick={() => {
                    handleClose();
                    navigate('/user/manager')
                }} button_style={currentPath == 'manager' ? styles.cate_button_style : ""} title={"Manager"} icon={faStore}></ListItem>
                <ListItem onClick={() => {
                    handleClose();
                    navigate('/user/profile')
                }} button_style={currentPath == 'profile' ? styles.cate_button_style : ""} title={"Profile"} icon={faUser}></ListItem>
                <ListItem onClick={() => {
                    handleClose();
                    navigate('/user/customers')
                }} button_style={currentPath == 'customers' ? styles.cate_button_style : ""} title={"Customers"} icon={faUsers}></ListItem>
                <ListItem onClick={() => {
                    handleClose();
                    navigate('/user/upload')
                }} button_style={currentPath == 'upload' ? styles.cate_button_style : ""} title={"Upload"} icon={faUpload}></ListItem>
                <ListItem onClick={() => {
                    handleClose();
                    navigate('/user/writeblog')
                }} button_style={currentPath == 'upload' ? styles.cate_button_style : ""} title={"Upload"} icon={faUpload}></ListItem>
                </>
            )
            default:break;
    }}
    return (
        <><Container fluid className={styles.container}>
            {/* create lay out with col-2 and col-10 */}
            <Row className={styles.row}>
                <BackNavigate backPath="/" backPage="Home" currentPage="Profile"></BackNavigate>
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
                                {ListItemsFunction("user")}
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
                            {ListItemsFunction("employee")}
                        </div>
                    </Col>
                }
                <Col xs={res ? 12 : 9} className={styles.col_9}>
                    {/* create a box with 100% height */}
                    <div className={styles.box}>
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default memo(User);