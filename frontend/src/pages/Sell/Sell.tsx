import { memo, useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import styles from './Sell.module.css'

import Header from "../../components/User/Header/Header"

import CartItem from "../../components/CartItem/CartItem"

import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAlbumsByPageIdAndTitle } from '../../redux/slices/AlbumsSlice'
import { AlbumsStore } from '../../redux/selectors'

function Sell() {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>()
    const albums = useSelector(AlbumsStore)
    const [title, setTitle] = useState("")

    function handleSearch() {
        dispatch(getAllAlbumsByPageIdAndTitle({ id: 1, albumCount: 5, title: title }))
    }
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={styles.container}>
                <Header title="Sell your albums" content="Sell albums for customers picking up at store" />
                <div>
                    <Form onSubmit={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSearch()
                    }} className="d-flex mt-3">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={title}
                            onChange={(e: any) => {
                                setTitle(e.target.value)
                            }}
                        />
                        <Button onClick={handleSearch} variant="outline-success">Search</Button>
                    </Form>
                </div>
                <div>
                    Search for "{title}":
                </div>
                <div className={styles.searchResults}>
                    {
                        albums.data &&
                        <>
                            {
                                albums.data.length === 0 ?
                                <div className="mt-3" style={{ color: "var(--light-color)" }}>
                                    Nothing
                                </div>
                                :
                                albums.data.map((album: any, index: number) => {
                                    return <CartItem key={index} type="sell_mode" album={album} />
                                })
                            }
                        </>
                    }
                    {/* <CartItem type="sell_mode" />
                    <CartItem type="sell_mode" />
                    <CartItem type="sell_mode" />
                    <CartItem type="sell_mode" />
                    <CartItem type="sell_mode" />
                    <CartItem type="sell_mode" />
                    <CartItem type="sell_mode" /> */}
                </div>
                <Header title="Add to order" content="Sell albums for customers picking up at store" />
                <div className={styles.searchResults}>
                    {/* <CartItem type="transaction_history" />
                    <CartItem type="transaction_history" />
                    <CartItem type="transaction_history" />
                    <CartItem type="transaction_history" />
                    <CartItem type="transaction_history" />
                    <CartItem type="transaction_history" />
                    <CartItem type="transaction_history" /> */}
                </div>
                <div className={styles.totalPrice}>
                    <p>Subtotal: $ 27.99</p>
                    <p>Shipping: $ 0</p>
                    <p>Total to pay : $ 27.99</p>
                </div>
                <div className={styles.btn}>
                    <div onClick={() => {
                        navigate('/transactions/1', {
                            state: {
                                type: 'pickup_at_store'
                            }
                        })
                    }} className="btn btn_custom">
                        submit
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Sell)