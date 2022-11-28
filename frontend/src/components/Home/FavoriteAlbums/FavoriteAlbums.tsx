import { memo, useEffect, useState } from 'react'
import styles from "./FavoriteAlbums.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import clsx from "clsx"
// import album Card
import AlbumCard from "../../Cards/AlbumCard/AlbumCard"

import image from "./cd.png"
function FavoriteAlbums() {
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
                <SwiperSlide style={{}}>
                    <AlbumCard image={image} title={"trivan"} price={"9.99"} rating={4.5}/>
                </SwiperSlide>
                <SwiperSlide>
                    <AlbumCard image={image} title={"trivan"} price={"9.99"} rating={4}/>
                </SwiperSlide>
                <SwiperSlide>
                    <AlbumCard image={image} title={"trivan"} price={"9.99"} rating={4}/>
                </SwiperSlide>
                <SwiperSlide>
                    <AlbumCard image={image} title={"trivan"} price={"9.99"} rating={4}/>
                </SwiperSlide>
                </div>
            </Swiper>   
        </>
    )
}

export default memo(FavoriteAlbums)