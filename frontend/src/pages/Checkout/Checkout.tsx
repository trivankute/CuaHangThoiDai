import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {Form} from 'react-bootstrap'

import styles from "./Checkout.module.css"

import {axiosForProvince, getProvincesArray, getWards, getDistricts} from "../../utils/axiosForProvinces"

import BackNavigate from '../../components/BackNavigate/BackNavigate';

function Checkout() {
    const navigate = useNavigate()
    const [provinces, setProvinces] = useState(()=>{return getProvincesArray()})
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [province, setProvince] = useState<any>(null)
    const [district, setDistrict] = useState<any>(null)
    const [ward, setWard] = useState<any>(null)
    const [address, setAddress] = useState<any>(null)

    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    async function handleGetDistricts(provinceName:string) {
        const provinceResult = await axiosForProvince(provinceName);
        const districtsResult = getDistricts(provinceResult.data.district)
        // @ts-ignore
        setDistricts([...districtsResult])
        setProvince(provinceResult)
    }
    function handleGetWards(districtName:string) {
        const wardsResult = getWards(province.data.district, districtName)
        // @ts-ignore
        setWards([...wardsResult])
        setDistrict(districtName)
    }

    function handleSubmit(){
        console.log({
            province:province.data.name,
            district:district,
            ward:ward
        })
        navigate('/notification', {state:{state:"success",
            title:"Your order has been placed",
         description:"Thank you for shopping with us"}})
    }
    return (
        <div className={styles.container}>
            <BackNavigate backPath="/cart" backPage="Your cart" currentPage="Check out"/>
            <div className={styles.header}>
                Shipping information
            </div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter your full name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter your phone number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Address" />
                </Form.Group>

                {/* form select provinces */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Province</Form.Label>
                    <Form.Select onChange={async (e)=>{
                        await handleGetDistricts(e.target.value);
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
                    <Form.Select onChange={(e)=>{
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
                    <Form.Select onChange={(e)=>{
                        setWard(e.target.value)
                    }} aria-label="Default select example">
                        <option>Open this select menu</option>
                        {wards.map((ward, index) => {
                            return <option key={index} value={ward}>{ward}</option>
                        })}
                    </Form.Select>
                </Form.Group>



                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <div onClick={handleSubmit} className='btn btn_custom'>
                                Submit
                            </div>

                        </div>
            </Form>
        </div>
    )
}

export default memo(Checkout)