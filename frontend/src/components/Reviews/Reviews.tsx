import { memo } from 'react';
import {Pagination} from 'react-bootstrap'

import styles from './Reviews.module.css';

import Review from '../Review/Review';

function Reviews({album}:{album:any}) {
    return (
        <>
            <div className={styles.box}>
                <div className={styles.title}>
                    All reviews
                </div>
                {
                    album.data.reviews.map((review:any, index:any)=>{
                        return <Review key={index} review={review} />
                    })
                }

                <Pagination className={styles.pagination}>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Item >{2}</Pagination.Item>
                    <Pagination.Item >{3}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item>{6}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        </>
    )
}

export default memo(Reviews)