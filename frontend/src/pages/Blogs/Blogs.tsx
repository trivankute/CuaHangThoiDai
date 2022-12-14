import { memo, useEffect, useState } from 'react'
import styles from './Blogs.module.css'
import { Container, Pagination } from "react-bootstrap"
import BlogCard from "../../components/Cards/BlogCard/BlogCard"
import { useDispatch, useSelector } from 'react-redux'
import { BlogsStore } from '../../redux/selectors'
import { getAllBlogsByPageId } from '../../redux/slices/BlogsSlice'
import { useLocation, useSearchParams } from 'react-router-dom'
import FlashSlice from '../../redux/slices/FlashSlice'
import PaginationByTotalPage from '../../components/PaginationByTotalPage/PaginationByTotalPage'
import BlogModal from '../../components/BlogModal/BlogModal'
function Blogs() {
    const dispatch = useDispatch<any>();
    const blogs = useSelector(BlogsStore);
    const [forReload, setForReload] = useState(false)
    const location = useLocation()
    // get params from url
    const [url] = useSearchParams()
    let pageId = url.get("page")
    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getAllBlogsByPageId({
            id: pageId,
            blogCount: 4
        }))
        .then((res:any)=>{
        });
        // get state from location
        if(location.state)
        {
            if(location.state.afterSubmitBlog){
                // submit successfully
                dispatch(FlashSlice.actions.handleOpen({message:"Submitted successfully", type:"success"}))
            }
        }
    }, [url, forReload])
    const [showAdjustBlog, setShowAdjustBlog] = useState(false)
    const [blogSelected, setBlogSelected] = useState<any>(false)
    function handleShowAdjustBlog(blog: any) {
        setBlogSelected(blog)
        setShowAdjustBlog(true)
    }
    function handleCloseAdjustBlog() {
        setShowAdjustBlog(false)
    }
    return (<>
        <Container fluid className={styles.container}>
            {
                blogSelected && 
                <BlogModal blog={blogSelected} show={showAdjustBlog} handleClose={handleCloseAdjustBlog} setForReloadPage={setForReload}  />
            }
            {
                blogs.data ? 
                blogs.data.map((blog:any, index:any)=>{
                    return(
                        <BlogCard oldPageId={pageId} blog={blog} handleShowAdjustBlog={handleShowAdjustBlog}/>
                    )
                })
                : null
            }
        </Container>
            {/* add pagination */}
            <PaginationByTotalPage type="blogs" currPage={pageId} basicUrl="/products/blogs?page=" />
    </>)
}

export default memo(Blogs)