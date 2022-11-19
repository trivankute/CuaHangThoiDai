import {memo} from 'react'
import {Container, Row, Col} from "react-bootstrap"
import styles from "./PageNotFound.module.css"
import Brand from "../../components/Brand/Brand"

function PageNotFound() {
    return (
        <>
        <Container fluid className={styles.container}>
            <Row className={styles.font}>
                    404 Page Not Found  
                <Col className="w-100 d-flex align-items-center mt-3" style={{opacity:0.4}}>
                <Brand logo_content={styles.logo_content} logo_style={styles.logo}></Brand>
                </Col>
            </Row>
            <Row className={styles.font}>
                <div className={styles.seperate}></div>
                    Sorry please go back to the home page.   
            </Row>
            
        </Container>
        </>
    )
}

export default memo(PageNotFound)