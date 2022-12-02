import { memo, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AlbumsStore } from '../../redux/selectors';
import { getAlbumsAllPages } from '../../redux/slices/AlbumsSlice';

function PaginationByTotalPage({ currPage, basicUrl }: { currPage: any, basicUrl: any }) {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const [pageTracking, setPageTracking] = useState<any>(false)
    const albums = useSelector(AlbumsStore)
    useEffect(() => {
        function loadToArray(totalPage: any) {
            if (totalPage) {
                console.log(totalPage)
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
        dispatch(getAlbumsAllPages({ albumCount: 8 }))
            .then((res: any) => {
                loadToArray(res.payload.totalPage)
            })
    }, [currPage])
    return (
        <>
            {
                pageTracking &&
                <Pagination>
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
                        pageTracking.length !=1 && currPage != pageTracking.length
                        &&
                        <>
                        <Pagination.Next onClick={() => navigate(`${basicUrl}${parseInt(currPage) + 1}`)} />
                        </>
                    }
                    {
                        pageTracking.length >= 5 && currPage != pageTracking.length
                        &&
                        <>
                            <Pagination.Last onClick={() => navigate(`${basicUrl}${albums.data.totalPage}`)} />
                        </>
                    }


                </Pagination>
            }
        </>
    )
}

export default memo(PaginationByTotalPage)