import {memo} from 'react'
import styles from "./ServiceCards.module.css"
import image from "./cd.png"
import ServiceCard from '../../Cards/ServiceCard/ServiceCard'
function ServiceCards() {
    return (
        <>
        <div className={(styles.box_container)}>
            <ServiceCard image={image} title={"CD"} description={"400 products"}/>
            <ServiceCard image={image} title={"CD"} description={"400 products"}/>
        </div>
        </>
    )
}

export default memo(ServiceCards)