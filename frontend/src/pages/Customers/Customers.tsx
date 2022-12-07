import { memo, useState, useEffect } from 'react';
import CustomerItem from '../../components/CustomerItem/CustomerItem'
import Header from '../../components/User/Header/Header'

import styles from "./Customers.module.css"
import { Form, Button, Pagination } from 'react-bootstrap'

import Warning from '../../components/Warning/Warning'
import CustomerModal from '../../components/CustomerModal/CustomerModal';
import { useDispatch, useSelector } from 'react-redux';
import { CustomersStore } from '../../redux/selectors';
import { getCustomersByName } from '../../redux/slices/CustomersSlice';

function Customers() {
  const [isWarning, setIsWarning] = useState(false)
  const [seeDetail, setSeeDetail] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [customerSelected, setCustomerSelected] = useState<any>(false)
  const customers = useSelector(CustomersStore)
  const dispatch = useDispatch<any>()
  function handleWarningShow() {
    setIsWarning(true);
  }
  function handleWarningClose() {
    setIsWarning(false);
  }
  function handleSeeDetailShow(customer:any) {
    setCustomerSelected(customer);
    setSeeDetail(true);
  }
  function handleSeeDetailClose() {
    setSeeDetail(false);
  }
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function handleSearch()
  {
    dispatch(getCustomersByName({
      id:1, customerCount:8, name:searchName
    }))
  }
  
  return (

    <>
      <div className={styles.container}>
        <Warning type="account" id="1" title="Are you sure to delete this customer" action="delete" show={isWarning} handleClose={handleWarningClose} />
        {
          customerSelected && 
          <CustomerModal customer={customerSelected} show={seeDetail} handleShow={handleSeeDetailShow} handleClose={handleSeeDetailClose} />
        }
        <Header title="Manages your customers" content="Here you can manage your customers." />
        <div>
          <Form onSubmit={(e:any)=>{
            e.preventDefault()
            handleSearch()
          }} className="d-flex mt-3 mb-3">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchName}
              onChange={(e:any)=>{
                setSearchName(e.target.value)
              }}

            />
            <Button onClick={handleSearch} variant="outline-success">Search</Button>
          </Form>
        </div>
        <div>
          Search for "{searchName}":
        </div>
        {
          customers.data && customers.data.length===0 ?
          <div className="mt-3" style={{ color: "var(--light-color)" }}>
            Nothing
          </div>
          :
          <div className={styles.searchResults}>
            {
              customers.data && customers.data.map((customer:any)=>{
                return <CustomerItem customer={customer} handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} />
              })
            }
            {/* <CustomerItem handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} />
            <CustomerItem handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} />
            <CustomerItem handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} /> */}
          </div>
        }
      </div>
    </>
  )
}

export default memo(Customers)
