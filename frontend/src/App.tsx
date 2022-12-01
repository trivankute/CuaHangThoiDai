// for react
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from "react"

// for boot strap
import { Container } from 'react-bootstrap'

// for redux
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
import User from './pages/User/User'
import Profile from './pages/Profile/Profile'
import Transaction from './pages/Transaction/Transaction'
import Password from './pages/Password/Password'
import Manager from './pages/Manager/Manager'
import Upload from './pages/Upload/Upload'
import Transactions from './pages/Transactions/Transactions'
import Customers from './pages/Customers/Customers'
import WriteBlog from './pages/WriteBlog/WriteBlog'
import Sell from './pages/Sell/Sell'
import Employees from './pages/Employees/Employees'
import RegisterEmployee from './pages/RegisterEmployee/RegisterEmployee'
import { useDispatch, useSelector } from 'react-redux'
import { checkMe, getMe } from './redux/slices/UserSlice'
import EmployeeOnly from './middlewares/EmployeeOnly'
import LoggedIn from './middlewares/LoggedIn'
import { UserStore } from './redux/selectors'
import AdminOnly from './middlewares/AdminOnly'
import AdminAndEmployeeOnly from './middlewares/AdminAndEmployeeOnly'

// Private route


function App() {
  const user = useSelector(UserStore)
  const dispatch = useDispatch<any>();
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    // change app title to
    document.title = "TimesRecord"
    // check token if success then get Me
    dispatch(checkMe())
      .then((res: any) => {
        if (res.payload.status === 'success') {
          dispatch(getMe())
        }
        else {
          if (location.pathname.includes("user"))
            navigate('/notification', {
              state: {
                title: "You have to log in first",
                description: "Please go back to home page",
                state: "error",
                btn_title: "Go back",
                btn_path: "/"
              }
            })
        }
      })
  }, [location.pathname])
  return (
    <Container style={{ minHeight: "100vh", margin: 0, padding: 0 }} fluid>
      <Flash></Flash>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />} />
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
        <Route element={<LoggedIn />}>
          <Route path='/user' element={<User />}>
            <Route path='profile' element={<Profile />} />
            <Route path='password' element={<Password />} />
            <Route path='transactions' element={<Transactions />} />
            <Route element={<AdminOnly />}>
              <Route path='employees' element={<Employees />} />
              <Route path='registerEmployee' element={<RegisterEmployee />} />
            </Route>
            <Route element={<AdminAndEmployeeOnly />}>
              <Route path='upload' element={<Upload />} />
              <Route path='customers' element={<Customers />} />
              <Route path='manager' element={<Manager />} />
              <Route path='sell' element={<Sell />} />
            </Route>
            <Route element={<EmployeeOnly />}>
              <Route path='writeblog' element={<WriteBlog />} />
              <Route path='writeblog/preview' element={<Blog />} />
            </Route>
          </Route>
          <Route path='/transactions/:id' element={<Transaction />} />
        </Route>
        <Route path='/notification' element={<PageForNotification />} />
        <Route path="/*" element={<PageNotFound />}></Route>
      </Routes>
      <ChatAppHome />
      <Footer></Footer>
    </Container>
  );
}

export default App;
