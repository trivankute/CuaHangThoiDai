import { memo, useState, useEffect } from 'react';

import styles from "./Employees.module.css"

import Header from '../../components/User/Header/Header'
import Warning from '../../components/Warning/Warning'

import { Form, Button, Pagination } from 'react-bootstrap'
import RegisterButtonAndModal from '../../components/RegisterButtonAndModal/RegisterButtonAndModal';
import clsx from 'clsx';
import EmployeeItem from '../../components/EmployeeItem/EmployeeItem';
import EmployeeModal from '../../components/EmployeeModal/EmployeeModal';
function Employees() {
  const [isWarning, setIsWarning] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [seeDetail, setSeeDetail] = useState(false)

  function handleSeeDetailShow() {
    setSeeDetail(true);
  }
  function handleSeeDetailClose() {
    setSeeDetail(false);
  }
  function handleWarningShow() {
    setIsWarning(true);
  }
  function handleWarningClose() {
    setIsWarning(false);
  }
  function handleShowRegister() {
      setShowRegister(true)
  }
  function handleCloseRegister() {
      setShowRegister(false)
  }
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className={styles.container}>
        <Warning show={isWarning} handleShow={handleWarningShow} handleClose={handleWarningClose} />
        <EmployeeModal show={seeDetail} handleShow={handleSeeDetailShow} handleClose={handleSeeDetailClose} />
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
                <div className="d-flex justify-content-between">
                    {/* filter */}
                    <div className="d-flex justify-content-between mt-3 mb-3">
                        <div className="d-flex">
                            <Form.Select style={{cursor:"pointer"}} aria-label="Default select example" className="me-2">
                                <option>Sort by state</option>
                                <option value="1">In used</option>
                                <option value="2">Not in used</option>
                            </Form.Select>
                        </div>
                    </div>
                    <RegisterButtonAndModal linkStyle={clsx("btn btn_custom", styles.register_btn)}
                        showRegister={showRegister} handleShowRegister={handleShowRegister}
                        handleCloseRegister={handleCloseRegister} 
                    />
                </div>
        <div>
          Search for "trivan":
        </div>
        
        <div className="mt-3" style={{color:"var(--light-color)"}}>
          Nothing
        </div>
        <div>
          <EmployeeItem handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} />
          <EmployeeItem handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} />
          <EmployeeItem handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} />
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
