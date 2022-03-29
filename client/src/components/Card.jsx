import react from "react";
import style from './Card.module.css'


export default function Card({ name, img, genres, id, rating}) {
    
return(
<div className={style.card}>
    <h2>{name}</h2>
    <h3>{genres}</h3>
    <h4>{rating}</h4>

<img src={img} alt='img not found' />
</div>
)
}