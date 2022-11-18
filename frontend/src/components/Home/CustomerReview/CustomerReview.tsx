import { memo } from 'react'
import styles from "./CustomerReview.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import image1 from "./cd.png"
function CustomerReview() {
    return (
        <>
            <div className={styles.box_container}>
                <div className={styles.box}>
                    <img src={image1} alt=""></img>
                        <p>asdf</p>
                        <h3>Taylor Swift</h3>
                    <div className={styles.stars}>
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStarHalfAlt as IconProp} />
                    </div>
                </div>
                <div className={styles.box}>
                    <img src={image1} alt=""></img>
                        <p>fda</p>
                        <h3>Taylor Swift</h3>
                    <div className={styles.stars}>
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStarHalfAlt as IconProp} />
                    </div>
                </div>
                <div className={styles.box}>
                    <img src={image1} alt=""></img>
                        <p>asdf</p>
                        <h3>Taylor Swift</h3>
                    <div className={styles.stars}>
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />
                        <FontAwesomeIcon className={styles.icon} icon={faStarHalfAlt as IconProp} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(CustomerReview)