import { memo, useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import styles from './Sell.module.css'

import Header from "../../components/User/Header/Header"

import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAlbumsByPageIdAndTitle } from '../../redux/slices/AlbumsSlice'
import { AlbumsStore, SellStore } from '../../redux/selectors'
import SellItem from '../../components/SellItem/SellItem'
import SellSlice from '../../redux/slices/SellSlice'
import { createPickupTransaction } from '../../redux/slices/TransactionSlice'
import FlashSlice from '../../redux/slices/FlashSlice'

function Sell() {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>()
    const albums = useSelector(AlbumsStore)
    const [title, setTitle] = useState("")
    const sell = useSelector(SellStore)

    function handleSearch() {
        dispatch(getAllAlbumsByPageIdAndTitle({ id: 1, albumCount: 5, title: title }))
    }
    function handleClearAll() {
        dispatch(SellSlice.actions.handleClearAllSellItem(""))
        dispatch(SellSlice.actions.handleLoadSellCart(""))
        dispatch(SellSlice.actions.handleTotalPrice(""))
    }
    function handleSell() {
        if(sell.data && sell.totalPrice)
        {
            const input = {
                typeOfTransaction : "payment",
                typeOfShipping : "pick_up",
                customerId: "",
                totalPrice : sell.totalPrice,
                products : sell.data.map((item:any, index:any)=>{
                    return {
                        albumId: item.id,
                        quantity: item.quantity
                    }
                })
            }
            dispatch(createPickupTransaction(input))
            .then((res:any)=>{
                if(res.payload.status === 'success')
                {
                    navigate('/notification', {
                        state: {
                            state: "success",
                            title: "Your sell has been placed",
                            description: "You can see your order in transaction history",
                            btn_title: "Go to transaction history",
                            btn_path: "/user/transactions?page=1"
                        }
                    })
                    dispatch(SellSlice.actions.handleClearAllSellItem(""))
                }
            })
        }
        else {
            dispatch(FlashSlice.actions.handleOpen({ message: "Your submit has led to error", type: "danger" }))
        }
    }
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(SellSlice.actions.handleLoadSellCart(""))
        dispatch(SellSlice.actions.handleTotalPrice(""))
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
                <div className="mt-3">
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
                                    return <SellItem key={index} type="in_cart" album={album} />
                                })
                            }
                        </>
                    }
                </div>
                <Header title="Add to order" content="Sell albums for customers picking up at store" />
                <div className={styles.searchResults}>
                    {
                        sell.data && 
                        sell.data.map((sellItem:any, index:any)=>{
                            return <SellItem key={index} type="transaction_history" album={sellItem} />
                        })
                    }
                </div>
                <div className={styles.totalPrice}>
                    <p>Subtotal: {sell.data && sell.totalPrice} KVND</p>
                    <p>Shipping: 0</p>
                    <p>Total to pay : {sell.data && sell.totalPrice} KVND</p>
                </div>
                <div className={styles.btn}>
                    <div onClick={handleClearAll} className="btn btn_custom me-3">
                        Clear All
                    </div>
                    <div onClick={() => {
                        handleSell()
                        // navigate('/transactions/1', {
                        //     state: {
                        //         type: 'pickup_at_store'
                        //     }
                        // })
                    }} className="btn btn_custom">
                        submit
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Sell)