import { memo, useEffect } from 'react'
import styles from './Blogs.module.css'
import { Container, Pagination } from "react-bootstrap"
import BlogCard from "../../components/Cards/BlogCard/BlogCard"
import image from "./cd.png"
import { useDispatch, useSelector } from 'react-redux'
import { BlogsStore } from '../../redux/selectors'
import { getAllBlogs } from '../../redux/slices/BlogsSlice'
function Blogs() {
    const dispatch = useDispatch<any>();
    const blogs = useSelector(BlogsStore);
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getAllBlogs())
        .then((res:any)=>{
        });
    }, [])
    console.log(blogs);
    return (<>
        <Container fluid className={styles.container}>
            {/* <BlogCard image={image} title="trivan" description="hi"></BlogCard>
            <BlogCard image={image} title="trivan" description="hi"></BlogCard>
            <BlogCard image={image} title="trivan" description="hi"></BlogCard>
            <BlogCard image={image} title="trivan" description="hi"></BlogCard> */}
            {
                blogs.data ? 
                blogs.data.map((blog:any, index:any)=>{
                    return(
                        <BlogCard key = {index} image={blog.avatar} title={blog.title} description={blog.description} />
                    )
                })
                : null
            }
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