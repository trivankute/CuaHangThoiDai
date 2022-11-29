import { memo, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import styles from './WriteBlog.module.css'

import { Form, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function WriteBlog() {
  const navigate = useNavigate()
  const location = useLocation()
  const [albumImage, setAlbumImage] = useState(()=>{
    if(location.state)
    return { file: "", img: location.state.img }
    else
    return {file:"",img:""}
  });
  const [topic, setTopic] = useState(()=>{
    if(location.state)
    return location.state.topic
    else
    return ""
    });
  const [title, setTitle] = useState(()=>{
    if(location.state)
    return location.state.title
    else
    return ""
    });
  const [content, setContent] = useState(()=>{
    if(location.state)
    return location.state.content
    else
    return ""
    });
  function handlePreview() {
    navigate('preview', {state:{
      topic: topic,
      title: title,
      content: content,
      img: albumImage.img
    }})
  }

  function handleSubmit(e:any) {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      albumImage,
      topic,
      title,
      content
    )
  }
  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className={styles.container}>
        <Form>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Topic"
          className="mb-3"
        >
        <Form.Control value={topic} onChange={(e)=>{setTopic(e.target.value)}} as="textarea" placeholder="Topic" />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Headline"
          className="mb-3"
        >
          <Form.Control value={title} onChange={(e)=>{setTitle(e.target.value)}} as="textarea" placeholder="Leave a comment here" />
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
                    {albumImage.img &&
                        <div className="d-flex w-100 mt-3 mb-3" style={{ height: 100 }}>
                            <img src={albumImage.img} />
                        </div>}

        </Form.Group>
        <FloatingLabel controlId="floatingTextarea2" label="content">

          <Form.Control
            as="textarea"
            placeholder="Content"
            value={content}
            onChange={(e)=>{setContent(e.target.value)}}
            style={{ height: '100px' }}
          />
        </FloatingLabel>
        <Button onClick={handlePreview} type="submit" variant="secondary" className="btn_custom btn">
          Preview
        </Button>
        <Button onClick={handleSubmit} type="submit" variant="secondary" className="ms-3 btn_custom btn">
          Submit
        </Button>
        </Form>

      </div>
    </>
  )
}

export default memo(WriteBlog)
