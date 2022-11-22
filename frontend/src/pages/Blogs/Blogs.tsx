import { memo, useEffect } from 'react'
import styles from './Blogs.module.css'
import { Container, Pagination } from "react-bootstrap"
import BlogCard from "../../components/Cards/BlogCard/BlogCard"
import image from "./cd.png"
function Blogs() {
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (<>
        <Container fluid className={styles.container}>
            <BlogCard image={image} title="trivan" description="hi"></BlogCard>
            <BlogCard image={image} title="trivan" description="hi"></BlogCard>
            <BlogCard image={image} title="trivan" description="hi"></BlogCard>
            <BlogCard image={image} title="trivan" description="hi"></BlogCard>
        </Container>
            {/* add pagination */}
            <Pagination className={styles.pagination}>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item >{2}</Pagination.Item>
                <Pagination.Item >{3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{6}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
    </>)
}

export default memo(Blogs)