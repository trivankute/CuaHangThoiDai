import {memo} from 'react';
import styles from './Warning.module.css'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlbum } from '../../redux/slices/AlbumSlice';
import FlashSlice from '../../redux/slices/FlashSlice';
import { AlbumStore } from '../../redux/selectors';
import Loading from '../Loading/Loading';
import { cancelShippingTransaction } from '../../redux/slices/TransactionSlice';
import { deleteCustomerById, updateCustomerStateById } from '../../redux/slices/CustomersSlice';
import { deleteEmployeeById, updateEmployeeStateById } from '../../redux/slices/EmployeesSlice';

function Warning({curState, show, handleClose, title, action, type, id, setForReloadPay}:{curState?:any, show:any, handleClose:any, title:any, action:any, type:any, id:any, setForReloadPay?:any}) {
  const dispatch = useDispatch<any>()
  const album = useSelector(AlbumStore)
  console.log(id)
  function handleDelete(){
    if(type==="employee")
    {
      dispatch(deleteEmployeeById({id:id}))
      .then((res:any)=>{
        if(res.payload.status === 'success'){
          setForReloadPay((prev:boolean)=>!prev)
          handleClose()
        }
      })
    }
    else if(type==="employee_ban")
    {
      if(curState==="banned")
      dispatch(updateEmployeeStateById({
        id:id,
        state:"in use"
      }))
      .then((res:any)=>{
        if(res.payload.status === 'success'){
          setForReloadPay((prev:boolean)=>!prev)
          handleClose()
        }
      })
      else {
        dispatch(updateEmployeeStateById({
          id:id,
          state:"banned"
        }))
        .then((res:any)=>{
          if(res.payload.status === 'success'){
            setForReloadPay((prev:boolean)=>!prev)
            handleClose()
          }
        })
      }
    }
    else if(type==="customer_ban")
    {
      if(curState==="banned")
      dispatch(updateCustomerStateById({
        id:id,
        state:"in use"
      }))
      .then((res:any)=>{
        if(res.payload.status === 'success'){
          setForReloadPay((prev:boolean)=>!prev)
          handleClose()
        }
      })
      else {
        dispatch(updateCustomerStateById({
          id:id,
          state:"banned"
        }))
        .then((res:any)=>{
          if(res.payload.status === 'success'){
            setForReloadPay((prev:boolean)=>!prev)
            handleClose()
          }
        })
      }
    }
    else if(type==="transaction")
    {
      dispatch(cancelShippingTransaction({
        id:id
      }))
      .then((res:any)=>{
        if(res.payload.status === 'success'){
          setForReloadPay((prev:boolean)=>!prev)
          handleClose()
        }
      })
    }
    else if(type==='customer')
    {
      dispatch(deleteCustomerById({id:id}))
      .then((res:any)=>{
        if(res.payload.status === 'success'){
          setForReloadPay((prev:boolean)=>!prev)
          handleClose()
        }
      })
    }
    else if(type==='album')
      {
        dispatch(deleteAlbum({id:id}))
        .then((res:any)=>{
          if(res.payload.status==='success')
          {
            setForReloadPay(true)
            dispatch(FlashSlice.actions.handleOpen({ message:"Album deleted successfully", type:"success" }))
            handleClose()
          }
          else
          {
            dispatch(FlashSlice.actions.handleOpen({ message:"Album delete failed", type:"danger" }))
          }
        })
      }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>You cannot undo this action</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  className={styles.save} onClick={handleDelete} >
            {
              type==="album" && album.loading &&
              <Loading small/>
            }
            {action}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default memo(Warning)
