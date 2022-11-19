import { memo} from 'react';
import styles from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {faSearch, faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons'
import {Nav, Navbar, Container, Form, Button} from "react-bootstrap"
import "../../globalCss.css"

import Brand from '../Brand/Brand';

function Header() {
    return (
        <div>
        <Navbar className={styles.navbar} collapseOnSelect expand="lg" bg="light" variant="light">
      <Container >
        <Navbar.Brand href="#home">
          <Brand brand_style={styles.navbar_brand} logo_style={styles.logo_style}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <div className="me-auto d-flex flex-column w-100 justify-content-center">
            <Form className={styles.search}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{margin:"0px"}}
              />
            </Form>
          <Nav className="w-100 d-flex justify-content-center">
            <Nav.Link className={styles.navbar_item} href="#home">Home</Nav.Link>
            <Nav.Link className={styles.navbar_item} href="#service">Service</Nav.Link>
            <Nav.Link className={styles.navbar_item} href="#products">Products</Nav.Link>
            <Nav.Link className={styles.navbar_item} href="#categories">Categories</Nav.Link>
            <Nav.Link className={styles.navbar_item} href="#review">Review</Nav.Link>
            <Nav.Link className={styles.navbar_item} href="#blogs">Blogs</Nav.Link>
          </Nav>
          </div>
        <div className={styles.service_icons}>
        <div id="search-btn" className={styles.icon_box}>
          <FontAwesomeIcon className={styles.icon} icon={faSearch as IconProp}/>
        </div>
        {/* <div id="cart-btn" className={styles.icon_box}>
          <FontAwesomeIcon className={styles.icon} icon={faShoppingCart as IconProp}/>
        </div> */}
        <div  id="login-btn" className={styles.icon_box}>
          <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp}/>
        </div>
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
)
}
export default memo(Header)