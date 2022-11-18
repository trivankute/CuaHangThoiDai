import {memo} from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {Container} from 'react-bootstrap'
function Layout() {
    return (
        <Container className="d-flex flex-column">
            <Header/>
            <Outlet/>
            <Footer/>
        </Container>
    )
}

export default memo(Layout)