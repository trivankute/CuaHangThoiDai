import { memo, useEffect } from 'react'
import styles from './Artists.module.css'
import { Container } from "react-bootstrap"
import ArtistCard from "../../components/Cards/ArtistCard/ArtistCard"
import image from "./cd.png"
import { useDispatch, useSelector } from 'react-redux'
import { ArtistsStore } from '../../redux/selectors'
import { getAllArtists } from '../../redux/slices/ArtistsSlice'
function Artists() {
    const artists = useSelector(ArtistsStore)
    const dispatch = useDispatch<any>()
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getAllArtists())
    }, [])
    return (<>
        <Container fluid className={styles.container}>
            {/* <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>

            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard>
            <ArtistCard image={image} name="trivan" description="hi"></ArtistCard> */}
            {
                artists.data && 
                artists.data.slice(0,8).map((artist:any)=>{
                    return(
                        <ArtistCard image={artist.avatar} name={artist.name} description={artist.description}></ArtistCard>
                    )
                })
            }
        </Container>
    </>)
}

export default memo(Artists)