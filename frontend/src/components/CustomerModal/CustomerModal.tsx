import { memo, useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

import styles from './CustomerModal.module.css'
import TransactionItem from '../../components/TransactionItem/TransactionItem'

function CustomerModal({ show, handleShow, handleClose, customer }: { customer:any, show: any, handleShow: any, handleClose: any }) {
    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Full Name: </label>
                    <>{customer.username}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Email: </label>
                    <>{customer.email}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Phone: </label>
                    <>{customer.information.phone}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Gender: </label>
                     <>{customer.information.gender}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Birthday: </label>
                    <>{customer.information.Bdate}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Address: </label>
                    <>{customer.information.address}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Role: </label> Customer
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">State: </label>
                    <>{customer.state}</>
                  </div>
                  <div className={styles.box}>
                    {/* <TransactionItem type="ordered online" onClick={()=>{navigate('/transactions/1',{ state:{
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
                    }})}} state={"on the go"} transaction_id={"1212121"} delivery_parner={"Grab"} total_amount={"155.000"} time={"11:22 12/12/2012"}/> */}
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

export default memo(CustomerModal)
