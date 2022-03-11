import React from "react"
import { getDetail } from "../redux/actions";
import { useDispatch } from "react-redux";
import s from "./searchbar.module.css";

export const Searchbar = ({setFilter}) =>{
    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getDetail(e.target.name.value));
        setFilter(true);
    }

    return(<div className={s.nav}>
        <form  onSubmit={(e) => handleSubmit(e)}>
            <input type='text' className={s.buscador} name="name"/>
            <input type='submit' className={s.btn} value='Buscar'/>
        </form>
        </div>)
}