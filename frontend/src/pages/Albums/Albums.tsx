import {memo, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom'

import styles from './Albums.module.css';
import {Container, Row, Pagination} from "react-bootstrap"

import AlbumCard from "../../components/Cards/AlbumCard/AlbumCard"
import image from "./cd.png"

function Albums() {
    // get params from url
    const [url] = useSearchParams()
    function checkIfSearched(){
        if(url.get('service')!==null)
            return 'service'
        else if( url.get('artist')!==null)
            return 'artist'
        else return false
    }
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
        {checkIfSearched() && <Row className={styles.showSearch}>
            <h4>
                Search for service "{url.get(checkIfSearched()||"")}":
            </h4>
        </Row>}
        <Container fluid className={styles.container}>
            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard> 
            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard> 
            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard> 
            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard> 

            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard> 
            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard> 
            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard> 
            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard> 
        </Container>
            {/* add pagination */}
            <Pagination className={styles.pagination}>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item >{2}</Pagination.Item>
                <Pagination.Item >{3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{6}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </>
    )
}

export default memo(Albums)