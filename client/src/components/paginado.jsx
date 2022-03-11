import React from "react";
import s from "./paginado.module.css";

export const Paginado = ({paginado, totalGames, gamesPerPage}) =>{
    console.log(totalGames)
    //SOLUCIONAR PAGINADO
    let pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalGames/gamesPerPage); i++) {
        pageNumbers.push(i);   
    }

    return(<ul className={s.conteiner}>
        {pageNumbers.map(p =><li key={p} className={s.li}><button className={s.btn} onClick={(e) => paginado(p)}>{p}</button></li>)}
    </ul>)
}