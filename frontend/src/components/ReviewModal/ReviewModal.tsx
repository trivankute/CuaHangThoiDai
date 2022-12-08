import clsx from 'clsx';
import { memo, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import FlashSlice from '../../redux/slices/FlashSlice';
import { deleteReview, updateReview } from '../../redux/slices/ReviewSlice';

import styles from './ReviewModal.module.css';

function ReviewModal({ show, handleClose, review, setForReloadPage }: { setForReloadPage: any, review: any, show: any, handleClose: any }) {
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");
    const [areYouSure, setAreYouSure] = useState(false);
    const dispatch = useDispatch<any>()
    const handleSubmitReview = () => {
        if(content!="")
        {
            if(areYouSure)
            dispatch(updateReview({
                id: review.review_id,
                score: rating,
                content: content
            }))
                .then((res: any) => {
                    if (res.payload.status === 'success') {
                        setForReloadPage((prev: boolean) => !prev)
                        handleClose()
                        dispatch(FlashSlice.actions.handleOpen({ message: "Update review successfully", type: "success" }))
                        setAreYouSure(false)
                        setRating(5)
                        setContent("")
    
                    }
                    else {
                        dispatch(FlashSlice.actions.handleOpen({ message: "Update review failed", type: "danger" }))
                        setAreYouSure(false)
                        setRating(5)
                        setContent("")
                    }
                })
            else {
                dispatch(FlashSlice.actions.handleOpen({ message: "Are you sure?", type: "danger"}))
                setAreYouSure(true)
            }
        }
        else
        {
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info"}))
        }
    }
    const handleDelete = () => {
        if(areYouSure)
        dispatch(deleteReview({
            id: review.review_id
        }))
            .then((res: any) => {
                if (res.payload.status === 'success') {
                    setForReloadPage((prev: boolean) => !prev)
                    handleClose()
                    dispatch(FlashSlice.actions.handleOpen({ message: "Delete review successfully", type: "success" }))
                    setAreYouSure(false)
                    setRating(5)
                    setContent("")
                }
                else {
                    dispatch(FlashSlice.actions.handleOpen({ message: "Delete review failed", type: "danger" }))
                    setAreYouSure(false)
                    setRating(5)
                    setContent("")
                }
            })
        else {
            dispatch(FlashSlice.actions.handleOpen({ message: "Are you sure?", type: "danger"}))
            setAreYouSure(true)
        }
    }
    return (
        <>
            <Modal size="lg" show={show} onHide={()=>{handleClose();
            setAreYouSure(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>ReviewID {review.review_id} Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className={styles.form}>
                        <div className={styles.formGroup}>
                            <textarea style={{height:200}} onChange={(e) => { setContent(e.target.value) }} className={styles.textarea} name="review" id="review" cols={30} rows={2} placeholder="Enter your review">
                                {
                                    review.content
                                }
                            </textarea>
                        </div>
                        <div className={styles.formGroup}>
                            <fieldset className={clsx("mb-3", styles.starability_basic, styles.rating)} onChange={(e: any) => { setRating(e.target.value) }}>
                                <legend style={{ marginBottom: 0 }}>Rating:</legend>
                                <input checked={review.rating == 1 ? true : false} type="radio" id="first-rate1" name="rating" value="1" />
                                <label htmlFor="first-rate1" title="Terrible">1 star</label>
                                <input checked={review.rating == 2 ? true : false} type="radio" id="first-rate2" name="rating" value="2" />
                                <label htmlFor="first-rate2" title="Not good">2 stars</label>
                                <input checked={review.rating == 3 ? true : false} type="radio" id="first-rate3" name="rating" value="3" />
                                <label htmlFor="first-rate3" title="Average">3 stars</label>
                                <input checked={review.rating == 4 ? true : false} type="radio" id="first-rate4" name="rating" value="4" />
                                <label htmlFor="first-rate4" title="Very good">4 stars</label>
                                <input checked={review.rating == 5 ? true : false} type="radio" id="first-rate5" name="rating" value="5" />
                                <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                            </fieldset>
                        </div>
                        <div onClick={handleSubmitReview} className={styles.formGroup} style={{ width: 150 }}>
                            <button type="submit" className="btn btn_custom">Adjust</button>
                        </div>
                        <Button variant="danger" className="mt-3" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{handleClose()
                    setAreYouSure(false)
                    setRating(5)
                    setContent("")
                    }}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(ReviewModal)