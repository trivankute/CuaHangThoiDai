import {memo} from 'react'
import {Container, Row, Col} from "react-bootstrap"
import Brand from "../../components/Brand/Brand"
import styles from "./Maintenance.module.css"

function Maintenance() {
    return (
        <>
        <Container fluid className={styles.container}>
            <Row className={styles.font}>
            Server is under maintenance
            <Col className="w-100 d-flex align-items-center mt-3" style={{opacity:0.4}}>
            <Brand logo_content={styles.logo_content} logo_style={styles.logo}></Brand>
            </Col>
            </Row>
            <Row className={styles.font}>
                <div className={styles.seperate}></div>
                    Sorry please come back later.   
            </Row>
        </Container>
        </>
    )
}

export default memo(Maintenance)