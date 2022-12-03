import { memo } from 'react';

import styles from './CustomerReviewCard.module.css';

import CreateStars from "../../CreateStars/CreateStars"

function CustomerReviewCard({review}:{review:any}) {
    return (
        <>
            <div className={styles.box}>
                <img src={review.avatar} alt=""></img>
                <p>{review.content}</p>
                <h3>{review.username}</h3>
                <div className={styles.stars}>
                    {CreateStars(review.score)}
                </div>
                <p>to album: {review.album.title}</p>
            </div>
        </>
    )
}

export default memo(CustomerReviewCard)