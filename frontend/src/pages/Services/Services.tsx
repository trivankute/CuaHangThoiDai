import { memo, useEffect } from 'react'
import styles from './Services.module.css'
import { Container } from "react-bootstrap"
import ServiceCard from "../../components/Cards/ServiceCard/ServiceCard"
function Services() {
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (<>
        <Container fluid className={styles.container}>
            <ServiceCard image="https://res.cloudinary.com/dotr7u5kq/image/upload/v1670052170/AlbumTypeCHTD/cd_wri1gs.jpg" title={"CD"} description={"400 products"} />
            <ServiceCard image="https://res.cloudinary.com/dotr7u5kq/image/upload/v1670052161/AlbumTypeCHTD/vinyl_dnvjvp.webp" title={"Vinyl"} description={"400 products"} />
            <ServiceCard image="https://res.cloudinary.com/dotr7u5kq/image/upload/v1670052166/AlbumTypeCHTD/cassette_n1909q.jpg" title={"Cassette"} description={"400 products"} />
        </Container>
    </>)
}

export default memo(Services)