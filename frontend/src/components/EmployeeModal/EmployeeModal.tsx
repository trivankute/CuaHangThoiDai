import { memo, useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

import styles from './EmployeeModal.module.css'
import TransactionItem from '../../components/TransactionItem/TransactionItem'

function EmployeeModal({ show, handleShow, handleClose }: { show: any, handleShow: any, handleClose: any }) {
  const [changeMode, setChangeMode] = useState(false)
  const [username, setUsername] = useState("Van")
  const [email, setEmail] = useState("blabla@gmail.com")
  const [phone, setPhone] = useState("0123456789")
  const [gender, setGender] = useState("female")
  const [birthday, setBirthday] = useState("2022-10-30")
  const [address, setAddress] = useState("Ha Noi")
  const [file, setFile] = useState({file:"", img:"https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c"})
const navigate = useNavigate();
    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                      <label style={{paddingRight:10}} htmlFor="">Username: </label>
                      {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setPhone(e.target.value) }} value={username}></input> : <>{username}</>}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Username: </label>
                    {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setPhone(e.target.value) }} value={username}></input> : <>{username}</>}
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Email: </label>
                    {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setPhone(e.target.value) }} value={email}></input> : <>{email}</>}
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Phone: </label>
                    {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setPhone(e.target.value) }} value={phone}></input> : <>{phone}</>}
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Gender: </label>
                    {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setPhone(e.target.value) }} value={gender}></input> : <>{gender}</>}
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Birthday: </label>
                    {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setPhone(e.target.value) }} value={birthday}></input> : <>{birthday}</>}
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Phone: </label>
                    {changeMode ? <input className={styles.input} type="text" onChange={(e: any) => { setPhone(e.target.value) }} value={phone}></input> : <>{phone}</>}
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>

                    <label style={{paddingRight:5}} htmlFor="">Role: </label> Customer
                  </div>
                  <div className={styles.box}>
                    <TransactionItem type="ordered online" onClick={()=>{navigate('/transactions/1',{ state:{
                      type:"order_online"
                    }})}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} total_amount={"155.000"} time={"11:22 12/12/2012"}/>
                    <TransactionItem type="ordered online" onClick={()=>{navigate('/transactions/1',{ state:{
                      type:"order_online"
                    }})}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} total_amount={"155.000"} time={"11:22 12/12/2012"}/>
                    <TransactionItem type="Picked up at store" onClick={()=>{navigate('/transactions/1',{ state:{
                      type:"pickup_at_store"
                    }})}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} total_amount={"155.000"} time={"11:22 12/12/2012"}/>
                    <TransactionItem type="Picked up at store" onClick={()=>{navigate('/transactions/1',{ state:{
                      type:"pickup_at_store"
                    }})}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} total_amount={"155.000"} time={"11:22 12/12/2012"}/>
                    <TransactionItem type="ordered online" onClick={()=>{navigate('/transactions/1',{ state:{
                      type:"order_online"
                    }})}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} total_amount={"155.000"} time={"11:22 12/12/2012"}/>
                  </div>
                  </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(EmployeeModal)
