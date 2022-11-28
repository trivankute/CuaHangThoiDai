import { memo, useState, useEffect } from 'react'
import styles from "./OurBlogs.module.css"
import image from "./cd.png"
import BlogCard from "../../Cards/BlogCard/BlogCard"

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import clsx from 'clsx'

function OurBlogs() {
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
                <SwiperSlide>
                <BlogCard image={image} title={"Midnight 🌟"} description={"“Midnights” has reached 100 #1's on Apple Music around the world. Itʼs Taylor’s first album to reach this milestone."}/>
                </SwiperSlide>

                <SwiperSlide>
                <BlogCard image={image} title={"Midnight 🌟"} description={"“Midnights” has reached 100 #1's on Apple Music around the world. Itʼs Taylor’s first album to reach this milestone."}/>
                </SwiperSlide>

                <SwiperSlide>
                <BlogCard image={image} title={"Midnight 🌟"} description={"“Midnights” has reached 100 #1's on Apple Music around the world. Itʼs Taylor’s first album to reach this milestone."}/>
                </SwiperSlide>
            </div>
            </Swiper>
        </>
    )
}

export default memo(OurBlogs)