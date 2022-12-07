import { memo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from "./Transactions.module.css"

import TransactionItem from '../../components/TransactionItem/TransactionItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionsStore, UserStore } from '../../redux/selectors';
import { getAllTransactionsByPageId, getTransactionsByEmployeePageIdAndType, getTransactionsByUserIdAndPageId, getTransactionsTotalPage } from '../../redux/slices/TransactionsSlice';
import PaginationByTotalPage from '../../components/PaginationByTotalPage/PaginationByTotalPage';
import Warning from '../../components/Warning/Warning';
function Transactions() {
  const transactions = useSelector(TransactionsStore)
  const user = useSelector(UserStore)
  const dispatch = useDispatch<any>()
  const [seeTotalPriceMode, setSeeTotalPriceMode] = useState(false)
  const [forReloadPage, setForReloadPage] = useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const [transactionSelected, setTransactionSelected] = useState<any>(false)
  const [filter, setFilter] = useState("all")
  const navigate = useNavigate();
  // get params from url
  const [url] = useSearchParams()
  let pageId = url.get("page")
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [user.loading, url])
  useEffect(() => {
    if (seeTotalPriceMode !== true) {
      if (filter === 'all') {
        if (user.data && user.data.account.role === 'customer' && pageId)
          dispatch(getTransactionsByUserIdAndPageId({
            transactionCount: 5,
            userId: user.data.user_id,
            pageId: pageId
          }))
        else if (user.data && user.data.account.role !== 'customer' && pageId) {
          dispatch(getAllTransactionsByPageId({
            id: pageId,
            transactionCount: 10
          }))
        }
      }
      else {
        if (filter === "pick_up" && user.data && user.data.account.role !== 'customer' && pageId) {
          dispatch(getTransactionsByEmployeePageIdAndType({
            id: pageId,
            transactionCount: 10,
            type: "pick_up"
          }))
        }
        else if (filter === "shipping" && user.data && user.data.account.role !== 'customer' && pageId) {
          dispatch(getTransactionsByEmployeePageIdAndType({
            id: pageId,
            transactionCount: 10,
            type: "shipping"
          }))
        }
      }
    }
    else {
      if (filter === 'all') {
        dispatch(getTransactionsTotalPage(
          { transactionCount: 10 }
          ))
          .then((res: any) => {
            if (res.payload.status === "success") {
              dispatch(getAllTransactionsByPageId({
                id: 1,
                transactionCount: res.payload.totalPage * 10
              }))
            }
          })
      }
      else {
        if (filter === "pick_up" && user.data && user.data.account.role !== 'customer') {
          dispatch(getTransactionsByEmployeePageIdAndType({
            id: 1,
            transactionCount: 10,
            type: "pick_up"
          }))
            .then((res: any) => {
              if (res.payload.status === "success") {
                dispatch(getTransactionsByEmployeePageIdAndType({
                  id: 1,
                  transactionCount: res.payload.totalPage * 10,
                  type: "pick_up"
                }))
              }
            })
        }
        else if (filter === "shipping" && user.data && user.data.account.role !== 'customer') {
          dispatch(getTransactionsByEmployeePageIdAndType({
            id: 1,
            transactionCount: 10,
            type: "shipping"
          }))
            .then((res: any) => {
              if (res.payload.status === "success") {
                dispatch(getTransactionsByEmployeePageIdAndType({
                  id: 1,
                  transactionCount: res.payload.totalPage * 10,
                  type: "shipping"
                }))
              }
            })
        }
      }
    }
  }, [user.loading, url, forReloadPage, filter, seeTotalPriceMode])
  const handleWarningClose = () => {
    setIsWarning(false)
  }
  const handleWarningOpen = (transaction: any) => {
    setTransactionSelected(transaction)
    setIsWarning(true)
  }
  return (
    <>
      <div className={styles.container}>
        {
          transactionSelected &&
          <Warning type="transaction" id={transactionSelected.transaction_id} title="Are you sure to cancel this transaction" action="delete" show={isWarning} setForReloadPay={setForReloadPage} handleClose={handleWarningClose} />
        }
        {
          seeTotalPriceMode ?
            <>
              {
                user.data && user.data.account.role !== "customer" &&
                <>
                  <Button onClick={() => {
                    setSeeTotalPriceMode(false)
                  }}>
                    <FontAwesomeIcon icon={faArrowLeft as IconProp} />
                  </Button>
                  <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex">
                      <Form.Select onChange={(e: any) => {
                        setFilter(e.target.value)
                        navigate("/user/transactions?page=1")
                      }} style={{ cursor: "pointer" }} aria-label="Default select example" className="me-2">
                        <option value="all">all</option>
                        <option value="shipping">shipping</option>
                        <option value="pick_up">pick_up</option>
                      </Form.Select>
                    </div>
                  </div>
                </>
              }
              <div className={styles.font}>
                Total transactions: {transactions.data.length}
              </div>
              <div className={styles.font}>
                Total money: {transactions.data.reduce((a: any, b: any) => a + parseInt(b.total_price), 0)} KVND
              </div>
            </>
            :
            <>
              {
                user.data && user.data.account.role !== "customer" &&
                <>
                <Button onClick={() => { setSeeTotalPriceMode(true) }}>
                  Statistics
                </Button>
                <div className="d-flex justify-content-between mt-3 mb-3">
                  <div className="d-flex">
                    <Form.Select onChange={(e: any) => {
                      setFilter(e.target.value)
                      navigate("/user/transactions?page=1")
                    }} aria-label="Default select example" className="me-2">
                      <option value="all">all</option>
                      <option value="shipping">shipping</option>
                      <option value="pick_up">pick_up</option>
                    </Form.Select>
                  </div>
                </div>
                </>
              }
              <div style={{ padding: 10 }}>

              </div>
              {
                transactions.data &&
                transactions.data.map((transaction: any, index: any) => {
                  return (
                    <TransactionItem
                      key={index}
                      transaction={transaction}
                      pageId={pageId}
                      setForReloadPage={setForReloadPage}
                      handleWarningOpen={handleWarningOpen}
                    />
                  )
                })
              }
              {/* <PaginationByTotalPage /> */}
              {
                filter === 'all' && user.data && user.data.account.role === 'customer' && transactions.data && transactions.data.length > 0 &&
                <PaginationByTotalPage type="transactions" currPage={pageId} basicUrl={`/user/transactions?page=`} />
              }
              {
                filter === 'all' && user.data && user.data.account.role !== 'customer' && transactions.data && transactions.data.length > 0 &&
                <PaginationByTotalPage type="transactions_employee" currPage={pageId} basicUrl={`/user/transactions?page=`} />
              }
              {
                filter !== 'all' && user.data && user.data.account.role !== 'customer' && !transactions.loading && transactions.data && transactions.data.length > 0 &&
                <PaginationByTotalPage type="transactions_employee_filter" currPage={pageId} basicUrl={`/user/transactions?page=`} />
              }
            </>
        }
      </div>
    </>
  )
}

export default memo(Transactions)
