import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form } from 'react-bootstrap'

import styles from "./Checkout.module.css"

import { axiosForProvince, getProvincesArray, getWards, getDistricts } from "../../utils/axiosForProvinces"

import BackNavigate from '../../components/BackNavigate/BackNavigate';
import { useDispatch, useSelector } from 'react-redux';
import { CartStore, UserStore } from '../../redux/selectors';
import CartSlice from '../../redux/slices/CartSlice';
import { createShippingTransaction } from '../../redux/slices/TransactionSlice';
import FlashSlice from '../../redux/slices/FlashSlice';

function Checkout() {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const user = useSelector(UserStore)
    const cart = useSelector(CartStore)
    const [provinces, setProvinces] = useState(() => { return getProvincesArray() })
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [province, setProvince] = useState<any>(null)
    const [district, setDistrict] = useState<any>(null)
    const [ward, setWard] = useState<any>(null)
    const [address, setAddress] = useState<any>(null)

    const [defaultMode, setDefaultMode] = useState(true)
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(CartSlice.actions.handleTotalPrice(""))
    }, [])

    async function handleGetDistricts(provinceName: string) {
        const provinceResult = await axiosForProvince(provinceName);
        const districtsResult = getDistricts(provinceResult.data.district)
        // @ts-ignore
        setDistricts([...districtsResult])
        setProvince(provinceResult)
    }
    function handleGetWards(districtName: string) {
        const wardsResult = getWards(province.data.district, districtName)
        // @ts-ignore
        setWards([...wardsResult])
        setDistrict(districtName)
    }

    function handleSubmit() {
        let userInput;
        if(defaultMode) 
        {
            userInput = {
                username: user.data.account.username,
                phone: user.data.phone,
                address: user.data.address
            }
        }
        else {
        let fullAddress = `${address}, ${ward}, ${district}, ${province.data.name}` 
        userInput = {
            username,
            phone,
            address: fullAddress
        }
        }
        const input = {
            typeOfTransaction : "payment",
            typeOfShipping : "shipping",
            receiverAddress : userInput.address,
            deliverPartner : null,
            receiverName : userInput.username,
            receiverPhone : userInput.phone,
            totalPrice : cart.totalPrice,
            products : cart.data.map((item:any, index:any)=>{
                return {
                    albumId: item.id,
                    quantity: item.quantity
                }
            })
        }
        dispatch(createShippingTransaction(input))
            .then((res:any)=>{
                if(res.payload.status === "success")
                {
                    dispatch(FlashSlice.actions.handleOpen({message: res.payload.msg, type: "success"}))
                    dispatch(CartSlice.actions.handleClearCart(""))
                    navigate('/notification', {
                        state: {
                            state: "success",
                            title: "Your order has been placed",
                            description: "Thank you for shopping with us",
                            btn_title: "See your order",
                            btn_path: "/transactions/1"
                        }
                    })
                }
                else {
                    dispatch(FlashSlice.actions.handleOpen({ message: res.payload.msg, type: "danger" }))
                }
            })
    }
    return (
        <div className={styles.container}>
            <BackNavigate backPath="/cart" backPage="Your cart" currentPage="Check out" />
            <div className={styles.header}>
                Shipping information
            </div>
            <Form className="mb-3">
                <Form.Check
                    onChange={(e) => { setDefaultMode(true) }}
                    type={"radio"}
                    label={`Default shipping information`}
                    id={`default-radio1`}
                    checked={defaultMode ? true : false}
                />
                <Form.Check
                    onChange={(e) => { setDefaultMode(false) }}
                    type={"radio"}
                    label={`Choose your shipping information`}
                    id={`default-radio2`}
                    checked={defaultMode ? false : true}
                />
            </Form>
            {defaultMode ?
                <>
                {user.data &&
                <div className={styles.box}>
                    <div className={styles.fullname}>
                        <div className={styles.upper_none}>
                            <label htmlFor="">Username: </label>
                            {user.data.account.username}
                        </div>
                    </div>
                    <div className={styles.upper_none}>
                        <label htmlFor="">Email: </label>
                        {user.data.account.email}
                    </div>
                    <div className={styles.upper_none}>
                        <label htmlFor="">Phone: </label>
                        {user.data.phone}
                    </div>
                    <div className={styles.gender}>
                        <label htmlFor="">Gender: </label>
                        {user.data.gender}
                    </div>
                    <div className={styles.upper_none}>
                        <label htmlFor="">Birthday: </label>
                        {user.data.Bdate}
                    </div>
                    <div className={styles.upper_none}>
                        <label htmlFor="">Address: </label>
                        {user.data.address}
                    </div>
                </div>}
                </>
                :
                <>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Receiver's full name:</Form.Label>
                            <Form.Control onChange={(e:any)=>{setUsername(e.target.value)}} value={username} type="text" placeholder="Enter your full name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control onChange={(e:any)=>{setPhone(e.target.value)}} value={phone} type="text" placeholder="Enter your phone number" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={(e:any)=>{setAddress(e.target.value)}} value={address} type="text" placeholder="Address" />
                        </Form.Group>

                        {/* form select provinces */}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Province</Form.Label>
                            <Form.Select onChange={async (e) => {
                                handleGetDistricts(e.target.value)
                            }} aria-label="Default select example">
                                <option>Open this select menu</option>
                                {provinces.map((province, index) => {
                                    return <option key={index} value={province}>{province}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        {/* form select district */}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>District</Form.Label>
                            <Form.Select onChange={(e) => {
                                handleGetWards(e.target.value);
                            }}
                                aria-label="Default select example">
                                <option>Open this select menu</option>
                                {districts.map((district, index) => {
                                    return <option key={index} value={district}>{district}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        {/* form select ward */}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Ward</Form.Label>
                            <Form.Select onChange={(e) => {
                                setWard(e.target.value)
                            }} aria-label="Default select example">
                                <option>Open this select menu</option>
                                {wards.map((ward, index) => {
                                    return <option key={index} value={ward}>{ward}</option>
                                })}
                            </Form.Select>
                        </Form.Group>



                    </Form>
                </>
            }
                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <div onClick={handleSubmit} className='btn btn_custom'>
                                Submit
                            </div>

                        </div>
        </div>
    )
}

export default memo(Checkout)