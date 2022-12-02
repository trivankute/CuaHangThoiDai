import { memo, useState, useEffect } from 'react'

import {useNavigate} from 'react-router-dom'

import styles from './Sell.module.css'

import Header from "../../components/User/Header/Header"

import CartItem from "../../components/CartItem/CartItem"

import { Form, Button } from 'react-bootstrap'

function Sell() {
    const navigate = useNavigate();
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={styles.container}>
                <Header title="Sell your albums" content="Sell albums for customers picking up at store" />
                <div>
                    <Form className="d-flex mt-3">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </div>
                <div className={styles.searchResults}>
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
                <div onClick={()=>{navigate('/transactions/1',{state:{
                    type:'pickup_at_store'
                }})}} className="btn btn_custom">
                    submit
                </div>
                </div>
            </div>
        </>
    )
}

export default memo(Sell)