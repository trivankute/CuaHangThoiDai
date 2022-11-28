import { memo, useState } from 'react'

import styles from './WriteBlog.module.css'

import { Form } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function WriteBlog() {
  const [albumImage, setAlbumImage] = useState({ file: "", img: "" });
  return (
    <>


      <div className={styles.container}>
        <Form.Label>Topic</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Select a topic</option>
          <option value="1">New Music</option>
          <option value="2">Award</option>
          <option value="3">Artist</option>
    </Form.Select>
        <Form.Label>Headline</Form.Label>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Headline"
          className="mb-3"
        >
          <Form.Control as="textarea" placeholder="Leave a comment here" />
        </FloatingLabel>
        <Form.Group className="position-relative mb-3">

          <Form.Label>Blog Image</Form.Label>
          <Form.Control
            type="file"
            required
            name="file"
            // @ts-ignore
            onChange={(e) => { setAlbumImage(() => ({ files: e.target.files, img: URL.createObjectURL(e.target.files[0]) })) }}
          />

        </Form.Group>
<Form.Label>Add content</Form.Label>
        <FloatingLabel controlId="floatingTextarea2" label="content">

          <Form.Control
            as="textarea"
            placeholder="Content"
            style={{ height: '100px' }}
          />
        </FloatingLabel>

      </div>
    </>
  )
}

export default memo(WriteBlog)
