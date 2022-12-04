import { memo, useState, useRef, useEffect } from 'react';

import styles from "./PlayMusic.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Button, Modal } from 'react-bootstrap';

function PlayMusic() {
    const [show, setShow] = useState(false)
    const [curMusic, setCurMusic] = useState("Nàng thơ")
    // take audio element
    const audioEl = useRef(null)
    const [musics, setMusics] = useState<any>(
        {
            "Exile": "https://res.cloudinary.com/dotr7u5kq/video/upload/v1670148340/MusicCHTD/Y2Mate.is_-_Taylor_Swift_exile_feat._Bon_Iver_Official_Lyric_Video_-osdoLjUNFnA-128k-1654582992461_ktkfxv.mp3",
            "Em là": "https://res.cloudinary.com/dotr7u5kq/video/upload/v1670147023/MusicCHTD/EmLa-MONOOnionn-7736094_vaseeb.mp3",
            "Thức giấc": "https://res.cloudinary.com/dotr7u5kq/video/upload/v1670146963/MusicCHTD/ThucGiac-DaLAB-7048212_jukatt.mp3",
            "Lời tạm biệt chưa nói": "https://res.cloudinary.com/dotr7u5kq/video/upload/v1670146955/MusicCHTD/LoiTamBietChuaNoi-GREYDDoanTheLanOrange-7613756_kwj7oa.mp3",
            "Nàng thơ": "https://res.cloudinary.com/dotr7u5kq/video/upload/v1670146942/MusicCHTD/NangTho-HoangDung-6413381_nzucky.mp3"
        }
    )
    function handleClose() {
        setShow(false)
    }
    function handleShow() {
        setShow(true)
    }
    useEffect(() => {
        // make audio reload src
        // @ts-ignore
        audioEl.current.load()
    }, [curMusic])
    return (<>
        <div className={styles.box}>
            <audio ref={audioEl} className={styles.audio} controls loop >
                <source src={musics[curMusic]} type="audio/mpeg"></source>
            </audio>
            <a onClick={handleShow}>
                change music
            </a>
        </div>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Songs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Current song:{" "}
                <span className={styles.currMusic}>{curMusic}</span>
                <div className={styles.list}>
                    {Object.keys(musics).map((music) => {
                        return (
                            <div className={styles.item} onClick={() => {
                                setCurMusic(music)
                                handleClose()
                            }}>
                                <a style={{ paddingRight: 10 }}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </a>
                                <a>{music}</a>
                            </div>
                        )
                    })}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="btn btn_custom" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default memo(PlayMusic)