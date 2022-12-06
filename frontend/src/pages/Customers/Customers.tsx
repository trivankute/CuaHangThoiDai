import { memo, useState, useEffect } from 'react';
import CustomerItem from '../../components/CustomerItem/CustomerItem'
import Header from '../../components/User/Header/Header'

import styles from "./Customers.module.css"
import { Form, Button, Pagination } from 'react-bootstrap'

import Warning from '../../components/Warning/Warning'
import CustomerModal from '../../components/CustomerModal/CustomerModal';

function Customers() {
  const [isWarning, setIsWarning] = useState(false)
  const [seeDetail, setSeeDetail] = useState(false)
  function handleWarningShow() {
    setIsWarning(true);
  }
  function handleWarningClose() {
    setIsWarning(false);
  }
  function handleSeeDetailShow() {
    setSeeDetail(true);
  }
  function handleSeeDetailClose() {
    setSeeDetail(false);
  }
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  
  return (

    <>
      <div className={styles.container}>
        <Warning type="account" id="1" title="Are you sure to delete this customer" action="delete" show={isWarning} handleClose={handleWarningClose} />
        <CustomerModal show={seeDetail} handleShow={handleSeeDetailShow} handleClose={handleSeeDetailClose} />
        <Header title="Manages your customers" content="Here you can manage your customers." />
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
          Search for "trivan":
        </div>
        <div className="mt-3" style={{ color: "var(--light-color)" }}>
          Nothing
        </div>
        <div>
          <CustomerItem handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} />
          <CustomerItem handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} />
          <CustomerItem handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} />
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
