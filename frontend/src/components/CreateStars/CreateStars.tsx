import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'

import styles from "./CreateStars.module.css"

function CreateStars(rating:number) {
    let stars = [];

    for (let i = 0; i < Math.floor(rating); i++) {
        stars.push(<FontAwesomeIcon className={styles.icon} icon={faStar as IconProp} />);
    }
    if (rating % 1 !== 0) {
        stars.push(<FontAwesomeIcon className={styles.icon} icon={faStarHalfAlt as IconProp} />);
    }
    return stars;
}

export default CreateStars;