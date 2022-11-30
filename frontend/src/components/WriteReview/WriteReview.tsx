import { memo, useState } from 'react';

import styles from './WriteReview.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'

import clsx from 'clsx'

function WriteReview() {
    const [rating, setRating] = useState(5);
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
                            <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> by
                            Trivan
                        </div>
                        <div className={styles.date}>
                            <FontAwesomeIcon className={styles.icon} icon={faCalendar as IconProp} /> 1st may, 2021
                            2021-08-01
                        </div>
                    </div>
                </div>
                <div className={styles.form}>
                    <div className={styles.formGroup}>
                        <fieldset className={clsx("mb-3", styles.starability_basic, styles.rating)} onChange={(e: any) => { setRating(e.target.value) }}>
                            <legend style={{marginBottom:0}}>Rating:</legend>
                            <input type="radio" id="first-rate1" name="rating" value="1" />
                            <label htmlFor="first-rate1" title="Terrible">1 star</label>
                            <input type="radio" id="first-rate2" name="rating" value="2" />
                            <label htmlFor="first-rate2" title="Not good">2 stars</label>
                            <input type="radio" id="first-rate3" name="rating" value="3" />
                            <label htmlFor="first-rate3" title="Average">3 stars</label>
                            <input type="radio" id="first-rate4" name="rating" value="4" />
                            <label htmlFor="first-rate4" title="Very good">4 stars</label>
                            <input type="radio" id="first-rate5" name="rating" value="5" checked />
                            <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                        </fieldset>
                    </div>
                    <div className={styles.formGroup}>
                        <textarea className={styles.textarea} name="review" id="review" cols={30} rows={2} placeholder="Enter your review"></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <button type="submit" className="btn btn_custom">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default memo(WriteReview)