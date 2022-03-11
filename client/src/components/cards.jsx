import React from "react";
import { Card } from "./card.jsx";
import s from "./cards.module.css";
import { Loader } from "./loader.jsx";


export const Cards = ({videogames, span}) =>{

    console.log(videogames)
    return(<>
        {span !== null && span}
        
        {Array.isArray(videogames) && videogames.length > 0 ? <div className={s.cardsConteiner}> {videogames.map(g => <Card key={g.id} id={g.id} name={g.name}img={g.img} genre={g.genre}/>)} </div> : <Loader/>}
        
        </>)
}