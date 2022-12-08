import { memo, useState, useEffect } from 'react';
import CustomerItem from '../../components/CustomerItem/CustomerItem'
import Header from '../../components/User/Header/Header'

import styles from "./Customers.module.css"
import { Form, Button } from 'react-bootstrap'

import Warning from '../../components/Warning/Warning'
import CustomerModal from '../../components/CustomerModal/CustomerModal';
import { useDispatch, useSelector } from 'react-redux';
import { CustomersStore } from '../../redux/selectors';
import { getCustomersByName } from '../../redux/slices/CustomersSlice';

function Customers() {
  const [isWarning, setIsWarning] = useState(false)
  const [isWarningBan, setIsWarningBan] = useState(false)
  const [seeDetail, setSeeDetail] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [customerSelected, setCustomerSelected] = useState<any>(false)
  const [forReloadPay, setForReloadPay] = useState(false)
  const [filter, setFilter] = useState("all")
  const customers = useSelector(CustomersStore)
  const dispatch = useDispatch<any>()
  function handleWarningShow(customer: any) {
    setCustomerSelected(customer);
    setIsWarning(true);
  }
  function handleWarningClose() {
    setIsWarning(false);
  }
  function handleSeeDetailShow(customer: any) {
    setCustomerSelected(customer);
    setSeeDetail(true);
  }
  function handleSeeDetailClose() {
    setSeeDetail(false);
  }
  function handleWarningBanShow(customer: any) {
    setCustomerSelected(customer);
    setIsWarningBan(true);
  }
  function handleWarningBanClose() {
    setIsWarningBan(false);
  }
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (forReloadPay) {
      if (searchName !== "")
        dispatch(getCustomersByName({
          id: 1, customerCount: 8, name: searchName
        }))
          .then(() => {
            setForReloadPay(false)
          })
      else {
        dispatch(getCustomersByName({
          id: 1, customerCount: 1000, name: searchName
        }))
          .then(() => {
            setForReloadPay(false)
          })

      }
    }

  }, [forReloadPay])

  function handleSearch() {
    if (searchName !== "")
      dispatch(getCustomersByName({
        id: 1, customerCount: 20, name: searchName
      }))
    else {
      dispatch(getCustomersByName({
        id: 1, customerCount: 1000, name: searchName
      }))
        .then(() => {
          setForReloadPay(false)
        })

    }
  }

  return (

    <>
      <div className={styles.container}>
        {
          customerSelected &&
          <>
            <Warning type="customer_ban" id={customerSelected.user_id} curState={customerSelected.state} title="Are you sure to ban/unbanned this customer" action={customerSelected.state === "banned" ? "Unban" : "Ban"} show={isWarningBan} handleClose={handleWarningBanClose} setForReloadPay={setForReloadPay} />
            <Warning type="customer" id={customerSelected.user_id} title="Are you sure to delete this customer" action="Delete" show={isWarning} handleClose={handleWarningClose} setForReloadPay={setForReloadPay} />
            <CustomerModal customer={customerSelected} show={seeDetail} handleClose={handleSeeDetailClose} />
          </>
        }
        <Header title="Manages your customers" content="Here you can manage your customers." />
        <div>
          <Form onSubmit={(e: any) => {
            e.preventDefault()
            handleSearch()
          }} className="d-flex mt-3 mb-3">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchName}
              onChange={(e: any) => {
                setSearchName(e.target.value)
              }}

            />
            <Button onClick={handleSearch} variant="outline-success">Search</Button>
          </Form>
          {/* filter */}
          <div className="d-flex justify-content-between mt-3 mb-3">
            <div className="d-flex">
              <Form.Select onChange={
                (e: any) => {
                  setFilter(e.target.value)
                }
              } style={{ cursor: "pointer" }} aria-label="Default select example" className="me-2">
                <option value="all">All</option>
                <option value="in use">In use</option>
                <option value="new">New</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <div>
          Search for "{searchName}":
        </div>
        {
          customers.data &&
          <div>
            {customers.data.length} Results
          </div>
        }
        {
          customers.data && customers.data.length === 0 ?
            <div className="mt-3" style={{ color: "var(--light-color)" }}>
              Nothing
            </div>
            :
            <div className={styles.searchResults}>
              {
                customers.data && customers.data.map((customer: any) => {
                  if (filter === "all")
                  return <CustomerItem customer={customer} handleWarningShow={handleWarningShow} handleWarningBanShow={handleWarningBanShow} handleSeeDetailShow={handleSeeDetailShow} />
                  else if (filter === "in use" && customer.state === "in use")
                  return <CustomerItem customer={customer} handleWarningShow={handleWarningShow} handleWarningBanShow={handleWarningBanShow} handleSeeDetailShow={handleSeeDetailShow} />
                  else if (filter === "new" && customer.state === "new")
                  return <CustomerItem customer={customer} handleWarningShow={handleWarningShow} handleWarningBanShow={handleWarningBanShow} handleSeeDetailShow={handleSeeDetailShow} />
                })
              }
            </div>
        }
      </div>
    </>
  )
}

export default memo(Customers)
