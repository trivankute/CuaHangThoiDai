import { memo } from 'react';
import styles from "./Footer.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {faCompactDisc, faPhone, faEnvelope, faMapMarkerAlt,
    faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import anImage from "./payment.png"
import {Container} from "react-bootstrap"

function Footer() {
    return (
        <Container fluid style={{margin:0, padding:0}}>
            <section className={styles.footer}>
                <div className={styles.box}>
                    <h3> timesrecord 
                            <FontAwesomeIcon className={styles.icon} icon={faCompactDisc as IconProp}/>
                         </h3>
                    <p>Your music your life.</p>
                    <div className={styles.share}>
                        <a href="#" className={styles.share_a}>
                            <FontAwesomeIcon className={styles.brand_icon} icon={faFacebookF as IconProp}/>
                        </a>
                        <a href="#" className={styles.share_a}>
                            <FontAwesomeIcon className={styles.brand_icon} icon={faTwitter as IconProp}/>
                        </a>
                        <a href="#" className={styles.share_a}>
                            <FontAwesomeIcon className={styles.brand_icon} icon={faInstagram as IconProp}/>      
                        </a>
                        <a href="#" className={styles.share_a}>
                            <FontAwesomeIcon className={styles.brand_icon} icon={faLinkedin as IconProp}/>
                        </a>
                    </div>
                </div>

                <div className={styles.box}>
                    <h3>contact info</h3>
                    <a href="#" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faPhone as IconProp}/>
                     +123-456-7890 </a>
                    <a href="#" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faPhone as IconProp}/>
                     +111-222-3333 </a>
                    <a href="#" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faEnvelope as IconProp}/>
                     hibecung123@gmail.com </a>
                    <a href="#" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faMapMarkerAlt as IconProp}/>
                     H6-HCMUT </a>
                </div>

                <div className={styles.box}>
                    <h3>quick links</h3>
                    <a href="#" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     home </a>
                    <a href="#" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     Services </a>
                    <a href="#" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     products </a>
                    <a href="#" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     categories </a>
                    <a href="#" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     review </a>
                    <a href="#" className={styles.links}> 
                    <FontAwesomeIcon className={styles.icon} icon={faArrowRight as IconProp}/>
                     blogs </a>
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