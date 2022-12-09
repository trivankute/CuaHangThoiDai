import { memo, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/User/Header/Header';
import { CarouselStore, FooterStore, MusicStore } from '../../redux/selectors';

import styles from './Configweb.module.css';

import { getFooter, updateFooter } from '../../redux/slices/FooterSlice';
import { getAllCarousel, updateCarousel } from '../../redux/slices/CarouselSlice';
import { getAllMusic, updateMusic } from '../../redux/slices/MusicSlice';
import FlashSlice from '../../redux/slices/FlashSlice';
import Loading from '../../components/Loading/Loading';

function Configweb() {
    const dispatch = useDispatch<any>()
    const footer = useSelector(FooterStore)
    const carousel = useSelector(CarouselStore)
    const music = useSelector(MusicStore)
    const [footerPhone, setFooterPhone] = useState("")
    const [footerEmail, setFooterEmail] = useState("")
    const [footerAddress, setFooterAddress] = useState("")
    const [carousel1, setCarousel1] = useState("")
    const [carousel2, setCarousel2] = useState("")
    const [carousel3, setCarousel3] = useState("")
    const [carousel4, setCarousel4] = useState("")
    const [carousel5, setCarousel5] = useState("")
    const [music1, setMusic1] = useState("")
    const [music2, setMusic2] = useState("")
    const [music3, setMusic3] = useState("")
    const [music4, setMusic4] = useState("")
    const [music5, setMusic5] = useState("")
    const [musicTitle1, setMusicTitle1] = useState("")
    const [musicTitle2, setMusicTitle2] = useState("")
    const [musicTitle3, setMusicTitle3] = useState("")
    const [musicTitle4, setMusicTitle4] = useState("")
    const [musicTitle5, setMusicTitle5] = useState("")
    const [footerAreYouSure, setFooterAreYouSure] = useState(false)
    const [carouselAreYouSure, setCarouselAreYouSure] = useState(false)
    const [musicAreYouSure, setMusicAreYouSure] = useState(false)
    function handleUpdateFooter() {
        if (footerPhone === "" && footerEmail === "" && footerAddress === "") {
            dispatch(FlashSlice.actions.handleOpen({
                type: "info",
                message: "Nothing to update"
            }))
        }
        else {
            if (footerPhone === "")
                setFooterPhone(footer.data.phone)
            if (footerEmail === "")
                setFooterEmail(footer.data.email)
            if (footerAddress === "")
                setFooterAddress(footer.data.address)
            if (footerAreYouSure) {
                dispatch(updateFooter({
                    phone: footerPhone,
                    email: footerEmail,
                    address: footerAddress
                }))
                    .then((res: any) => {
                        if (res.payload.status === "success") {

                            dispatch(FlashSlice.actions.handleOpen({
                                type: "success",
                                message: "Update footer successfully"
                            }))
                            setFooterAreYouSure(false)
                            setFooterPhone("")
                            setFooterEmail("")
                            setFooterAddress("")
                            dispatch(getFooter())
                        }
                    })
            }
            else {
                dispatch(FlashSlice.actions.handleOpen({
                    type: "danger",
                    message: "Are you sure?"
                }))
                setFooterAreYouSure(true)
            }
        }
    }
    function handleUpdateCarousel(id: number) {
        if (id === 1 && carousel1 === "")
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info" }))
        else if (id === 2 && carousel2 === "")
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info" }))
        else if (id === 3 && carousel3 === "")
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info" }))
        else if (id === 4 && carousel4 === "")
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info" }))
        else if (id === 5 && carousel5 === "")
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info" }))
        else {
            if (carouselAreYouSure) {
                dispatch(updateCarousel({
                    id: id,
                    carouselLink: id === 1 ? carousel1 : id === 2 ? carousel2 : id === 3 ? carousel3 : id === 4 ? carousel4 : carousel5
                }))
                    .then((res: any) => {
                        if (res.payload.status === "success") {
                            dispatch(FlashSlice.actions.handleOpen({
                                type: "success",
                                message: "Update carousel successfully"
                            }))
                            setCarouselAreYouSure(false)
                            setCarousel1("")
                            setCarousel2("")
                            setCarousel3("")
                            setCarousel4("")
                            setCarousel5("")
                            dispatch(getAllCarousel())
                        }
                    })
            }
            else {
                dispatch(FlashSlice.actions.handleOpen({
                    type: "danger",
                    message: "Are you sure?"
                }))
                setCarouselAreYouSure(true)
            }
        }
    }
    function handleUpdateMusic(id: number) {
        if (id === 1 && music1 === "" && musicTitle1 === "")
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info" }))
        else if (id === 2 && music2 === "" && musicTitle2 === "")
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info" }))
        else if (id === 3 && music3 === "" && musicTitle3 === "")
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info" }))
        else if (id === 4 && music4 === "" && musicTitle4 === "")
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info" }))
        else if (id === 5 && music5 === "" && musicTitle5 === "")
            dispatch(FlashSlice.actions.handleOpen({ message: "Nothing to update", type: "info" }))
        else {
            if (music1 === "")
                setMusic1(music.data[0].music_link)
            if (music2 === "")
                setMusic2(music.data[1].music_link)
            if (music3 === "")
                setMusic3(music.data[2].music_link)
            if (music4 === "")
                setMusic4(music.data[3].music_link)
            if (music5 === "")
                setMusic5(music.data[4].music_link)
            if (musicTitle1 === "")
                setMusicTitle1(music.data[0].title)
            if (musicTitle2 === "") 
                setMusicTitle2(music.data[1].title)
            if (musicTitle3 === "") 
                setMusicTitle3(music.data[2].title)
            if (musicTitle4 === "")
                setMusicTitle4(music.data[3].title)
            if (musicTitle5 === "")
                setMusicTitle5(music.data[4].title)
            if (musicAreYouSure) {
                dispatch(updateMusic({
                    id: id,
                    musicLink: id === 1 ? music1 : id === 2 ? music2 : id === 3 ? music3 : id === 4 ? music4 : music5,
                    title: id === 1 ? musicTitle1 : id === 2 ? musicTitle2 : id === 3 ? musicTitle3 : id === 4 ? musicTitle4 : musicTitle5
                }))
                    .then((res: any) => {
                        if (res.payload.status === "success") {
                            dispatch(FlashSlice.actions.handleOpen({
                                type: "success",
                                message: "Update music successfully"
                            }))
                            setMusicAreYouSure(false)
                            setMusic1("")
                            setMusic2("")
                            setMusic3("")
                            setMusic4("")
                            setMusic5("")
                            setMusicTitle1("")
                            setMusicTitle2("")
                            setMusicTitle3("")
                            setMusicTitle4("")
                            setMusicTitle5("")
                            dispatch(getAllMusic())
                        }
                    })
            }
            else {
                dispatch(FlashSlice.actions.handleOpen({
                    type: "danger",
                    message: "Are you sure"
                }))
                setMusicAreYouSure(true)
            }
        }
    }

                    
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getFooter())
        dispatch(getAllCarousel())
        dispatch(getAllMusic())
    }, [])

    return (
        <>
            <div className={styles.container}>
                <Header title="Carousel" content="Manage your Carousel" />
                {
                    carousel.data &&
                    <Form>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Carousel 1 link image</Form.Label>
                            <Form.Control onChange={(e: any) => { setCarousel1(e.target.value) }} style={{ textTransform: "none" }} value={carousel1 !== "" ? carousel1 : carousel.data[0].carousel_link} type="text" />
                            <Button onClick={() => { handleUpdateCarousel(1) }} className="mt-3 position-relative">
                                {
                                    carousel.loading &&
                                    <Loading small />
                                }
                                Save
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Carousel 2 link image</Form.Label>
                            <Form.Control onChange={(e: any) => { setCarousel2(e.target.value) }} style={{ textTransform: "none" }} value={carousel2 !== "" ? carousel2 : carousel.data[1].carousel_link} type="text" />
                            <Button onClick={() => { handleUpdateCarousel(2) }} className="mt-3 position-relative">
                                {
                                    carousel.loading &&
                                    <Loading small />
                                }
                                Save
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Carousel 3 link image</Form.Label>
                            <Form.Control onChange={(e: any) => { setCarousel3(e.target.value) }} style={{ textTransform: "none" }} value={carousel3 !== "" ? carousel3 : carousel.data[2].carousel_link} type="text" />
                            <Button onClick={() => { handleUpdateCarousel(3) }} className="mt-3 position-relative">
                                {
                                    carousel.loading &&
                                    <Loading small />
                                }
                                Save
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Carousel 4 link image</Form.Label>
                            <Form.Control onChange={(e: any) => { setCarousel4(e.target.value) }} style={{ textTransform: "none" }} value={carousel4 !== "" ? carousel4 : carousel.data[3].carousel_link} type="text" />
                            <Button onClick={() => { handleUpdateCarousel(4) }} className="mt-3 position-relative">
                                {
                                    carousel.loading &&
                                    <Loading small />
                                }
                                Save
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Carousel 5 link image</Form.Label>
                            <Form.Control onChange={(e: any) => { setCarousel5(e.target.value) }} style={{ textTransform: "none" }} value={carousel5 !== "" ? carousel5 : carousel.data[4].carousel_link} type="text" />
                            <Button onClick={() => { handleUpdateCarousel(5) }} className="mt-3 position-relative">
                                {
                                    carousel.loading &&
                                    <Loading small />
                                }
                                Save
                            </Button>
                        </Form.Group>
                    </Form>
                }
                <Header title="Music" content="Manage your Music list" />
                {
                    music.data &&
                    <Form>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Music 1 link music</Form.Label>
                            <Form.Control onChange={(e: any) => { setMusic1(e.target.value) }} style={{ textTransform: "none" }} value={music1 !== "" ? music1 : music.data[0].music_link} type="text" />
                            <Form.Label className="mt-3">Title</Form.Label>
                            <Form.Control onChange={(e: any) => { setMusicTitle1(e.target.value) }} style={{ textTransform: "none" }} value={musicTitle1 !== "" ? musicTitle1 : music.data[0].title} type="text" />
                            <Button onClick={() => { handleUpdateMusic(1) }} className="mt-3 position-relative">
                                {
                                    music.loading &&
                                    <Loading small />
                                }
                                Save
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Music 2 link music</Form.Label>
                            <Form.Control onChange={(e: any) => { setMusic2(e.target.value) }} style={{ textTransform: "none" }} value={music2 !== "" ? music2 : music.data[1].music_link} type="text" />
                            <Form.Label className="mt-3">Title</Form.Label>
                            <Form.Control onChange={(e: any) => { setMusicTitle2(e.target.value) }} style={{ textTransform: "none" }} value={musicTitle2 !== "" ? musicTitle2 : music.data[1].title} type="text" />
                            <Button onClick={() => { handleUpdateMusic(2) }} className="mt-3 position-relative">
                                {
                                    music.loading &&
                                    <Loading small />
                                }
                                Save
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Music 3 link music</Form.Label>
                            <Form.Control onChange={(e: any) => { setMusic3(e.target.value) }} style={{ textTransform: "none" }} value={music3 !== "" ? music3 : music.data[2].music_link} type="text" />
                            <Form.Label className="mt-3">Title</Form.Label>
                            <Form.Control onChange={(e: any) => { setMusicTitle3(e.target.value) }} style={{ textTransform: "none" }} value={musicTitle3 !== "" ? musicTitle3 : music.data[2].title} type="text" />
                            <Button onClick={() => { handleUpdateMusic(3) }} className="mt-3 position-relative">
                                {
                                    music.loading &&
                                    <Loading small />
                                }
                                Save
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Music 4 link music</Form.Label>
                            <Form.Control onChange={(e: any) => { setMusic4(e.target.value) }} style={{ textTransform: "none" }} value={music4 !== "" ? music4 : music.data[3].music_link} type="text" />
                            <Form.Label className="mt-3">Title</Form.Label>
                            <Form.Control onChange={(e: any) => { setMusicTitle4(e.target.value) }} style={{ textTransform: "none" }} value={musicTitle4 !== "" ? musicTitle4 : music.data[3].title} type="text" />
                            <Button onClick={() => { handleUpdateMusic(4) }} className="mt-3 position-relative">
                                {
                                    music.loading &&
                                    <Loading small />
                                }
                                Save
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Music 5 link music</Form.Label>
                            <Form.Control onChange={(e: any) => { setMusic5(e.target.value) }} style={{ textTransform: "none" }} value={music5 !== "" ? music5 : music.data[4].music_link} type="text" />
                            <Form.Label className="mt-3">Title</Form.Label>
                            <Form.Control onChange={(e: any) => { setMusicTitle5(e.target.value) }} style={{ textTransform: "none" }} value={musicTitle5 !== "" ? musicTitle5 : music.data[4].title} type="text" />
                            <Button onClick={() => { handleUpdateMusic(5) }} className="mt-3 position-relative">
                                {
                                    music.loading &&
                                    <Loading small />
                                }
                                Save
                            </Button>
                        </Form.Group>
                    </Form>
                }
                <Header title="Footer" content="Manage your Footer notes" />
                {
                    footer.data &&
                    <Form>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control value={footerPhone === "" ? footer.data.phone : footerPhone} onChange={(e) => { setFooterPhone(e.target.value) }} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={footerEmail === "" ? footer.data.email : footerEmail} onChange={(e) => { setFooterEmail(e.target.value) }} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={footerAddress === "" ? footer.data.address : footerAddress} onChange={(e) => { setFooterAddress(e.target.value) }} type="text" />
                        </Form.Group>
                        <Button onClick={handleUpdateFooter} className="mt-3 position-relative">
                            {
                                footer.loading &&
                                <Loading small />
                            }
                            Save
                        </Button>
                    </Form>
                }
            </div>
        </>
    )
}

export default memo(Configweb)