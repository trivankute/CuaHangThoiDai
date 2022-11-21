import { memo } from 'react'
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
    return (
        <>
            <Swiper
                slidesPerView={1}
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