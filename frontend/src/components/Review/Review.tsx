import { memo, useState } from 'react';

import styles from './Review.module.css';

import CreateStars from '../../components/CreateStars/CreateStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar, faWrench, faTrash } from '@fortawesome/free-solid-svg-icons'

import clsx from 'clsx'
import { useSelector } from 'react-redux';
import { UserStore } from '../../redux/selectors';

function Review({review, handleShowAdjustReview}:{handleShowAdjustReview:any, review:any}) {
    const user = useSelector(UserStore)
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
                    {
                        user.data && user.data.account.role!=="customer" &&
                        <>
                        <FontAwesomeIcon onClick={()=>{handleShowAdjustReview(review)}} className={clsx(styles.icon, styles.icon_wrench, "ms-auto")} icon={faWrench as IconProp} />
                        </>
                    }
                    
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