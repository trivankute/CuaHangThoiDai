import { memo, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import styles from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { Nav, Navbar, Container, Form } from "react-bootstrap"
import "../../globalCss.css"
import clsx from "clsx"

import Brand from '../Brand/Brand';

import LogInButtonAndModal from "../LogInButtonAndModal/LogInButtonAndModal"
import RegisterButtonAndModal from '../RegisterButtonAndModal/RegisterButtonAndModal';
import Cart from '../Cart/Cart';

import { useSelector, useDispatch } from 'react-redux'
import { UserStore } from '../../redux/selectors';
import { logout } from '../../redux/slices/UserSlice'
import FlashSlice from '../../redux/slices/FlashSlice'
import CartSlice from '../../redux/slices/CartSlice'
import SellSlice from '../../redux/slices/SellSlice'
import PlayMusic from '../PlayMusic/PlayMusic';

function Header() {
  const dispatch = useDispatch<any>();
  const [search, setSearch] = useState("")
  const user = useSelector(UserStore)

  // navigate
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);


  const [showRegister, setShowRegister] = useState(false);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);
  // for responsive
  const [res, setRes] = useState(() => {
    if (window.innerWidth < 990) {
      return true;
    }
    return false;
  })
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 990) {
        setRes(true);
      } else {
        setRes(false);
      }
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const handleLogout = async () => {
    dispatch(logout())
      .then((res: any) => {
        if (res.payload.status === "success") {
          dispatch(FlashSlice.actions.handleOpen({ message: "Logout successfully", type: "success" }))
          navigate('/')
          // clear cart
          dispatch(CartSlice.actions.handleClearCart(""))
          // clear sell
          dispatch(SellSlice.actions.handleClearAllSellItem(""))

        }
      })
  }
  function handleSearch() {
    navigate(`/products/albums?title=${search}&&page=1`)
    setSearch("")
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className={styles.navbar}>
        <Container>
          {res ? <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            {/* audio */}
            <PlayMusic />
            <div className={styles.service_icons}>
              <div id="login-btn" className={clsx(styles.icon_box, styles.login_box)}>
                {
                  user.data ?
                    <>
                      <img className={styles.icon_loggedIn} src={user.data.account.avatar} alt="" />
                      <div className={clsx(styles.login_box_hover, styles.loggedIn)}>
                        <a onClick={() => { navigate('/user/profile') }} className={styles.login_box_hover_link}>Profile</a>
                        <a onClick={() => { navigate('/user/transactions?page=1') }} className={styles.login_box_hover_link}> Transaction history</a>
                        <a className={styles.login_box_hover_link} onClick={handleLogout} > Log out</a>
                      </div>
                    </>
                    :
                    <>
                      <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} />
                      <div className={styles.login_box_hover}>
                        <RegisterButtonAndModal type="customer" linkStyle={styles.login_box_hover_link}
                          showRegister={showRegister} handleShowRegister={handleShowRegister}
                          handleCloseRegister={handleCloseRegister} handleShowLogin={handleShowLogin}
                        />
                        <div className={styles.seperate}>|</div>
                        <LogInButtonAndModal showLogin={showLogin} handleShowLogin={handleShowLogin}
                          handleCloseLogin={handleCloseLogin} handleShowRegister={handleShowRegister}
                          linkStyle={styles.login_box_hover_link} />
                      </div>
                    </>
                }

              </div>
              <Cart />
              {/* log in r */}
            </div>
            <Navbar.Collapse id="responsive-navbar-nav" >
              <div className="me-auto d-flex flex-column w-100 justify-content-center">
                <div className="d-flex justify-content-center align-items-center">
                  <Form 
                      onSubmit={(e:any)=>{
                        e.preventDefault()
                        e.stopPropagation()
                        handleSearch()
                      }} className={styles.search}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      value={search}
                      onChange={(e) => { setSearch(e.target.value) }}
                      style={{ margin: "0px", textTransform: "none" }}
                    />
                  </Form>
                  <div id="search-btn" className={clsx(styles.icon_box, styles.search_box)}>
                    <FontAwesomeIcon onClick={handleSearch} className={styles.icon} icon={faSearch as IconProp} />
                  </div>
                </div>
                <Nav className="w-100 d-flex justify-content-center">
                  <Nav.Link
                    onClick={() => { navigate('/') }}
                    className={styles.navbar_item} href="/#home">Home</Nav.Link>
                  <Nav.Link
                    onClick={() => { navigate('/') }} className={styles.navbar_item} href="/#service">Service</Nav.Link>
                  <Nav.Link
                    onClick={() => { navigate('/') }} className={styles.navbar_item} href="/#products">Products</Nav.Link>
                  <Nav.Link
                    onClick={() => { navigate('/') }} className={styles.navbar_item} href="/#categories">Categories</Nav.Link>
                  <Nav.Link
                    onClick={() => { navigate('/') }} className={styles.navbar_item} href="/#review">Review</Nav.Link>
                  <Nav.Link
                    onClick={() => { navigate('/') }} className={styles.navbar_item} href="/#blogs">Blogs</Nav.Link>
                    <Nav.Link
                      onClick={() => { navigate('/aboutus') }} className={styles.navbar_item} >AboutUs</Nav.Link>
                </Nav>
              </div>
              <Navbar.Brand
                onClick={() => { navigate("/") }}
                href="#home">
                <Brand brand_style={styles.navbar_brand} logo_style={styles.logo_style} logo_content={styles.logo_content} />
              </Navbar.Brand>
            </Navbar.Collapse>
          </>
            :
            <>
              <div className="d-flex flex-column align-items-center justify-content-around">
                <Navbar.Brand
                  onClick={() => { navigate("/") }}
                  href="#home">
                  <Brand brand_style={styles.navbar_brand} logo_style={styles.logo_style} />
                </Navbar.Brand>
                <PlayMusic />
              </div>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" >
                <div className="me-auto d-flex flex-column w-100 justify-content-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <Form 
                      onSubmit={(e:any)=>{
                        e.preventDefault()
                        e.stopPropagation()
                        handleSearch()
                      }} className={styles.search}>
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        style={{ margin: "0px", textTransform: "none" }}
                      />
                    </Form>
                    <div id="search-btn" className={clsx(styles.icon_box, styles.search_box)}>
                      <FontAwesomeIcon onClick={handleSearch} className={styles.icon} icon={faSearch as IconProp} />
                    </div>
                  </div>
                  <Nav className="w-100 d-flex justify-content-center">
                    <Nav.Link
                      onClick={() => { navigate('/') }}
                      className={styles.navbar_item} href="/#home">Home</Nav.Link>
                    <Nav.Link
                      onClick={() => { navigate('/') }} className={styles.navbar_item} href="/#service">Service</Nav.Link>
                    <Nav.Link
                      onClick={() => { navigate('/') }} className={styles.navbar_item} href="/#products">Products</Nav.Link>
                    <Nav.Link
                      onClick={() => { navigate('/') }} className={styles.navbar_item} href="/#categories">Categories</Nav.Link>
                    <Nav.Link
                      onClick={() => { navigate('/') }} className={styles.navbar_item} href="/#review">Review</Nav.Link>
                    <Nav.Link
                      onClick={() => { navigate('/') }} className={styles.navbar_item} href="/#blogs">Blogs</Nav.Link>
                      <Nav.Link
                        onClick={() => { navigate('/aboutus') }} className={styles.navbar_item} >AboutUs</Nav.Link>
                  </Nav>
                </div>
              </Navbar.Collapse>
              <div className={styles.service_icons}>
                <Cart />
                <div id="login-btn" className={clsx(styles.icon_box, styles.login_box)}>
                  {
                    user.data ?
                      <>
                        <img className={styles.icon_loggedIn} src={user.data.account.avatar} alt="" />
                        <div className={clsx(styles.login_box_hover, styles.loggedIn)}>
                          <a onClick={() => { navigate('/user/profile') }} className={styles.login_box_hover_link}>Profile</a>
                          <a onClick={() => { navigate('/user/transactions?page=1') }} className={styles.login_box_hover_link}> Transaction history</a>
                          <a className={styles.login_box_hover_link} onClick={handleLogout} > Log out</a>
                        </div>
                      </>
                      :
                      <>
                        <FontAwesomeIcon className={styles.icon} icon={faUser as IconProp} />
                        <div className={styles.login_box_hover}>
                          <RegisterButtonAndModal type="customer" linkStyle={styles.login_box_hover_link}
                            showRegister={showRegister} handleShowRegister={handleShowRegister}
                            handleCloseRegister={handleCloseRegister} handleShowLogin={handleShowLogin}
                          />
                          <div className={styles.seperate}>|</div>
                          <LogInButtonAndModal showLogin={showLogin} handleShowLogin={handleShowLogin}
                            handleCloseLogin={handleCloseLogin} handleShowRegister={handleShowRegister}
                            linkStyle={styles.login_box_hover_link} />
                        </div>
                      </>
                  }
                </div>

                {/* log in r */}
              </div>
            </>
          }

        </Container>
      </Navbar>
    </div>
  )
}
export default memo(Header)