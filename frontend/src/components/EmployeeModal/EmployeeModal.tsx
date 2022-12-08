import { memo } from 'react'
import { Modal, Button } from 'react-bootstrap';

function EmployeeModal({ show, handleClose, employee }: {employee:any, show: any, handleClose: any }) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>EmployeeID {employee.user_id} Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Full Name: </label>
                    <>{employee.username}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Email: </label>
                    <>{employee.email}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Phone: </label>
                    <>{employee.information.phone}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Gender: </label>
                     <>{employee.information.gender}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Birthday: </label>
                    <>{employee.information.Bdate}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Address: </label>
                    <>{employee.information.address}</>
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">Role: </label>Employee
                  </div>
                  <div style={{paddingBottom:10, paddingLeft:30}}>
                    <label style={{paddingRight:5}} htmlFor="">State: </label>
                    <>{employee.state}</>
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
