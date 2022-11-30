import {memo, useEffect, useState} from 'react'

import styles from "./Manager.module.css"

import Header from "../../components/User/Header/Header"

import Brand from "../../components/Brand/Brand"

import clsx from 'clsx'
import ProductItem from '../../components/ProductItem/ProductItem'
import { Button, Form } from 'react-bootstrap'
import Warning from '../../components/Warning/Warning'

function Manager() {
    const [isWarning, setIsWarning] = useState(false)
    function handleWarningShow() {
        setIsWarning(true);
    }
    function handleWarningClose() {
        setIsWarning(false);
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
                <ProductItem handleWarningShow={handleWarningShow}/>
                <ProductItem handleWarningShow={handleWarningShow}/>
                <ProductItem handleWarningShow={handleWarningShow}/>
                <ProductItem handleWarningShow={handleWarningShow}/>
                </div>
            </div>
        </>
    )
}

export default memo(Manager)