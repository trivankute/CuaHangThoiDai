import { memo, useState } from 'react';

import styles from './WriteReview.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'

import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { UserStore } from '../../redux/selectors';
import { submitReview } from '../../redux/slices/ReviewSlice';
import FlashSlice from '../../redux/slices/FlashSlice';

function WriteReview({album_id, setForReload}:{album_id:string, setForReload:any}) {
    const user = useSelector(UserStore)
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");
    const dispatch = useDispatch<any>()
    function handleSubmitReview() {
        dispatch(submitReview({id:album_id, content:content, score:rating}))
            .then((res:any)=>{
                if (res.payload.status === "success") {
                    dispatch(FlashSlice.actions.handleOpen({ message: "Review submitted successfully!", type: "success" }))
                    setForReload((prev:boolean)=>!prev)
                    setContent("")
                    setRating(5)
                }
                else {
                    dispatch(FlashSlice.actions.handleOpen({ message: "Review submitted failed!", type: "danger" }))
                }

            })
    }
    return (
        <>
            <div className={styles.box}>
                <div className={styles.title}>
                    Write a Review
                </div>
                <div className={styles.writerInformation}>
                    <div className={styles.writerImage}>
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt=""></img>
                    </div>
                    <div className={styles.writerNameAndDate}>
                        <div className={styles.name}>
                            <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> by {" "}
                            {user.data&&user.data.account.username}
                        </div>
                    </div>
                </div>
                <div className={styles.form}>
                    <div className={styles.formGroup}>
                        <fieldset className={clsx("mb-3", styles.starability_basic, styles.rating)} onChange={(e: any) => { setRating(e.target.value) }}>
                            <legend style={{marginBottom:0}}>Rating:</legend>
                            <input checked={rating==1?true:false} type="radio" id="first-rate1" name="rating" value="1" />
                            <label htmlFor="first-rate1" title="Terrible">1 star</label>
                            <input checked={rating==2?true:false} type="radio" id="first-rate2" name="rating" value="2" />
                            <label htmlFor="first-rate2" title="Not good">2 stars</label>
                            <input checked={rating==3?true:false} type="radio" id="first-rate3" name="rating" value="3" />
                            <label htmlFor="first-rate3" title="Average">3 stars</label>
                            <input checked={rating==4?true:false} type="radio" id="first-rate4" name="rating" value="4" />
                            <label htmlFor="first-rate4" title="Very good">4 stars</label>
                            <input checked={rating==5?true:false} type="radio" id="first-rate5" name="rating" value="5" />
                            <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                        </fieldset>
                    </div>
                    <div className={styles.formGroup}>
                        <textarea onChange={(e)=>{setContent(e.target.value)}} className={styles.textarea} name="review" id="review" cols={30} rows={2} placeholder="Enter your review">
                            {
                                content
                            }
                        </textarea>
                    </div>
                    <div onClick={handleSubmitReview} className={styles.formGroup}>
                        <button type="submit" className="btn btn_custom">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default memo(WriteReview)