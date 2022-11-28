import { memo, useEffect } from 'react'
import styles from './Artists.module.css'
import { Container } from "react-bootstrap"
import ArtistCard from "../../components/Cards/ArtistCard/ArtistCard"
import image from "./cd.png"
function Artists() {
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (<>
        <Container fluid className={styles.container}>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>

            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
        </Container>
    </>)
}

export default memo(Artists)