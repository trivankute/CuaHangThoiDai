import { memo, useState, useEffect } from 'react';

import styles from "./Employees.module.css"

import Header from '../../components/User/Header/Header'
import Warning from '../../components/Warning/Warning'

import { Form, Button } from 'react-bootstrap'
import RegisterButtonAndModal from '../../components/RegisterButtonAndModal/RegisterButtonAndModal';
import clsx from 'clsx';
import EmployeeItem from '../../components/EmployeeItem/EmployeeItem';
import EmployeeModal from '../../components/EmployeeModal/EmployeeModal';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeesStore } from '../../redux/selectors';
import { getEmployeesByName } from '../../redux/slices/EmployeesSlice';
function Employees() {
  const employees = useSelector(EmployeesStore)
  const dispatch = useDispatch<any>()
  const [isWarningBan, setIsWarningBan] = useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [seeDetail, setSeeDetail] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [forReloadPay, setForReloadPay] = useState(false)
  const [employeeSelected, setEmployeeSelected] = useState<any>(false)
  const [filter, setFilter] = useState("all")

  function handleSeeDetailShow(employee: any) {
    setEmployeeSelected(employee);
    setSeeDetail(true);
  }
  function handleSeeDetailClose() {
    setSeeDetail(false);
  }
  function handleWarningShow(employee: any) {
    setEmployeeSelected(employee);
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
  function handleWarningBanShow(employee: any) {
    setEmployeeSelected(employee);
    setIsWarningBan(true);
  }
  function handleWarningBanClose() {
    setIsWarningBan(false);
  }

  function handleSearch() {
    if(searchName!=="")
    dispatch(getEmployeesByName({
      id: 1, employeeCount: 20, name: searchName
    }))
    else {
      dispatch(getEmployeesByName({
        id: 1,
        employeeCount: 1000,
        name: ""
      }))
    }
  }
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if(searchName!=="")
    dispatch(getEmployeesByName({
      id: 1,
      employeeCount: 20,
      name: searchName
    }))
    else {
      dispatch(getEmployeesByName({
        id: 1,
        employeeCount: 1000,
        name: ""
      }))
    }
  }, [forReloadPay, filter])
  return (
    <>
      <div className={styles.container}>
        {
          employeeSelected &&
          <>
            <Warning type="employee_ban" id={employeeSelected.user_id} curState={employeeSelected.state} title="Are you sure to ban/unbanned this employee" action={employeeSelected.state === "banned" ? "Unban" : "Ban"} show={isWarningBan} handleClose={handleWarningBanClose} setForReloadPay={setForReloadPay} />
            <Warning type="employee" id={employeeSelected.user_id} title="Are you sure to delete this employee" action="delete" show={isWarning} handleClose={handleWarningClose} setForReloadPay={setForReloadPay}/>
            <EmployeeModal employee={employeeSelected} show={seeDetail} handleClose={handleSeeDetailClose} />
          </>
        }
        <Header title="Manages your employee" content="Here you can manage your employees." />
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
        </div>
        <div className="d-flex justify-content-between">
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
                <option value="banned">Banned</option>
              </Form.Select>
            </div>
          </div>
          <RegisterButtonAndModal type="employee" linkStyle={clsx("btn btn_custom", styles.register_btn)}
            showRegister={showRegister} handleShowRegister={handleShowRegister}
            handleCloseRegister={handleCloseRegister}
          />
        </div>
        <div>
          Search for "{searchName}":
        </div>
        {
          employees.data &&
          <div>
            {employees.data.length} Results
          </div>
        }
        {
          employees.data && employees.data.length === 0 ?
            <div className="mt-3" style={{ color: "var(--light-color)" }}>
              Nothing
            </div>
            :
            <div className={styles.searchResults}>
              {
                employees.data && employees.data.map((employee: any, index: any) => {
                  if(filter==="all")
                  return (
                    <EmployeeItem key={index} employee={employee} handleWarningBanShow={handleWarningBanShow} handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} />
                  )
                  else if(employee.state===filter)
                  return (
                    <EmployeeItem key={index} employee={employee} handleWarningBanShow={handleWarningBanShow} handleWarningShow={handleWarningShow} handleSeeDetailShow={handleSeeDetailShow} />
                  )
                })
              }
            </div>
        }

      </div>
    </>
  )
}

export default memo(Employees)
