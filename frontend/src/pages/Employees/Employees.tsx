import {memo, useState} from 'react';

import styles from "./Employees.module.css"

import CustomerItem from '../../components/CustomerItem/CustomerItem'
import Header from '../../components/User/Header/Header'
import Warning from '../../components/Warning/Warning'

import {Form, Button, Pagination} from 'react-bootstrap'
function Employees() {
    const [isWarning, setIsWarning] = useState(false)
    function handleWarningShow() {
      setIsWarning(true);
    }
    function handleWarningClose() {
      setIsWarning(false);
    }
    return(
        <>
        <div className={styles.container}>
          <Warning show={isWarning} handleShow={handleWarningShow} handleClose={handleWarningClose}/>
            <Header title="Manages your employee" content="Here you can manage your employees." />
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
              {/* filter select*/}
              <select className={styles.select}>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
              </select>
            </div>
            <div>
                <CustomerItem handleWarningShow={handleWarningShow}/>
                <CustomerItem handleWarningShow={handleWarningShow}/>
                <CustomerItem handleWarningShow={handleWarningShow}/>
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

export default memo(Employees)
