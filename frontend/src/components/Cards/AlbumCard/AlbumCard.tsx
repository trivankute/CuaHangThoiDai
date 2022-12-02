import { memo, } from 'react';
import { useNavigate } from "react-router-dom"

import styles from './AlbumCard.module.css';

import CreateStars from "../../CreateStars/CreateStars"

function AlbumCard({ album_id, image, title, price }: { album_id:any, image: any, title: any, price: any }) {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.box}>
                <>
                    <img src={image} alt=""></img>
                    <h3 >{title}</h3>
                    <div > ${price} </div>
                    {/* <div className={styles.stars}>
                        {CreateStars(rating)}
                    </div> */}
                    <button onClick={() => { navigate(`/products/albums/${album_id}`) }} type="button" className="btn btn_custom" name="button">Click To See</button>
                </>
            </div>
        </>
    )
}

export default memo(AlbumCard)