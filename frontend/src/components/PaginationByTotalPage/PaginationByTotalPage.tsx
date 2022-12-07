import { memo, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AlbumsStore, ArtistsStore, BlogsStore, TransactionsStore } from '../../redux/selectors';
import { getAlbumsTotalPages } from '../../redux/slices/AlbumsSlice';
import { getArtistsTotalPages } from '../../redux/slices/ArtistsSlice';
import { getBlogsTotalPages } from '../../redux/slices/BlogsSlice';
import { getTransactionsTotalPage } from '../../redux/slices/TransactionsSlice';
function PaginationByTotalPage({ type, currPage, basicUrl }: { type: any, currPage: any, basicUrl: any }) {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const [pageTracking, setPageTracking] = useState<any>(false)
    const albums = useSelector(AlbumsStore)
    const blogs = useSelector(BlogsStore)
    const artists = useSelector(ArtistsStore)
    const transactions = useSelector(TransactionsStore)
    useEffect(() => {
        function loadToArray(totalPage: any) {
            if (totalPage) {
                if (totalPage == 1)
                    setPageTracking(["active"])
                else if (totalPage == 2) {
                    if (currPage == 1)
                        setPageTracking(["active", "2"])
                    else setPageTracking(["1", "active"])
                }
                else if (totalPage == 3) {
                    if (currPage == 1)
                        setPageTracking(["active", "2", "3"])
                    else if (currPage == 2)
                        setPageTracking(["1", "active", "3"])
                    else setPageTracking(["1", "2", "active"])
                }
                else if (totalPage == 4) {
                    if (currPage == 1)
                        setPageTracking(["active", "2", "3", "4"])
                    else if (currPage == 2)
                        setPageTracking(["1", "active", "3", "4"])
                    else if (currPage == 3)
                        setPageTracking(["1", "2", "active", "4"])
                    else setPageTracking(["1", "2", "3", "active"])
                }
                else {
                    // 5 cases
                    if (currPage == 1) {
                        setPageTracking(["active", "2", "3", "...", "totalPage"])
                    }
                    else if (currPage == 2) {
                        setPageTracking(["1", "active", "3", "4", "..."])
                    }
                    else if (currPage == totalPage - 1) {
                        setPageTracking(["...", currPage - 2, currPage - 1, "active", totalPage])
                    }
                    else if (currPage == totalPage) {
                        setPageTracking(["...", currPage - 3, currPage - 2, currPage - 1, "active"])
                    }
                    else {
                        setPageTracking(["...", currPage - 1, "active", currPage + 1, "..."])
                    }
                }
            }
        }
        if (type === "albumsWithSearch")
            loadToArray(albums.totalPages)
        else if (type === "albums")
            dispatch(getAlbumsTotalPages({ albumCount: 8 }))
                .then((res: any) => {
                    loadToArray(res.payload.totalPage)
                })
        else if (type === "blogs")
            dispatch(getBlogsTotalPages({ blogCount: 6 }))
                .then((res: any) => {
                    loadToArray(res.payload.totalPage)
                })
        else if (type === "artists")
            dispatch(getArtistsTotalPages({ artistCount: 8 }))
                .then((res: any) => {
                    loadToArray(res.payload.totalPage)
                })
        else if (type === "transactions")
            loadToArray(transactions.totalPage)
        else if (type="transactions_employee")
        {
            dispatch(getTransactionsTotalPage({
                transactionCount: 10,
            }))
                .then((res: any) => {
                    loadToArray(res.payload.totalPage)
                })
        }
            
    }, [currPage])
    return (
        <>
            {
                pageTracking &&
                <Pagination className="w-100 offset-10 mt-3">
                    {
                        pageTracking.length >= 5 && currPage != 1
                        &&
                        <>
                            <Pagination.First onClick={() => navigate(`${basicUrl}1`)} />
                        </>
                    }
                    {
                        pageTracking.length != 1 && currPage != 1
                        &&
                        <>
                            <Pagination.Prev onClick={() => navigate(`${basicUrl}${parseInt(currPage) - 1}`)} />
                        </>
                    }
                    {
                        pageTracking.map((item: any, index: any) => {
                            if (item == "active")
                                return <Pagination.Item key={index} active>{currPage}</Pagination.Item>
                            else if (item == "...")
                                return <Pagination.Ellipsis key={index} />
                            else return <Pagination.Item key={index} onClick={() => navigate(`${basicUrl}${item}`)}>{item}</Pagination.Item>
                        })
                    }
                    {
                        pageTracking.length != 1 && currPage != pageTracking.length
                        &&
                        <>
                            <Pagination.Next onClick={() => navigate(`${basicUrl}${parseInt(currPage) + 1}`)} />
                        </>
                    }
                    {
                        pageTracking.length >= 5 && currPage != pageTracking.length
                        &&
                        <>
                            {
                                type === "albums" &&
                                <Pagination.Last onClick={() => navigate(`${basicUrl}${albums.data.totalPage}`)} />
                            }
                            {
                                type === "blogs" &&
                                <Pagination.Last onClick={() => navigate(`${basicUrl}${blogs.data.totalPage}`)} />
                            }
                            {
                                type === "artists" &&
                                <Pagination.Last onClick={() => navigate(`${basicUrl}${artists.data.totalPage}`)} />
                            }
                            {
                                type === "albumsWithSearch" &&
                                <Pagination.Last onClick={() => navigate(`${basicUrl}${albums.totalPages}`)} />
                            }
                            {
                                type === "transactions" &&
                                <Pagination.Last onClick={() => navigate(`${basicUrl}${transactions.totalPage}`)} />
                            }
                            {
                                type === "transactions_employee" &&
                                <Pagination.Last onClick={() => navigate(`${basicUrl}${transactions.totalPage}`)} />
                            }
                        </>
                    }


                </Pagination>
            }
        </>
    )
}

export default memo(PaginationByTotalPage)