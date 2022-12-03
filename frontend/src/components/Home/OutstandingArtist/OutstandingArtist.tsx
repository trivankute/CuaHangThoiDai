import { memo, useEffect, useState } from 'react'
import styles from "./OutstandingArtist.module.css"
import ArtistCard from "../../Cards/ArtistCard/ArtistCard"

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { getAllArtists } from '../../../redux/slices/ArtistsSlice';
import { ArtistsStore } from '../../../redux/selectors';

function OutstandingArtist() {
    const dispatch = useDispatch<any>()
    const artists = useSelector(ArtistsStore)
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
        dispatch(getAllArtists())
            .then((res:any)=>{
                console.log(res)

            })
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
                {
                    artists.data && artists.data.slice(0,5).map((artist:any, index:number)=>(
                        <SwiperSlide key={index}>
                            <ArtistCard image={artist.avatar} name={artist.name} description="Super famous"/>
                        </SwiperSlide>
                    ))
                }
            </div>
            </Swiper>
        </>
    )
}

export default memo(OutstandingArtist)