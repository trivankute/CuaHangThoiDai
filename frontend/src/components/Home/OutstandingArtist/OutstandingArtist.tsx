import { memo } from 'react'
import styles from "./OutstandingArtist.module.css"
import image from "./cd.png"
import ArtistCard from "../../Cards/ArtistCard/ArtistCard"
function OutstandingArtist() {
    return (
        <>
            <div className={styles.box_container}>
                <ArtistCard image={image} name={"Trivan"} description={"rat dep trai"}/>
                <ArtistCard image={image} name={"Trivan"} description={"rat dep trai"}/>
                <ArtistCard image={image} name={"Trivan"} description={"rat dep trai"}/>
            </div>
        </>
    )
}

export default memo(OutstandingArtist)