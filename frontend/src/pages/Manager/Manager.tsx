import { memo, useEffect, useState } from 'react'

import styles from "./Manager.module.css"

import Header from "../../components/User/Header/Header"

import clsx from 'clsx'
import ProductItem from '../../components/ProductItem/ProductItem'
import { Button, Form } from 'react-bootstrap'
import Warning from '../../components/Warning/Warning'
import ProductModal from '../../components/ProductModal/ProductModal'
import { useDispatch, useSelector } from 'react-redux'
import { AlbumsStore } from '../../redux/selectors'
import { getAllAlbumsByPageIdAndTitle } from '../../redux/slices/AlbumsSlice'

function Manager() {
    const dispatch = useDispatch<any>()
    const albums = useSelector(AlbumsStore)
    const [isWarning, setIsWarning] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [albumSelected, setAlbumSelected] = useState(false)
    const [title, setTitle] = useState("")
    function handleWarningShow() {
        setIsWarning(true);
    }
    function handleWarningClose() {
        setIsWarning(false);
    }
    function handleEditShow(album:any) {
        setEditMode(true);
        setAlbumSelected(album);
    }
    function handleEditClose() {
        setEditMode(false);
    }
    function handleSearch() {
        dispatch(getAllAlbumsByPageIdAndTitle({id:1, albumCount:5, title:title}))
    }
    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={styles.container}>
                <Header title="Store Manager" content="Manage your products" />
                <Warning show={isWarning} handleShow={handleWarningShow} handleClose={handleWarningClose} />
                {
                    editMode &&
                    <ProductModal show={editMode}
                        handleClose={handleEditClose} album={albumSelected}/>
                }
                <div>
                    <Form onSubmit={(e:any)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        handleSearch()
                    }} className="d-flex mt-3 mb-3">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={title}
                            onChange={(e:any)=>{
                                setTitle(e.target.value)
                            }}
                        />
                        <Button onClick={handleSearch} variant="outline-success">Search</Button>
                    </Form>
                </div>
                <div>
                    Search for "{title}":
                </div>
                <div className={styles.searchResults}>
                    {
                        albums.data &&
                        <>
                            {
                                albums.data.length === 0 ?
                                    <div className="mt-3" style={{ color: "var(--light-color)" }}>
                                        Nothing
                                    </div>
                                    :
                                    albums.data.map((album: any, index: number) => {
                                        return <ProductItem handleWarningShow={handleWarningShow} handleEditShow={handleEditShow} key={index} album={album} />
                                    })
                            }
                        </>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default memo(Manager)