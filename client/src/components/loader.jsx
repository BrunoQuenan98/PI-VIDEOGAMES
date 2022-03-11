import React from "react";
import loader from "./loaderr.gif";
import s from "./loader.module.css";

export const Loader = () =>{

    return (<>
        <img className={s.img} src={loader} alt="imagen" />
    </>)
}