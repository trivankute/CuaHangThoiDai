import { memo, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./Album.module.css"
import image from "./cd.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import AlbumCard from "../../components/Cards/AlbumCard/AlbumCard"
import clsx from "clsx"
function Album() {
    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    function handleMinusQuanity() {
        setQuantity(prev=>{
            prev--;
            if(prev<0)
            return 0
            else return prev
        })
    }
    function handlePlusQuanity() {
        setQuantity(prev=>{
            prev++;
            if(prev>99)
            return 99;
            else return prev
        })
    }
    return (
        <Container fluid className={styles.container}>
            <Row className={styles.row_1}>
                <Col className={styles.col_1}>
                    <div>
                        <img src={image} className={styles.img} alt="" />
                    </div>
                </Col>
                <Col me="auto" className={styles.col_2}>
                    {/* make element no offset */}
                    <h1 className={styles.title}>
                        Album
                    </h1>
                    <span className={styles.price}>
                        $12.000
                    </span>
                    <div className={styles.quantity}>
                        <div onClick={handleMinusQuanity} className={clsx("btn btn_custom", styles.box)}>-</div>
                        <div className={styles.box}>{quantity}</div>
                        <div onClick={handlePlusQuanity} className={clsx("btn btn_custom", styles.box)}>+</div>
                    </div>
                    <div className={clsx(styles.addToCart, "btn btn_custom")}>
                        Add to cart
                    </div>
                    <div className={styles.seperate}></div>
                    <div>
                        <div className={styles.des_title}>
                            Description:
                        </div>
                        <div className={styles.des_content}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                    </div>
                    <div className={styles.pagi} >
                        <div className={styles.pagi_prev}>
                            <FontAwesomeIcon className={styles.icon} icon={faArrowLeft as IconProp} />
                            Previous album</div>
                        <div className={styles.pagi_next}>
                            Next album
                            <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp} />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className={styles.row_2}>
                <Col>
                    <div>
                        <div className={styles.title}>
                            Related albums
                        </div>
                        <div className={styles.albums_container}>
                            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard>
                            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard>
                            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard>
                            <AlbumCard image={image} title="Album 1" price="10" rating="4"></AlbumCard>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default memo(Album)