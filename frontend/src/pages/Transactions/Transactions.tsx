import {memo, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import styles from "./Transactions.module.css"

import TransactionItem from '../../components/TransactionItem/TransactionItem'
function Transactions() {
    const navigate = useNavigate();
    
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
    return (
        <>
            <div className={styles.container}>
              <TransactionItem type="ordered online" onClick={()=>{navigate('/transactions/1',{ state:{
                type:"order_online"
              }})}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} time={"11:22 12/12/2012"}/>
              <TransactionItem type="ordered online" onClick={()=>{navigate('/transactions/1',{ state:{
                type:"order_online"
              }})}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} time={"11:22 12/12/2012"}/>
              <TransactionItem type="Picked up at store" onClick={()=>{navigate('/transactions/1',{ state:{
                type:"pickup_at_store"
              }})}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} time={"11:22 12/12/2012"}/>
              <TransactionItem type="Picked up at store" onClick={()=>{navigate('/transactions/1',{ state:{
                type:"pickup_at_store"
              }})}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} time={"11:22 12/12/2012"}/>
              <TransactionItem type="ordered online" onClick={()=>{navigate('/transactions/1',{ state:{
                type:"order_online"
              }})}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} time={"11:22 12/12/2012"}/>
            </div>
        </>
    )
}

export default memo(Transactions)
