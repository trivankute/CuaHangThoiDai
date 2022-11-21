import { memo } from 'react'
import styles from "./CustomerReview.module.css"
import image from "./cd.png"
import CustomerReviewCard from '../../Cards/CustomerReviewCard/CustomerReviewCard'
function CustomerReview() {
    return (
        <>
            <div className={styles.box_container}>
                <CustomerReviewCard image={image} review={"tuyet voi"}  name={"Talor trivan"} rating={4}/>
                <CustomerReviewCard image={image} review={"tuyet voi"}  name={"Talor trivan"} rating={4}/>
                <CustomerReviewCard image={image} review={"tuyet voi"}  name={"Talor trivan"} rating={4}/>
            </div>
        </>
    )
}

export default memo(CustomerReview)