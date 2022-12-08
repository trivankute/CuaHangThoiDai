import { memo } from 'react';

import styles from './Reviews.module.css';

import Review from '../Review/Review';

function Reviews({album, handleShowAdjustReview}:{handleShowAdjustReview:any, album:any}) {
    return (
        <>
            <div className={styles.box}>
                <div className={styles.title}>
                    All reviews
                </div>
                {
                    album.data.reviews.map((review:any, index:any)=>{
                        return <Review key={index} review={review} handleShowAdjustReview={handleShowAdjustReview} />
                    })
                }
            </div>
        </>
    )
}

export default memo(Reviews)