import { memo, useEffect } from 'react';
import BackNavigate from '../../components/BackNavigate/BackNavigate';
import Brand from '../../components/Brand/Brand';

import styles from "./AboutUs.module.css";

function AboutUs() {
    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={styles.container}>
            <BackNavigate backPath="/" backPage="Home" currentPage="About us"/>
            <h1>About Us</h1>
            <p style={{textTransform: "none" }} className={styles.content}>
            Với chúng tôi, âm nhạc luôn là người bạn thân cận với mỗi chúng ta. Dẫu vui hay buồn, âm nhạc luôn là một hộp chứa thần kì ôm trộn cảm xúc của ta.
            </p>
            <p style={{textTransform: "none" }} className={styles.content}>
            Hiểu được tinh thân đó, Hãng đĩa thời đại cung cấp những dịch vụ giúp bạn có một trải nghiệm âm nhạc tuyệt vời nhất.
            </p>
            <p style={{textTransform: "none" }} className={styles.content}>
            Chúng tôi liên kết với nhà phát hành uy tín trên thế giới như Sony Music, Universal Label nhằm cung cấp sản phẩm âm nhạc của các ca sĩ hàng đầu thế giới.  Dù là CD, Vinyl, Cassettes, dẫu là bạn cần chúng tôi sẽ luôn cung cấp.
            </p>
            <Brand/>
            <div className="mb-3"></div>
        </div>
    );
}

export default memo(AboutUs);