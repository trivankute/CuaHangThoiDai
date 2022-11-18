import { memo } from 'react'
import styles from "./OutstandingArtist.module.css"
import image1 from "./cd.png"
import clsx from 'clsx'
function OutstandingArtist() {
    return (
        <>
            <div className={styles.box_container}>
                <div className={styles.box}>
                    <img src={image1} alt=""></img>
                        <h3>Taylor Swift</h3>
                        <p></p>
                        <a href="#" className="btn btn_custom">shop now</a>
                </div>
                <div className={styles.box}>
                    <img src={image1} alt=""></img>
                        <h3>Taylor Swift</h3>
                        <p></p>
                        <a href="#" className="btn btn_custom">shop now</a>
                </div>
                <div className={styles.box}>
                    <img src={image1} alt=""></img>
                        <h3>Taylor Swift</h3>
                        <p></p>
                        <a href="#" className="btn btn_custom">shop now</a>
                </div>
            </div>
        </>
    )
}

export default memo(OutstandingArtist)