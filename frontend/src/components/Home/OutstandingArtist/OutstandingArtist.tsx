import { memo, useEffect, useState } from 'react'
import styles from "./OutstandingArtist.module.css"
import image from "./cd.png"
import ArtistCard from "../../Cards/ArtistCard/ArtistCard"

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import clsx from 'clsx'

function OutstandingArtist() {
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
                <ArtistCard image={image} name={"Trivan"} description={"rat dep trai"}/>
                </SwiperSlide>

                <SwiperSlide>
                <ArtistCard image={image} name={"Trivan"} description={"rat dep trai"}/>
                </SwiperSlide>

                <SwiperSlide>
                <ArtistCard image={image} name={"Trivan"} description={"rat dep trai"}/>
                </SwiperSlide>
            </div>
            </Swiper>
        </>
    )
}

export default memo(OutstandingArtist)