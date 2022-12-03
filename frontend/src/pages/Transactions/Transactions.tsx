import { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from "./Transactions.module.css"

import TransactionItem from '../../components/TransactionItem/TransactionItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionsStore, UserStore } from '../../redux/selectors';
import { getTransactionsByUserIdAndPageId } from '../../redux/slices/TransactionsSlice';
function Transactions() {
  const transactions = useSelector(TransactionsStore)
  const user = useSelector(UserStore)
  const dispatch = useDispatch<any>()
  const [seeTotalPriceMode, setSeeTotalPriceMode] = useState(false)
  const navigate = useNavigate();
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
    if(user.data)
    dispatch(getTransactionsByUserIdAndPageId({
      transactionCount: 8,
      userId: user.data.user_id,
      pageId: 1
    }))
  }, [user.loading])
  console.log(transactions)
  return (
    <>
      <div className={styles.container}>
        {
          seeTotalPriceMode ?
            <>
              <Button onClick={() => {
                setSeeTotalPriceMode(false)
              }}>
                <FontAwesomeIcon icon={faArrowLeft as IconProp}/>
              </Button>
              <div className="d-flex justify-content-between mt-3">
                        <div className="d-flex">
                            <Form.Select style={{cursor:"pointer"}} aria-label="Default select example" className="me-2">
                                <option>Sort by state</option>
                                <option value="1">In used</option>
                                <option value="2">Not in used</option>
                            </Form.Select>
                        </div>
                    </div>
              <div style={{padding:10}}>

              </div>
              <div className={styles.font}>
                From 10/10/2022 to 30/10/2022
              </div>
              <div className={styles.font}>
                Total transactions: 3
              </div>
              <div className={styles.font}>
                Total money: 3.000.000d
              </div>
            </>
            :
            <>
              <Button onClick={()=>{setSeeTotalPriceMode(true)}}>
                Statistics
              </Button>
              <div className="d-flex justify-content-between mt-3 mb-3">
                        <div className="d-flex">
                            <Form.Select aria-label="Default select example" className="me-2">
                                <option>Sort by state</option>
                                <option value="1">In used</option>
                                <option value="2">Not in used</option>
                            </Form.Select>
                        </div>
                    </div>
              <div style={{padding:10}}>

              </div>
              {
                transactions.data &&
                transactions.data.map((transaction:any, index:any) => {
                  return (
                    <TransactionItem
                      key={index}
                      transaction={transaction}
                    />
                  )
                })
              }
              {/* <TransactionItem total_amount={"123.000"} type="ordered online" onClick={() => {
                navigate('/transactions/1', {
                  state: {
                    type: "order_online"
                  }
                })
              }} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} time={"11:22 12/12/2012"} />
              <TransactionItem total_amount={"123.000"} type="ordered online" onClick={() => {
                navigate('/transactions/1', {
                  state: {
                    type: "order_online"
                  }
                })
              }} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} time={"11:22 12/12/2012"} />
              <TransactionItem total_amount={"123.000"} type="Picked up at store" onClick={() => {
                navigate('/transactions/1', {
                  state: {
                    type: "pickup_at_store"
                  }
                })
              }} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} time={"11:22 12/12/2012"} />
              <TransactionItem total_amount={"123.000"} type="Picked up at store" onClick={() => {
                navigate('/transactions/1', {
                  state: {
                    type: "pickup_at_store"
                  }
                })
              }} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} time={"11:22 12/12/2012"} />
              <TransactionItem total_amount={"123.000"} type="ordered online" onClick={() => {
                navigate('/transactions/1', {
                  state: {
                    type: "order_online"
                  }
                })
              }} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} time={"11:22 12/12/2012"} /> */}
            </>
        }
      </div>
    </>
  )
}

export default memo(Transactions)
