import {memo} from 'react';

import styles from './Albums.module.css';
import {Container, Pagination} from "react-bootstrap"

import AlbumCard from "../../components/Cards/AlbumCard/AlbumCard"
import image from "./cd.png"

function Albums() {
    return (
        <>
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