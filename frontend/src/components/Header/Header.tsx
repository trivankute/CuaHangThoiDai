import { memo, useState } from 'react';
import {useNavigate} from "react-router-dom"
import styles from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { Nav, Navbar, Container, Form, Button } from "react-bootstrap"
import "../../globalCss.css"
import clsx from "clsx"

import Brand from '../Brand/Brand';

import LogInButtonAndModal from "../LogInButtonAndModal/LogInButtonAndModal"
import RegisterButtonAndModal from '../RegisterButtonAndModal/RegisterButtonAndModal';

function Header() {
    // navigate
    const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className={styles.navbar}>
        <Container>
            <Navbar.Brand
              onClick={() => {navigate("/")}}
             href="#home">
              <Brand brand_style={styles.navbar_brand} logo_style={styles.logo_style} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
              <div className="me-auto d-flex flex-column w-100 justify-content-center">
                <div className="d-flex justify-content-center align-items-center">
                <Form className={styles.search}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    style={{ margin: "0px", textTransform:"none"}}
                  />
                </Form>
                <div id="search-btn" className={clsx(styles.icon_box, styles.search_box)}>
                  <FontAwesomeIcon className={styles.icon} icon={faSearch as IconProp} />
                </div>
                </div>
                <Nav className="w-100 d-flex justify-content-center">
                  <Nav.Link
                  onClick={()=>{navigate('/')}} 
                  className={styles.navbar_item} href="#home">Home</Nav.Link>
                  <Nav.Link
                  onClick={()=>{navigate('/')}}  className={styles.navbar_item} href="#service">Service</Nav.Link>
                  <Nav.Link
                  onClick={()=>{navigate('/')}}  className={styles.navbar_item} href="#products">Products</Nav.Link>
                  <Nav.Link
                  onClick={()=>{navigate('/')}}  className={styles.navbar_item} href="#categories">Categories</Nav.Link>
                  <Nav.Link
                  onClick={()=>{navigate('/')}}  className={styles.navbar_item} href="#review">Review</Nav.Link>
                  <Nav.Link
                  onClick={()=>{navigate('/')}}  className={styles.navbar_item} href="#blogs">Blogs</Nav.Link>
                </Nav>
              </div>
              <div className={styles.service_icons}>
                <div id="cart-btn" className={styles.icon_box}>
          <FontAwesomeIcon className={styles.icon} icon={faShoppingCart as IconProp}/>
        </div>
                <div id="login-btn" className={clsx(styles.icon_box, styles.login_box)}>
                  {/* <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} />
                  <div className={styles.login_box_hover}>
                    <RegisterButtonAndModal linkStyle={styles.login_box_hover_link}
                     showRegister={showRegister} handleShowRegister={handleShowRegister}
                     handleCloseRegister={handleCloseRegister} handleShowLogin={handleShowLogin}
                     />
                    <div className={styles.seperate}>|</div>
                    <LogInButtonAndModal showLogin={showLogin} handleShowLogin={handleShowLogin}
                     handleCloseLogin={handleCloseLogin} handleShowRegister={handleShowRegister}
                      linkStyle={styles.login_box_hover_link} />
                  </div> */}
          <img className={styles.icon_loggedIn} src="https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c" alt="" />
          <div className={clsx(styles.login_box_hover, styles.loggedIn)}>
          <a className={styles.login_box_hover_link}>Profile</a>
          <a className={styles.login_box_hover_link}> Transaction history</a>
          <a className={styles.login_box_hover_link}> Log out</a>
          </div>
                </div>

                  {/* log in r */}
              </div>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
export default memo(Header)