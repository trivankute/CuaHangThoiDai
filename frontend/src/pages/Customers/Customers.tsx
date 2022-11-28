import { memo } from 'react'
import CustomerItem from '../../components/CustomerItem/CustomerItem'
import Header from '../../components/User/Header/Header'

import styles from "./Customers.module.css"
import {Form, Button, Pagination} from 'react-bootstrap'

function Customers() {
    return (
        <>
            <div className={styles.container}>
                <Header title="Manages your customers" content="Here you can manage your customers." />
                <div>
                    <Form className="d-flex mt-3">
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
                    <CustomerItem />
                    <CustomerItem />
                    <CustomerItem />
                </div>
                

                <Pagination className={styles.pagination}>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Item >{2}</Pagination.Item>
                    <Pagination.Item >{3}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item>{6}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        </>
    )
}

export default memo(Customers)