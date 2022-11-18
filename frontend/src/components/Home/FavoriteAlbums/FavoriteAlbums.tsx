import { memo } from 'react'
import styles from "./FavoriteAlbums.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import image1 from "./cd.png"
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

function FavoriteAlbums() {
    return (
        <>
            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                style={{padding: "20px 9%"}}
                pagination={{
                  dynamicBullets: true,
                }}
            >
                <div className={styles.box_container}>
                <SwiperSlide>
                    <div className={styles.box}>
                        <img src={image1} alt=""></img>
                        <h3 >1989</h3>
                        <div > $6.99 </div>
                        <div className={styles.stars}>
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStarHalfAlt as IconProp} />
                        </div>
                        <button type="button" className="btn btn_custom" name="button">Add To Cart</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.box}>
                        <img src={image1} alt=""></img>
                        <h3 >1989</h3>
                        <div > $6.99 </div>
                        <div className={styles.stars}>
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStarHalfAlt as IconProp} />
                        </div>
                        <button type="button" className="btn btn_custom" name="button">Add To Cart</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.box}>
                        <img src={image1} alt=""></img>
                        <h3 >1989</h3>
                        <div > $6.99 </div>
                        <div className={styles.stars}>
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStarHalfAlt as IconProp} />
                        </div>
                        <button type="button" className="btn btn_custom" name="button">Add To Cart</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.box}>
                        <img src={image1} alt=""></img>
                        <h3 >1989</h3>
                        <div > $6.99 </div>
                        <div className={styles.stars}>
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                            <FontAwesomeIcon className={styles.icon} icon={faStarHalfAlt as IconProp} />
                        </div>
                        <button type="button" className="btn btn_custom" name="button">Add To Cart</button>
                    </div>
                </SwiperSlide>
                </div>
            </Swiper>   
        </>
    )
}

export default memo(FavoriteAlbums)