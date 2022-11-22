import { memo, useEffect } from 'react'
import styles from './Services.module.css'
import { Container } from "react-bootstrap"
import ServiceCard from "../../components/Cards/ServiceCard/ServiceCard"
import image from "./cd.png"
function Services() {
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (<>
        <Container fluid className={styles.container}>
            <ServiceCard image={image} title="Album 1" description="Vinyl"></ServiceCard>
            <ServiceCard image={image} title="Album 1" description="Vinyl"></ServiceCard>
            <ServiceCard image={image} title="Album 1" description="Vinyl"></ServiceCard>
            <ServiceCard image={image} title="Album 1" description="Vinyl"></ServiceCard>

            <ServiceCard image={image} title="Album 1" description="Vinyl"></ServiceCard>
            <ServiceCard image={image} title="Album 1" description="Vinyl"></ServiceCard>
            <ServiceCard image={image} title="Album 1" description="Vinyl"></ServiceCard>
            <ServiceCard image={image} title="Album 1" description="Vinyl"></ServiceCard>
        </Container>
    </>)
}

export default memo(Services)