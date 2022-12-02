import { memo, useState } from 'react';

import styles from './Review.module.css';

import CreateStars from '../../components/CreateStars/CreateStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'

import clsx from 'clsx'

function Review({review}:{review:any}) {
    const [rating, setRating] = useState(5);
    return (
        <>
            <div className={styles.box}>
                <div className={styles.reviewerInformation}>
                    <div className={styles.reviewerImage}>
                        <img src={review.avatar} alt=""></img>
                    </div>
                    <div className={styles.reviewerNameAndDate}>
                        <div className={styles.name}>
                            <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> by {" "}
                            {review.username}
                        </div>
                        <div className={styles.date}>
                            <FontAwesomeIcon className={styles.icon} icon={faCalendar as IconProp} /> {review.time} {" "}
                            {review.date}
                        </div>
                    </div>
                </div>
                <div className={styles.review}>
                    <div className={styles.rating}>
                    {CreateStars(review.score)}
                    </div>
                    <div className={styles.reviewText}>
                        {review.content}
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Review)