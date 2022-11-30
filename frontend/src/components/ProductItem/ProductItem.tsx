// import {memo, useState} from 'react';

// import styles from './ProductItem.module.css';

// import image from './cd.png'

// function ProductItem() {
//     const [price, setPrice] = useState("")
//     const [quantity, setQuantity] = useState("")
//     const [name, setName] = useState("")
//     const [description, setDescription] = useState("")
//     // const [image, setImage] = useState("")
//     const [category, setCategory] = useState("")
//     return (
//         <>
//         <div className={styles.box}>
//             <img src={image} alt=""></img>
//             <div className={styles.content}>
//                 <h3>{name}</h3>
//                 <span>${price}</span>
//                     <span>Quantity: 2</span>
//                     :
//                     <div className={styles.quantity}>
//                         <div className={styles.quantity_box}>{quantity}</div>
//                     </div>
//             </div>
//                 <FontAwesomeIcon className={clsx(styles.icon, "ms-3")} icon={faTrash as IconProp} />
//                 <FontAwesomeIcon className={clsx(styles.icon, "ms-3")} icon={faPlus as IconProp} />
//         </div>
//         </>
//     )
// }

// export default memo(ProductItem)