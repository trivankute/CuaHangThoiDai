import { memo, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/User/Header/Header';
import { CarouselStore, FooterStore } from '../../redux/selectors';

import styles from './Configweb.module.css';

import { getFooter, updateFooter } from '../../redux/slices/FooterSlice';
import { getAllCarousel } from '../../redux/slices/CarouselSlice';
import FlashSlice from '../../redux/slices/FlashSlice';

function Configweb() {
    const dispatch = useDispatch<any>()
    const footer = useSelector(FooterStore)
    const carousel = useSelector(CarouselStore)
    const [footerPhone, setFooterPhone] = useState("")
    const [footerEmail, setFooterEmail] = useState("")
    const [footerAddress, setFooterAddress] = useState("")
    const [carousel1, setCarousel1] = useState("")
    const [carousel2, setCarousel2] = useState("")
    const [carousel3, setCarousel3] = useState("")
    const [carousel4, setCarousel4] = useState("")
    const [carousel5, setCarousel5] = useState("")
    const [footerAreYouSure, setFooterAreYouSure] = useState(false)
    const [carouselAreYouSure, setCarouselAreYouSure] = useState(false)
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
    function handleUpdateCarousel() {
        if (carousel1 === "" && carousel2 === "" && carousel3 === "" && carousel4 === "" && carousel5 === "") {
            dispatch(FlashSlice.actions.handleOpen({
                type: "info",
                message: "Nothing to update"
            }))
        }
        else {
            if (carousel1 === "")
                setCarousel1(carousel.data[0].carousel_link)
            if (carousel2 === "")
                setCarousel2(carousel.data[1].carousel_link)
            if (carousel3 === "")
                setCarousel3(carousel.data[2].carousel_link)
            if (carousel4 === "")
                setCarousel4(carousel.data[3].carousel_link)
            if (carousel5 === "")
                setCarousel5(carousel.data[4].carousel_link)
            if (carouselAreYouSure) {
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
        }}
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getFooter())
        dispatch(getAllCarousel())
    }, [])
    console.log(carousel)
    return (
        <>
            <div className={styles.container}>
                <Header title="Carousel" content="Manage your Carousel" />
                {
                    carousel.data &&
                    <Form>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Carousel 1</Form.Label>
                            <Form.Control style={{textTransform:"none"}} value={carousel1!==""?carousel1:carousel.data[0].carousel_link} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Carousel 2</Form.Label>
                            <Form.Control style={{textTransform:"none"}} value={carousel2!==""?carousel2:carousel.data[1].carousel_link} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Carousel 3</Form.Label>
                            <Form.Control style={{textTransform:"none"}} value={carousel3!==""?carousel3:carousel.data[2].carousel_link} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Carousel 4</Form.Label>
                            <Form.Control style={{textTransform:"none"}} value={carousel4!==""?carousel4:carousel.data[3].carousel_link} type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Carousel 5</Form.Label>
                            <Form.Control style={{textTransform:"none"}} value={carousel5!==""?carousel5:carousel.data[4].carousel_link} type="text" />
                        </Form.Group>
                        <Button onClick={handleUpdateCarousel} className="mt-3">
                            Save
                        </Button>
                    </Form>
                }
                <Header title="Music" content="Manage your Music list" />
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
                        <Button onClick={handleUpdateFooter} className="mt-3">
                            Save
                        </Button>
                    </Form>
                }
            </div>
        </>
    )
}

export default memo(Configweb)