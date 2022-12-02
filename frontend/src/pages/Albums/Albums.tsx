import { memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'

import styles from './Albums.module.css';
import { Container, Row } from "react-bootstrap"

import AlbumCard from "../../components/Cards/AlbumCard/AlbumCard"
import { useDispatch, useSelector } from 'react-redux';
import { getAllAlbumsByPageId } from '../../redux/slices/AlbumsSlice';
import { AlbumsStore } from '../../redux/selectors';
import PaginationByTotalPage from '../../components/PaginationByTotalPage/PaginationByTotalPage';

function Albums() {
    const dispatch = useDispatch<any>()
    const albums = useSelector(AlbumsStore)
    // get params from url
    const [url] = useSearchParams()
    let pageId = url.get("page")
    function checkIfSearched() {
        if (url.get('service') !== null)
            return 'service'
        else if (url.get('artist') !== null)
            return 'artist'
        else return false
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        if (pageId)
            dispatch(getAllAlbumsByPageId({ id: pageId, albumCount: 8 }))
                .then((res: any) => {
                    
                })
    }, [pageId])

    return (
        <>
            {checkIfSearched() && <Row className={styles.showSearch}>
                <h4>
                    Search for service "{url.get(checkIfSearched() || "")}":
                </h4>
            </Row>}
            <Container fluid className={styles.container}>
                {
                    albums.data &&
                    albums.data.map((album: any, index: any) => {
                        return (
                            <AlbumCard album_id={album.album_id} image={album.avatar} title={album.title} price={album.price} />
                        )
                    })}
            </Container>
            {/* add pagination */}
            <PaginationByTotalPage currPage={pageId} basicUrl="/products/albums?page=" />

        </>
    )
}

export default memo(Albums)