import { memo, useEffect } from 'react'
import styles from './Artists.module.css'
import { Container } from "react-bootstrap"
import ArtistCard from "../../components/Cards/ArtistCard/ArtistCard"
import { useDispatch, useSelector } from 'react-redux'
import { ArtistsStore } from '../../redux/selectors'
import { getAllArtistsByPageId } from '../../redux/slices/ArtistsSlice'
import { useSearchParams } from 'react-router-dom'
import PaginationByTotalPage from '../../components/PaginationByTotalPage/PaginationByTotalPage'
function Artists() {
    const artists = useSelector(ArtistsStore)
    const dispatch = useDispatch<any>()
    // get params from url
    const [url] = useSearchParams()
    let pageId = url.get("page")
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getAllArtistsByPageId({id:pageId, artistCount:8}))
    }, [url])
    return (<>
        <Container fluid className={styles.container}>
            {
                artists.data && 
                artists.data.map((artist:any)=>{
                    return(
                        <ArtistCard id={artist.artist_id} image={artist.avatar} name={artist.name} description={artist.description}></ArtistCard>
                    )
                })
            }
        </Container>
        {/* add pagination */}
        <PaginationByTotalPage type="artists" currPage={pageId} basicUrl="/products/artists?page=" />
    </>)
}

export default memo(Artists)