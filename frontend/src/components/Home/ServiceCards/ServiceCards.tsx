import {memo} from 'react'
import styles from "./ServiceCards.module.css"
import image1 from "./cd.png"
import clsx from "clsx"
function ServiceCards() {
    return (
        <>
        <div className={(styles.box_container)}>
            <div className={styles.box}>
                <img src={image1} alt=""></img>
                <h3>CD</h3>
                <p>400 products</p>
                <a href="#" className="btn btn_custom">Shop now</a>
            </div>
            <div className={styles.box}>
                <img src={image1} alt=""></img>
                <h3>CD</h3>
                <p>400 products</p>
                <a href="#" className="btn btn_custom">Shop now</a>
            </div>
            <div className={styles.box}>
                <img src={image1} alt=""></img>
                <h3>CD</h3>
                <p>400 products</p>
                <a href="#" className="btn btn_custom">Shop now</a>
            </div>
        </div>
        </>
    )
}

export default memo(ServiceCards)