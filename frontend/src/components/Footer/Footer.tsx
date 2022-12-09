import { memo, useEffect } from 'react';
import styles from "./Footer.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {faCompactDisc, faPhone, faEnvelope, faMapMarkerAlt,
    faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import anImage from "./payment.png"
import {Container, Nav} from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FooterStore } from '../../redux/selectors';
import { getFooter } from '../../redux/slices/FooterSlice';

function Footer() {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const footer = useSelector(FooterStore)
    useEffect(()=>{
        dispatch(getFooter())
    },[])
    return (
        <Container fluid style={{margin:0, padding:0}}>
            <section className={styles.footer}>
                <div className={styles.box}>
                    <h3> timesrecord 
                            <FontAwesomeIcon className={styles.icon} icon={faCompactDisc as IconProp}/>
                         </h3>
                    <p>Your music your life.</p>
                    <div className={styles.share}>
                        <a href="https://www.facebook.com/profile.php?id=100007026762373" className={styles.share_a}>
                            <FontAwesomeIcon className={styles.brand_icon} icon={faFacebookF as IconProp}/>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100007026762373" className={styles.share_a}>
                            <FontAwesomeIcon className={styles.brand_icon} icon={faTwitter as IconProp}/>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100007026762373" className={styles.share_a}>
                            <FontAwesomeIcon className={styles.brand_icon} icon={faInstagram as IconProp}/>      
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100007026762373" className={styles.share_a}>
                            <FontAwesomeIcon className={styles.brand_icon} icon={faLinkedin as IconProp}/>
                        </a>
                    </div>
                </div>

                <div className={styles.box}>
                    <h3>contact info</h3>
                    {
                        footer.data &&
                        <>
                        <a style={{textTransform:"none", marginRight:5}} className={styles.links}> 
                        <FontAwesomeIcon className={styles.icon} icon={faPhone as IconProp}/>
                        {footer.data.phone} </a>
                        <a style={{textTransform:"none", marginRight:5}} className={styles.links}> 
                        <FontAwesomeIcon className={styles.icon} icon={faEnvelope as IconProp}/>
                        {footer.data.email} </a>
                        <a style={{textTransform:"none", marginRight:5}} className={styles.links}> 
                        <FontAwesomeIcon className={styles.icon} icon={faMapMarkerAlt as IconProp}/>
                        {footer.data.address} </a>
                        </>
                    }
                </div>

                <div className={styles.box}>
                    <h3>quick links</h3>
                    <Nav.Link onClick={()=>{navigate("/#home")}} href="/#home"  className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     home </Nav.Link>
                    <Nav.Link onClick={()=>{navigate("/#service")}} href="/#service" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     Services </Nav.Link>
                    <Nav.Link onClick={()=>{navigate("/#products")}} href="/#products" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     products </Nav.Link>
                    <Nav.Link onClick={()=>{navigate("/#categories")}} href="/#categories" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     categories </Nav.Link>
                    <Nav.Link onClick={()=>{navigate("/#review")}} href="/#review" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     review </Nav.Link>
                    <Nav.Link onClick={()=>{navigate("/#blogs")}} href="/#blogs" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     blogs </Nav.Link>
                    <Nav.Link onClick={()=>{navigate("/aboutus")}} className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     about us </Nav.Link>
                </div>

                <div className={styles.box}>
                    <h3>newsletter</h3>
                    <p>subscribe for latest music 😉</p>
                    <input type="email" placeholder="your email" className="email"></input>
                    <input type="submit" value="subscribe" className="btn"></input>
                    <img src={anImage} style={{width:"calc(80% - 50px)", height:30, marginTop:10}} className="payment-img" alt=""></img>
                </div>
            </section>
        </Container>
    )
}

export default memo(Footer)