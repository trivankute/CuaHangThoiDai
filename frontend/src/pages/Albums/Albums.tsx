import { memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'

import styles from './Albums.module.css';
import { Container, Row } from "react-bootstrap"

import AlbumCard from "../../components/Cards/AlbumCard/AlbumCard"
import { useDispatch, useSelector } from 'react-redux';
import { getAllAlbumsByPageId, getAllAlbumsByPageIdAndArtist, getAllAlbumsByPageIdAndTitle, getAllAlbumsByPageIdAndType } from '../../redux/slices/AlbumsSlice';
import { AlbumsStore } from '../../redux/selectors';
import PaginationByTotalPage from '../../components/PaginationByTotalPage/PaginationByTotalPage';

function Albums() {
    const dispatch = useDispatch<any>()
    const albums = useSelector(AlbumsStore)
    // get params from url
    const [url] = useSearchParams()
    let pageId = url.get("page")
    let serviceType = url.get("service")
    let artistId = url.get("artistId")
    let artistName = url.get("artist")
    let title = url.get("title")
    function checkIfSearched() {
        if (url.get('service') !== null)
            return 'service'
        else if (url.get('artist') !== null)
            return 'artist'
        else if (url.get('title') !== null)
            return 'title'
        else return false
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        if (title)
            dispatch(getAllAlbumsByPageIdAndTitle({ id: pageId, albumCount: 8, title: title }))
        else if (artistId)
            dispatch(getAllAlbumsByPageIdAndArtist({ id: pageId, albumCount: 8, artistId: artistId }))
        else if (serviceType)
            dispatch(getAllAlbumsByPageIdAndType({ id: pageId, albumCount: 8, type: serviceType }))
        else
            dispatch(getAllAlbumsByPageId({ id: pageId, albumCount: 8 }))
    }, [url])
    console.log(albums)
    return (
        <>
            {checkIfSearched() && <Row className={styles.showSearch}>
                <h4 style={{textTransform:"none"}}>
                    Search for "{url.get(checkIfSearched() || "")}":
                </h4>
            </Row>}
            <Container fluid className={styles.container}>
                {
                    albums.data &&
                    albums.data.map((album: any, index: any) => {
                        return (
                            <AlbumCard album_id={album.album_id} image={album.avatar} title={album.title} price={album.price} />
                        )
                    })
                }
                {
                    albums.data && albums.data.length === 0 &&
                    <>
                        Nothing
                    </>
                }
            </Container>
            {/* add pagination */}
            {
                serviceType &&
                <PaginationByTotalPage type="albumsWithSearch" currPage={pageId} basicUrl={`/products/albums?service=${serviceType}&&page=`} />
            }
            {
                artistId &&
                <PaginationByTotalPage type="albumsWithSearch" currPage={pageId} basicUrl={`/products/albums?artist=${artistName}&&artistId=${artistId}&&page=`} />
            }
            {
                title &&
                <PaginationByTotalPage type="albumsWithSearch" currPage={pageId} basicUrl={`/products/albums?title=${title}&&page=`} />
            }
            {
                pageId && !serviceType && !artistId && !title &&
                <PaginationByTotalPage type="albums" currPage={pageId} basicUrl="/products/albums?page=" />
            }

        </>
    )
}

export default memo(Albums)