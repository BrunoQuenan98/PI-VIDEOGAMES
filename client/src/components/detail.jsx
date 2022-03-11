import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailId, cleanDetail } from "../redux/actions.js";
import s  from "./detail.module.css"
import { Loader } from "./loader.jsx"


export const Detail = () =>{

    const dispatch = useDispatch();
    const {id} = useParams();
    const videogameDetail = useSelector(state => state.videogameDetail)
    let fecha = videogameDetail.date && videogameDetail.date.slice(0,10);
    useEffect(()=>{
        dispatch(getDetailId(id))
        return () => dispatch(cleanDetail());
    },[dispatch,id])
    console.log(videogameDetail);
    return(<>
        {videogameDetail ? (<div className={s.conteiner}>
        <div className={s.imgConteiner}>
        <img className={s.img} src={videogameDetail?.img} alt="imagen_juego"/>
        </div>
        <div className={s.infoConteiner}>
        <h1 className={s.name}>{videogameDetail?.name}</h1>
        <div className={s.atributtesConteiner}>
        <span className={s.span}>Rating: {videogameDetail?.rating}</span>
        <span className={s.span}>Fecha: {fecha}</span>
        </div>
        <h6 className={s.description} dangerouslySetInnerHTML={{__html: videogameDetail.description}}/>
        </div>
    </div>) : <Loader/>}  
    </>)
}