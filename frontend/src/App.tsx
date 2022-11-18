// for react 
import {Routes, Route} from 'react-router-dom'
import {useState} from "react"

// for boot strap
import {Container} from 'react-bootstrap'
import {Card, Form, Button} from 'react-bootstrap'

// for redux
import {useDispatch} from "react-redux"
import FlashSlice from './redux/slices/FlashSlice'

// for components
import Flash from "./components/Flash/Flash"
import Layout from "./components/Layout/Layout"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

// for pages
import Home from './pages/Home/Home'
function App() {
  const dispatch = useDispatch();
  return (
    <Container style={{ minHeight:"100vh", margin:0, padding:0}} fluid>
      <Flash></Flash>
      <Header></Header>
      <Home/>
      <Footer></Footer>

      {/* <Routes> */}
        {/* <Route path='/' element={<GetUser/>}>
        {
          user.mainData ?
          <> */}
          {/* <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
          </Route> */}
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
      {/* </Routes> */}
    </Container>
  );
}

export default App;
