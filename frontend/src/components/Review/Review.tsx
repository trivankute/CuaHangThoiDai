import { memo, useState } from 'react';

import styles from './Review.module.css';

import CreateStars from '../../components/CreateStars/CreateStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'

import clsx from 'clsx'

function Review() {
    const [rating, setRating] = useState(5);
    return (
        <>
            <div className={styles.box}>
                <div className={styles.reviewerInformation}>
                    <div className={styles.reviewerImage}>
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt=""></img>
                    </div>
                    <div className={styles.reviewerNameAndDate}>
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
                <div className={styles.review}>
                    <div className={styles.rating}>
                    {CreateStars(5)}
                    </div>
                    <div className={styles.reviewText}>
                        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Review)