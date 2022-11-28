import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./Album.module.css"
import image from "./cd.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import AlbumCard from "../../components/Cards/AlbumCard/AlbumCard"
import BackNavigate from "../../components/BackNavigate/BackNavigate"
import Reviews from "../../components/Reviews/Reviews"
import WriteReview from "../../components/WriteReview/WriteReview"

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination } from "swiper";

import clsx from "clsx"
function Album() {
    const [quantity, setQuantity] = useState(1)
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
        window.scrollTo(0, 0)
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
    }, [])
    function handleMinusQuanity() {
        setQuantity(prev => {
            prev--;
            if (prev < 0)
                return 0
            else return prev
        })
    }
    function handlePlusQuanity() {
        setQuantity(prev => {
            prev++;
            if (prev > 99)
                return 99;
            else return prev
        })
    }
    // get params from url
    const {service} = useParams()
    console.log(service)
    return (
        <Container fluid className={styles.container}>
            <Row className={styles.row_1}>
                <BackNavigate backPath="/products/albums" backPage="Products" currentPage="Album" />
                <Col className={styles.col_1}>
                    <div>
                        <img src={image} className={styles.img} alt="" />
                    </div>
                </Col>
                <Col me="auto" className={styles.col_2}>
                    {/* make element no offset */}
                    <h1 className={styles.title}>
                        Album
                    </h1>
                    <span className={styles.price}>
                        $12.000
                    </span>
                    <div className={styles.quantity}>
                        <div onClick={handleMinusQuanity} className={clsx("btn btn_custom", styles.box)}>-</div>
                        <div className={styles.box}>{quantity}</div>
                        <div onClick={handlePlusQuanity} className={clsx("btn btn_custom", styles.box)}>+</div>
                    </div>
                    <div className={clsx(styles.addToCart, "btn btn_custom")}>
                        Add to cart
                    </div>
                    <div className={styles.seperate}></div>
                    <div>
                        <div className={styles.des_title}>
                            Description:
                        </div>
                        <div className={styles.des_content}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                    </div>
                    <div className={styles.pagi} >
                        <div className={styles.pagi_prev}>
                            <FontAwesomeIcon className={styles.icon} icon={faArrowLeft as IconProp} />
                            Previous album</div>
                        <div className={styles.pagi_next}>
                            Next album
                            <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp} />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className={styles.row_2}>
                <Col>
                    <div>
                        <div className={styles.title}>
                            Related albums
                        </div>
                        <Swiper
                            slidesPerView={swiperRes}
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className={clsx("mySwiper", styles.swiper)}
                            style={{ padding: "20px 9%" }}
                        >
                        <div className={styles.albums_container}>
                            <SwiperSlide>
                            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard>
                            </SwiperSlide>

                            <SwiperSlide>
                            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard>
                            </SwiperSlide>

                            <SwiperSlide>
                            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard>
                            </SwiperSlide>

                            <SwiperSlide>
                            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard>
                            </SwiperSlide>
                        </div>
                        </Swiper>
                    </div>
                </Col>
            </Row>
            <Row className={styles.row_3}>
                <div style={{width:"100%"}}>
                    <WriteReview/>
                </div>
                <div style={{width:"100%"}}>
                    <Reviews/>
                </div>
            </Row>
        </Container>
    )
}

export default memo(Album)