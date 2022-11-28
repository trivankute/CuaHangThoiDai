import { memo, useState } from 'react'

import styles from './WriteBlog.module.css'

import {Form} from 'react-bootstrap'

function WriteBlog() {
    const [albumImage, setAlbumImage] = useState({file:"", img:""});
    return (
        <>
            <div className={styles.container}>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>Album Image</Form.Label>
                    <Form.Control
                        type="file"
                        required
                        name="file"
                        // @ts-ignore
                        onChange={(e) => { setAlbumImage(() => ({ files: e.target.files, img: URL.createObjectURL(e.target.files[0]) })) }}
                    />
                </Form.Group>

            </div>
        </>
    )
}

export default memo(WriteBlog)