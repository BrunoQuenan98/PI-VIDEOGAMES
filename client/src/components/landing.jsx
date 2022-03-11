import React from "react";
import { Link } from "react-router-dom";
import s from "./landing.module.css";

export const Landing = () =>{

    
    
    return(<div className={s.conteiner}>
        <Link className={s.link} to='/home'>
            Videogames APP
        </Link>
    </div>)
}