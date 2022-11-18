import { memo } from 'react'
import styles from "./OurBlogs.module.css"
import image1 from "./cd.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar} from '@fortawesome/free-solid-svg-icons'

function OurBlogs() {
    return (
        <>
            <div className={styles.box_container}>
                <div className={styles.box}>
                    <img src={image1} alt=""></img>
                        <div className={styles.content}>
                            <div className={styles.icons}>
                                <a href="#"> 
                        <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> by user </a>
                                <a href="#"> 
                        <FontAwesomeIcon className={styles.icon} icon={faCalendar as IconProp} /> 1st may, 2021 </a>
                            </div>
                            <h3>Midnight 🌟</h3>
                            <p>“Midnights” has reached 100 #1's on Apple Music around the world. Itʼs Taylor’s first album to reach this milestone.</p>
                            <a href="#" className="btn btn_custom">read more</a>
                        </div>
                </div>
                <div className={styles.box}>
                    <img src={image1} alt=""></img>
                        <div className={styles.content}>
                            <div className={styles.icons}>
                                <a href="#"> 
                        <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> by user </a>
                                <a href="#"> 
                        <FontAwesomeIcon className={styles.icon} icon={faCalendar as IconProp} /> 1st may, 2021 </a>
                            </div>
                            <h3>Midnight 🌟</h3>
                            <p>“Midnights” has reached 100 #1's on Apple Music around the world. Itʼs Taylor’s first album to reach this milestone.</p>
                            <a href="#" className="btn btn_custom">read more</a>
                        </div>
                </div>
                <div className={styles.box}>
                    <img src={image1} alt=""></img>
                        <div className={styles.content}>
                            <div className={styles.icons}>
                                <a href="#"> 
                        <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} /> by user </a>
                                <a href="#"> 
                        <FontAwesomeIcon className={styles.icon} icon={faCalendar as IconProp} /> 1st may, 2021 </a>
                            </div>
                            <h3>Midnight 🌟</h3>
                            <p>“Midnights” has reached 100 #1's on Apple Music around the world. Itʼs Taylor’s first album to reach this milestone.</p>
                            <a href="#" className="btn btn_custom">read more</a>
                        </div>
                </div>
            </div>
        </>
    )
}

export default memo(OurBlogs)