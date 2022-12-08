import { memo, useState, useEffect } from 'react'
import styles from "./CustomerReview.module.css"
import image from "./cd.png"
import CustomerReviewCard from '../../Cards/CustomerReviewCard/CustomerReviewCard'

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsHightScore } from '../../../redux/slices/ReviewsSlice';
import { ReviewsStore } from '../../../redux/selectors';

function CustomerReview() {
    const reviews = useSelector(ReviewsStore)
    const dispatch = useDispatch<any>()
    const [swiperRes, setSwiperRes] = useState(()=>{
        if(window.innerWidth<700)
        {
            return 1;
        }
        else if(window.innerWidth<990){ 
            return 2
        }
        else return 3;
    })
    useEffect(() => {
        function handleResize() {
            if(window.innerWidth<700)
            {
                setSwiperRes(1);
            }
            else if(window.innerWidth<990){ 
                setSwiperRes(2)
            }
            else setSwiperRes(3);
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    },[])
    useEffect(()=>{
        dispatch(getReviewsHightScore())
    },[])
    console.log(reviews)

    return (
        <>
        <Swiper
            slidesPerView={swiperRes}
            spaceBetween={30}
            pagination={{
            clickable: true,
            }}
            modules={[Pagination]}
            className={clsx("mySwiper", styles.swiper)}
            style={{padding:"20px 9%"}}
        >
            <div className={styles.box_container}>
                {
                    reviews.data && 
                    reviews.data.map((review:any, index:any)=>(
                        <SwiperSlide key={index}>
                            <CustomerReviewCard review={review}/>
                        </SwiperSlide>
                    ))
                }
                {/* <SwiperSlide>
                <CustomerReviewCard image={image} review={"tuyet voi"}  name={"Talor trivan"} rating={4}/>
                </SwiperSlide>

                <SwiperSlide>
                <CustomerReviewCard image={image} review={"tuyet voi"}  name={"Talor trivan"} rating={4}/>
                </SwiperSlide>

                <SwiperSlide>
                <CustomerReviewCard image={image} review={"tuyet voi"}  name={"Talor trivan"} rating={4}/>
                </SwiperSlide> */}
            </div>
            </Swiper>
        </>
    )
}

export default memo(CustomerReview)