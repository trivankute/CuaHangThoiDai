import { memo } from 'react';
import { Container, Carousel } from "react-bootstrap"
import "../../globalCss.css"
import styles from "./Home.module.css"
import image1 from "./30-cover.png"
import image2 from "./link-cover.png"
import image3 from "./midnight-cover.png"
import image4 from "./min.png"

import ServiceCards from "../../components/Home/ServiceCards/ServiceCards"
import FavoriteAlbums from '../../components/Home/FavoriteAlbums/FavoriteAlbums';
import OutstandingArtist from '../../components/Home/OutstandingArtist/OutstandingArtist';
import CustomerReview from '../../components/Home/CustomerReview/CustomerReview';
import OurBlogs from '../../components/Home/OurBlogs/OurBlogs';
import More from '../../components/More/More';

import clsx from "clsx"

function Home() {

  return (
    <div>
    <Container fluid className={styles.container}
    >
      <section id="home" className={styles.section}>
      <Carousel className={styles.carousel}>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={image1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={image2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={image3}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={image4}
            alt="Fourth slide"
          />
        </Carousel.Item>
      </Carousel>
      </section>

      <section id="service" className={styles.section}>
        <h1 className={styles.heading}>
          Our <span>Service</span>
        </h1>
        <ServiceCards/> 
        <More urlDirection="services" />
      </section>

      <section id="products" className={styles.section}>
      <h1 className={styles.heading}>
        Favorite <span>Album</span>
      </h1>
      <FavoriteAlbums/>
        <More urlDirection="albums?page=1"/>
      </section>

      <section id="categories" className={styles.section}>
      <h1 className={styles.heading}>
        Outstanding <span>Artist</span>
      </h1>
      <OutstandingArtist/>
        <More urlDirection="artists?page=1"/>
      </section>

      <section id="review" className={styles.section}>
      <h1 className={styles.heading}>
        Customer's <span>Review</span>
      </h1>
      <CustomerReview/>
      </section>

      <section id="blogs" className={clsx(styles.section, "pb-3")}>
      <h1 className={styles.heading}>
        Our <span>Blogs</span>
      </h1>
      <OurBlogs/>
        <More urlDirection="blogs?page=1"/>
      </section>
    </Container>
    </div>
  )
}

export default memo(Home);