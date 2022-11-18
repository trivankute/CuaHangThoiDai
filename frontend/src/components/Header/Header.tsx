import { memo} from 'react';
import styles from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {faCompactDisc, faSearch, faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons'
import {Nav, Navbar, Container} from "react-bootstrap"
import "../../globalCss.css"
import clsx from 'clsx';

function Header() {
    // const [res, setRes] = useState(false);
    // useEffect(()=> {
    //   function responsiveHeader () {
    //     const width = window.innerWidth;
    //     if(width<400){
    //       setRes(true);
    //       console.log("hi")
    //     }
    //     else {
    //       setRes(false);
    //     }
    //   }
    //   window.addEventListener('resize', responsiveHeader)

    //   return () => {
    //     window.removeEventListener('resize', responsiveHeader)
    //   }
    // },[res])
    return (
        <div>
        <Navbar className={styles.navbar} collapseOnSelect expand="lg" bg="light" variant="light">
      <Container >
        <Navbar.Brand className={styles.navbar_brand} href="#home">
          <FontAwesomeIcon className={styles.logo} icon={faCompactDisc as IconProp}/>
          Timesrecord</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link className={styles.navbar_item} href="#home">Home</Nav.Link>
            <Nav.Link className={styles.navbar_item} href="#service">Service</Nav.Link>
            <Nav.Link className={styles.navbar_item} href="#products">Products</Nav.Link>
            <Nav.Link className={styles.navbar_item} href="#categories">Categories</Nav.Link>
            <Nav.Link className={styles.navbar_item} href="#review">Review</Nav.Link>
            <Nav.Link className={styles.navbar_item} href="#blogs">Blogs</Nav.Link>
          </Nav>
        <div className={styles.service_icons}>
        <div  id="search-btn">
          <FontAwesomeIcon className={styles.icon} icon={faSearch as IconProp}/>
        </div>
        <div id="cart-btn">
          <FontAwesomeIcon className={styles.icon} icon={faShoppingCart as IconProp}/>
        </div>
        <div  id="login-btn">
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