import {memo, } from 'react';
import {useNavigate} from "react-router-dom"

import styles from './AlbumCard.module.css';

import CreateStars from "../../CreateStars/CreateStars"
import Loading from '../../Loading/Loading'

function AlbumCard({image, title, price, rating}:{image:any, title:any, price:any, rating:any}) {
    const navigate = useNavigate();
    return (
        <>
        <div className={styles.box}>
            <Loading/>
            <img src={image} alt=""></img>
            <h3 >{title}</h3>
            <div > ${price} </div>
            <div className={styles.stars}>
                {CreateStars(rating)}
            </div>
            <button onClick={()=>{navigate('/products/albums/1')}} type="button" className="btn btn_custom" name="button">Click To See</button>
        </div>
        </>
    )
}

export default memo(AlbumCard)