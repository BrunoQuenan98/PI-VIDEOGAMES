import { Link } from "react-router-dom";
import s from "./card.module.css";

export const Card = (props) =>{

    return(<>
    <Link className={s.link} to={`/detail/${props.id}`}>
        <div className={s.cardConteiner}>
            <div className={s.imgConteiner}>
            <img className={s.img} src={props.img} alt="imagen"/>
        </div>
            <h3 className={s.name}>{props.name}</h3>
            <div className={s.genreConteiner}>
            {props.genre?.map(g => g!=='role-playing-games-rpg' && <span className={s.genre} key={g}>{g}</span>)}
            </div>
        </div>
    </Link>
    </>)
}