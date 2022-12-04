import { memo, useEffect, useState } from 'react'
import styles from './Services.module.css'
import { Container } from "react-bootstrap"
import ServiceCard from "../../components/Cards/ServiceCard/ServiceCard"
import { useDispatch } from 'react-redux'
import { getCountByType } from '../../redux/slices/ServiceSlice'
function Services() {
    const [cdCount, setCdCount] = useState(false)
    const [vinylCount, setVinylCount] = useState(false)
    const [cassetteCount, setCassetteCount] = useState(false)
    const dispatch = useDispatch<any>()
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        dispatch(getCountByType({type:"cd"}))
        .then((res:any)=>{
            setCdCount(res.payload.count)
        }
        )
        dispatch(getCountByType({type:"vinyl"}))
        .then((res:any)=>{
            setVinylCount(res.payload.count)
        }
        )
        dispatch(getCountByType({type:"casette"}))
        .then((res:any)=>{
            setCassetteCount(res.payload.count)
        }
        )
    },[])
    return (<>
        <Container fluid className={styles.container}>
            <ServiceCard image="https://res.cloudinary.com/dotr7u5kq/image/upload/v1670052170/AlbumTypeCHTD/cd_wri1gs.jpg" title={"CD"} description={cdCount + " products"} />
            <ServiceCard image="https://res.cloudinary.com/dotr7u5kq/image/upload/v1670052161/AlbumTypeCHTD/vinyl_dnvjvp.webp" title={"Vinyl"} description={vinylCount + " products"} />
            <ServiceCard image="https://res.cloudinary.com/dotr7u5kq/image/upload/v1670052166/AlbumTypeCHTD/cassette_n1909q.jpg" title={"Cassette"} description={cassetteCount + " products"} />
        </Container>
    </>)
}

export default memo(Services)