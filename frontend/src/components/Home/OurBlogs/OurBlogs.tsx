import { memo } from 'react'
import styles from "./OurBlogs.module.css"
import image from "./cd.png"
import BlogCard from "../../Cards/BlogCard/BlogCard"

function OurBlogs() {
    return (
        <>
            <div className={styles.box_container}>
                <BlogCard image={image} title={"Midnight 🌟"} description={"“Midnights” has reached 100 #1's on Apple Music around the world. Itʼs Taylor’s first album to reach this milestone."}/>
                <BlogCard image={image} title={"Midnight 🌟"} description={"“Midnights” has reached 100 #1's on Apple Music around the world. Itʼs Taylor’s first album to reach this milestone."}/>
                <BlogCard image={image} title={"Midnight 🌟"} description={"“Midnights” has reached 100 #1's on Apple Music around the world. Itʼs Taylor’s first album to reach this milestone."}/>
            </div>
        </>
    )
}

export default memo(OurBlogs)