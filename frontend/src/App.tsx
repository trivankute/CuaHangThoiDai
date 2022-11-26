// for react 
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react"

// for boot strap
import { Container } from 'react-bootstrap'
import { Card, Form, Button } from 'react-bootstrap'

// for redux
import { useDispatch } from "react-redux"
import FlashSlice from './redux/slices/FlashSlice'

// for components
import Flash from "./components/Flash/Flash"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import ChatAppHome from './components/ChatAppHome/ChatAppHome'


// for pages
import Home from './pages/Home/Home'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Maintenance from './pages/Maintenance/Maintenance'
import ProductsLayout from './pages/ProductsLayout/ProductsLayout'
import Albums from './pages/Albums/Albums'
import Album from './pages/Album/Album'
import Services from './pages/Services/Services'
import Artists from './pages/Artists/Artists'
import Blogs from './pages/Blogs/Blogs'
import Blog from './pages/Blog/Blog'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import PageForNotification from './pages/PageForNotification/PageForNotification'
import Profile from './pages/Profile/Profile'
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    // change app title to 
    document.title = "TimesRecord"
  },[])
  return (
    <Container style={{ minHeight: "100vh", margin: 0, padding: 0 }} fluid>
      <Flash></Flash>
      {/* <ProductsLayout/> */}

      {/* <Maintenance></Maintenance> */}

      <Header></Header>
      <Routes>
        {/* <Route path='/' element={<GetUser/>}>
        {
          user.mainData ?
          <> */}
        <Route path='/' element={<Home />}>
        </Route>
        <Route path='/products' element={<ProductsLayout />}>
          {/* Albums route */}
          <Route path='albums' element={<Albums />}>
          </Route>
          <Route path='services' element={<Services />}>

          </Route>
          <Route path='artists' element={<Artists />}>

          </Route>
          <Route path='blogs' element={<Blogs />}>

          </Route>
          <Route path='blogs/:blogId' element={<Blog />}>

          </Route>
        </Route>
        <Route path='/products/albums?service=:service' element={<Album />} />
        <Route path='/products/albums?artist=:artist' element={<Album />} />
        {/* album name route */}
        <Route path='/products/albums/:albumName' element={<Album />} />
        {/* cart route */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/notification' element={<PageForNotification />} />
        <Route path="/*" element={<PageNotFound />}></Route>
        {/* <Route path='/logout' element={<Logout/>}/>
            <Route path='/todo' element={<Todo/>}/>
          </>
          :
          localStorage.getItem('todoapp') ?
          <>
            <Route index element={<Loading/>}/>
            <Route path='/logout' element={<Loading/>}/>
            <Route path='/todo' element={<Loading/>}/>
          </> 
          :
          <>
            <Route index element={<Home/>}/>
          </>
        }
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element={<Error/>}/>
        </Route> */}
      </Routes>
      <ChatAppHome />
      <Footer></Footer>
    </Container>
  );
}

export default App;
