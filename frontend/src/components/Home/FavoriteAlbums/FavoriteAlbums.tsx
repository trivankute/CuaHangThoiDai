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
import { useDispatch, useSelector } from 'react-redux';
import { getAllAlbums } from '../../../redux/slices/AlbumsSlice';
import { AlbumsStore } from '../../../redux/selectors';
import AlbumsLoadingLogic from '../../../middlewares/LoadingLogic/AlbumsLoadingLogic';
function FavoriteAlbums() {
    const albums = useSelector(AlbumsStore)
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
        dispatch(getAllAlbums())
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
                {/* .map 4 first albums of albums.data */}
                    {
                        albums.data ?
                        <>
                        {albums.data.slice(0,4).map((album:any,index:any)=>{
                            return (
                                <SwiperSlide key={index}>
                                    <AlbumsLoadingLogic>
                                    <AlbumCard album_id={album.album_id} image={album.avatar} title={album.title} price={album.price} />
                                    </AlbumsLoadingLogic>
                                </SwiperSlide>
                            )
                        })}
                        </>
                        :
                        <>
                        <SwiperSlide>
                            <AlbumsLoadingLogic>
                            </AlbumsLoadingLogic>
                        </SwiperSlide>
                        <SwiperSlide>
                            <AlbumsLoadingLogic>
                            </AlbumsLoadingLogic>
                        </SwiperSlide>
                        <SwiperSlide>
                            <AlbumsLoadingLogic>
                            </AlbumsLoadingLogic>
                        </SwiperSlide>
                        <SwiperSlide>
                            <AlbumsLoadingLogic>
                            </AlbumsLoadingLogic>
                        </SwiperSlide>
                        </>
                    }
                </div>
            </Swiper>   
        </>
    )
}

export default memo(FavoriteAlbums)