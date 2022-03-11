import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGenre, getVideogames, orderVideogamesName, orderVideogamesRating, filterGenre, filterOrigin } from "../redux/actions";
import { Cards } from "./cards";
import { Paginado } from "./paginado";
import { Searchbar } from "./searchbar";
import s from "./home.module.css"

export const Home = () =>{

    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
    const videogamesFilter = useSelector(state => state.videogamesFilter);
    const genre = useSelector(state => state.genre);
    const [filter, setFilter] = useState(false);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const lastIndex = gamesPerPage * currentPage;
    const firstIndex = lastIndex - gamesPerPage;
    var allGames = [];
    if(videogamesFilter.length){
        allGames = videogamesFilter;
        
    }else if(filter === true){ 
        allGames = videogames;
        
    }else {
        allGames = videogames;
    }

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }

    useEffect(()=>{
        dispatch(getVideogames());
        dispatch(getGenre());
    },[dispatch])
    
    const handleClickName = (e, string) =>{
        dispatch(orderVideogamesName(string));
    }
    const handleClickRating = (e,string) =>{
        dispatch(orderVideogamesRating(string));
    }
    const handleChangeFilterGenre = (e) =>{
        dispatch(filterGenre(e.target.value));
        setCurrentPage(1);
        setFilter(true);
    }
    const handleChangeFilterOrigin = (e) =>{
        dispatch(filterOrigin(e.target.value));
        setFilter(true);
    }
    const validateCards = () =>{
        if(videogamesFilter.length && Array.isArray(videogamesFilter)){
            allGames = videogamesFilter;
            return <Cards videogames={videogamesFilter?.slice(firstIndex, lastIndex)} />
        }else if(filter === true){ 
            allGames = videogames;
            return(<><span className={s.spanError}>Juego no encontrado</span> <Cards videogames={videogames?.slice(firstIndex,lastIndex)}/> </>)
        }else {
            allGames = videogames;
            return <Cards videogames={videogames?.slice(firstIndex, lastIndex)}/>
        }
    }
   
    return(<div>
        <Searchbar setFilter={setFilter}/>
        
        <div className={s.filtros}>
            <div>
            <span>Ordenar por nombre:</span>
            <button className={s.btn} onClick={(e) => handleClickName(e, 'nombre-asc')}>Asc</button>
            <button className={s.btn} onClick={(e) => handleClickName(e, 'nombre-dsc')}>Dsc</button>
            </div>
            <div>
            <span>Ordenar por rating:</span>
            <button className={s.btn} onClick={(e) => handleClickRating(e, 'rating-asc')}>Asc</button>
            <button className={s.btn} onClick={(e) => handleClickRating(e, 'rating-dsc')}>Dsc</button>
            </div>
            <div>
            <span>Filtros por Genero:</span>
            <select className={s.select} onChange={(e) => handleChangeFilterGenre(e)}>
                <option value="todos">Todos</option>
                {genre.map(g => <option key={g[0].id} value={g[0].name}>{g[0].name}</option>)}
            </select>
            </div>
            <div>
            <span>Filtros por Origen:</span>
            <select className={s.select} onChange={(e) => handleChangeFilterOrigin(e)}>
                <option value="todos">Todos</option>
                <option value="api">Api</option>
                <option value="bd">Bd</option>
            </select>
            </div>
        </div>
        <Paginado paginado={paginado} totalGames={Array.isArray(allGames) ? allGames.length : videogames.length} gamesPerPage={gamesPerPage}/>
        <Link to='/form' className={s.link}>
            <button className={s.crearJuego}>Crear Videogame</button>
        </Link>
        {validateCards()}
    </div>)
}