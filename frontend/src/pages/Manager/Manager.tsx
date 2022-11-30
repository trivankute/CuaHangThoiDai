import {memo, useEffect, useState} from 'react'

import styles from "./Manager.module.css"

import Header from "../../components/User/Header/Header"

import clsx from 'clsx'
import ProductItem from '../../components/ProductItem/ProductItem'
import { Button, Form } from 'react-bootstrap'
import Warning from '../../components/Warning/Warning'
import ProductModal from '../../components/ProductModal/ProductModal'

function Manager() {
    const [isWarning, setIsWarning] = useState(false)
    const [editMode, setEditMode] = useState(false)
    function handleWarningShow() {
        setIsWarning(true);
    }
    function handleWarningClose() {
        setIsWarning(false);
    }
    function handleEditShow() {
        setEditMode(true);
    }
    function handleEditClose() {
        setEditMode(false);
    }
    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={styles.container}>
                <Header title="Store Manager" content="Manage your products"/>
                <Warning show={isWarning} handleShow={handleWarningShow} handleClose={handleWarningClose} />
                <ProductModal show={editMode} handleClose={handleEditClose}/>
                <div>
                    <Form className="d-flex mt-3 mb-3">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </div>
                <div>
                <ProductItem handleWarningShow={handleWarningShow} handleEditShow={handleEditShow}/>
                <ProductItem handleWarningShow={handleWarningShow} handleEditShow={handleEditShow}/>
                <ProductItem handleWarningShow={handleWarningShow} handleEditShow={handleEditShow}/>
                <ProductItem handleWarningShow={handleWarningShow} handleEditShow={handleEditShow}/>
                </div>
            </div>
        </>
    )
}

export default memo(Manager)