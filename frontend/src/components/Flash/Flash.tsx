import {useEffect} from 'react'
import {Toast} from 'react-bootstrap'
import {FlashStore} from '../../redux/selectors'
import {useDispatch, useSelector} from 'react-redux'
import FlashSlice from "../../redux/slices/FlashSlice"

export default function FlashBox()
{
    const dispatch = useDispatch()
    const flash = useSelector(FlashStore)
    // handle close after 5s
    useEffect(() => {
        if(flash.flashOpen)
        {
            setTimeout(() => {
                dispatch(FlashSlice.actions.handleClose(""))
            }, 5000);
        }
    }, [flash.flashOpen])
    return (
        <>
        {flash.flashOpen && 
        <div style={{display:'flex', justifyContent: 'center', position:'fixed',
        zIndex:"9999", top:'10px', left:'50%', transform:'translateX(-50%)'}}>

        <Toast onClose = {()=>{dispatch(FlashSlice.actions.handleClose(""))}}
          className="d-inline-block m-1"
          bg={flash.flashType}
          style={{maxWidth:350, filter:"brightness(1.4)"}}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>
            {flash.flashMessage}
          </Toast.Body>
        </Toast>
       </div>
        }

        </>
    )
}