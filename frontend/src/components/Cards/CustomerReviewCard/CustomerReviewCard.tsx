import { memo } from 'react';

import styles from './CustomerReviewCard.module.css';

import CreateStars from "../../CreateStars/CreateStars"

import Loading from '../../Loading/Loading'


function CustomerReviewCard({image, review, name, rating}:{image:any, review:string, name:string, rating:any}) {
    return (
        <>
            <div className={styles.box}>
            <Loading/>
                <img src={image} alt=""></img>
                <p>{review}</p>
                <h3>{name}</h3>
                <div className={styles.stars}>
                    {CreateStars(rating)}
                </div>
            </div>
        </>
    )
}

export default memo(CustomerReviewCard)