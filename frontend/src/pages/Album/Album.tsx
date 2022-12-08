import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./Album.module.css"
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
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumById } from '../../redux/slices/AlbumSlice';
import { AlbumsStore, AlbumStore, UserStore } from '../../redux/selectors';
import { getAllAlbums } from '../../redux/slices/AlbumsSlice';
import FlashSlice from '../../redux/slices/FlashSlice';
import AlbumsLoadingLogic from '../../middlewares/LoadingLogic/AlbumsLoadingLogic';
import CartSlice from '../../redux/slices/CartSlice';
import ReviewModal from '../../components/ReviewModal/ReviewModal';
function Album() {
    // get params from url
    const { albumName } = useParams();
    const dispatch = useDispatch<any>()
    const navigate = useNavigate();
    const albums = useSelector(AlbumsStore)
    const album = useSelector(AlbumStore)
    const user = useSelector(UserStore)
    const [nextAlbumId, setNextAlbumId] = useState(() => { return parseInt(albumName || "0") + 1 })
    const [prevAlbumId, setPrevAlbumId] = useState(() => { return parseInt(albumName || "0") - 1 })
    const [quantity, setQuantity] = useState(1)
    const [forReload, setForReload] = useState(false)
    const [swiperRes, setSwiperRes] = useState(() => {
        if (window.innerWidth < 700) {
            return 1;
        }
        else if (window.innerWidth < 990) {
            return 2
        }
        else return 3;
    })
    const [showAdjustReview, setShowAdjustReview] = useState(false)
    const [reviewSelected, setReviewSelected] = useState<any>(false)
    function handleShowAdjustReview(review: any) {
        setReviewSelected(review)
        setShowAdjustReview(true)
    }
    function handleCloseAdjustReview() {
        setShowAdjustReview(false)
    }

    function swiperStartpoint() {
        let result = 0;
        if (albums.data)
            albums.data.forEach((album: any, index: number) => {
                if (album.album_id === parseInt(albumName || "0")) {
                    result = index;
                }
            })
        return result
    }
    function swiperLastPoint() {
        let result = 0;
        let countdown = 5;
        if (albums.data)
            albums.data.forEach((album: any, index: number) => {
                if (index > swiperStartpoint() && countdown > 0) {
                    countdown--;
                    if (countdown === 0 || index === albums.data.length - 1)
                        result = index;
                }
            })
        return result
    }
    useEffect(() => {
        if (albumName)
            dispatch(getAlbumById(albumName))
                .then((res: any) => {
                    if (typeof (res.payload) !== 'undefined' && res.payload.status === "success") {
                        dispatch(getAllAlbums())
                            .then((res: any) => {

                            })
                    }
                    else {
                        dispatch(FlashSlice.actions.handleOpen({ message: "Album not found", type: "danger" }))
                        navigate('/notification', {
                            state: {
                                title: "Your album not found",
                                description: "Please go back to your current album",
                                state: "error",
                                btn_title: "Go back",
                                btn_path: `/products/albums/${prevAlbumId}`
                            }
                        })
                    }

                })
        setNextAlbumId(parseInt(albumName || "0") + 1)
        setPrevAlbumId(parseInt(albumName || "0") - 1)
        setQuantity(1)
    }, [albumName, forReload])
    useEffect(() => {
        window.scrollTo(0, 0)
        function handleResize() {
            if (window.innerWidth < 700) {
                setSwiperRes(1);
            }
            else if (window.innerWidth < 990) {
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
    function handleAddToCart() {
        // local storage
        dispatch(CartSlice.actions.handleAddToCart({ id: album.data.album_id, quantity: quantity, price: album.data.price, title: album.data.title, image: album.data.avatar }))
        dispatch(FlashSlice.actions.handleOpen({ message: "Added to cart", type: "success" }))
    }


    return (
        <Container fluid className={styles.container}>
            {
                reviewSelected &&
                <>
                <ReviewModal review={reviewSelected} show={showAdjustReview} handleClose={handleCloseAdjustReview} setForReloadPage={setForReload}/>
                </>
            }
            <Row className={styles.row_1}>
                <BackNavigate backPath="/products/albums" backPage="Products" currentPage="Album" />
                <Col className={styles.col_1}>
                    <div>
                        <img src={album.data.avatar} className={styles.img} alt="" />
                    </div>
                </Col>
                <Col me="auto" className={styles.col_2}>
                    {/* make element no offset */}
                    <h1 className={styles.title}>
                        {album.data.title}
                    </h1>
                    <h1 className={styles.title}>
                        Type: {album.data.album_type}
                    </h1>
                    <span className={styles.price}>
                        {album.data.price} KVND
                    </span>
                    <div className={styles.quantity}>
                        <div onClick={handleMinusQuanity} className={clsx("btn btn_custom", styles.box)}>-</div>
                        <div className={styles.box}>{quantity}</div>
                        <div onClick={handlePlusQuanity} className={clsx("btn btn_custom", styles.box)}>+</div>
                    </div>
                    <div onClick={handleAddToCart} className={clsx(styles.addToCart, "btn btn_custom")}>
                        Add to cart
                    </div>
                    <span className={styles.quantity}>
                        Quantity: {album.data.quanity}
                    </span>
                    <div className={styles.seperate}></div>
                    <div>
                        <div className={styles.des_title}>
                            Description:
                        </div>
                        <div className={styles.des_content}>
                            This is an album of {album.data.artistName}.
                        </div>
                    </div>
                    <div className={styles.pagi} >
                            <div onClick={() => { navigate(`/products/albums/${prevAlbumId}`) }} className={styles.pagi_prev}>
                                <FontAwesomeIcon className={styles.icon} icon={faArrowLeft as IconProp} />
                                Previous album</div>
                            <div onClick={() => { navigate(`/products/albums/${nextAlbumId}`) }} className={styles.pagi_next}>
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
                                    {
                                        (albums.data && albums.data.length > 0) ?
                                            <>
                                                {albums.data.slice(swiperStartpoint()+1, swiperLastPoint()+1).map((album: any, index: any) => {
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
                                                {
                                                    (albums.data && albums.data.length===0) ?
                                                    <>
                                                    There is no albums next to this album
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
                                            </>
                                    }
                                </div>
                            </Swiper>
                    </div>
                </Col>
            </Row>
            <Row className={styles.row_3}>
                {
                    (user.data && user.data.account.role === 'customer') &&
                    <div style={{ width: "100%" }}>
                        <WriteReview album_id={album.data.album_id} setForReload={setForReload}/>
                    </div>
                }
                {
                    album.data &&
                    <div style={{ width: "100%" }}>
                            <Reviews album={album} handleShowAdjustReview={handleShowAdjustReview}/>
                    </div>
                }
            </Row>
        </Container>
    )
}

export default memo(Album)