import {memo, useState, useEffect} from 'react'
import styles from "./ServiceCards.module.css"
import ServiceCard from '../../Cards/ServiceCard/ServiceCard'

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import clsx from 'clsx'
import { useDispatch } from 'react-redux';
import { getCountByType } from '../../../redux/slices/ServiceSlice';
function ServiceCards() {
    const [cdCount, setCdCount] = useState(false)
    const [vinylCount, setVinylCount] = useState(false)
    const [cassetteCount, setCassetteCount] = useState(false)
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
    useEffect(() => {
        dispatch(getCountByType({type:"cd"}))
        .then((res:any)=>{
            setCdCount(res.payload.count)
        }
        )
        dispatch(getCountByType({type:"vinyl"}))
        .then((res:any)=>{
            setVinylCount(res.payload.count)
        }
        )
        dispatch(getCountByType({type:"cassette"}))
        .then((res:any)=>{
            setCassetteCount(res.payload.count)
        }
        )
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
        <div className={(styles.box_container)}>
                <SwiperSlide>
                <ServiceCard image="https://res.cloudinary.com/dotr7u5kq/image/upload/v1670052170/AlbumTypeCHTD/cd_wri1gs.jpg" title={"CD"} description={cdCount + " products"}/>
                </SwiperSlide>

                <SwiperSlide>
                <ServiceCard image="https://res.cloudinary.com/dotr7u5kq/image/upload/v1670052161/AlbumTypeCHTD/vinyl_dnvjvp.webp" title={"Vinyl"} description={vinylCount + " products"}/>
                </SwiperSlide>

                <SwiperSlide>
                <ServiceCard image="https://res.cloudinary.com/dotr7u5kq/image/upload/v1670052166/AlbumTypeCHTD/cassette_n1909q.jpg" title={"Cassette"} description={cassetteCount + " products"}/>
                </SwiperSlide>
        </div>
            </Swiper>
        </>
    )
}

export default memo(ServiceCards)