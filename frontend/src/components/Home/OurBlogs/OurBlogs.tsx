import { memo, useState, useEffect } from 'react'
import styles from "./OurBlogs.module.css"
import BlogCard from "../../Cards/BlogCard/BlogCard"

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { BlogsStore } from '../../../redux/selectors';
import { getAllBlogsByPageId } from '../../../redux/slices/BlogsSlice';

function OurBlogs() {
    const blogs = useSelector(BlogsStore)
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
        dispatch(getAllBlogsByPageId({id:1, blogCount:5}))
        
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
                    blogs.data &&
                    <>
                        {blogs.data.map((blog:any, index:any)=>{
                            return(
                                <SwiperSlide>
                                    <BlogCard blog={blog} />
                                </SwiperSlide>
                            )
                        })}
                    </>
                }
            </div>
            </Swiper>
        </>
    )
}

export default memo(OurBlogs)