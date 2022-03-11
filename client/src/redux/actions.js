import { GET_VIDEOGAMES, GET_DETAIL, GET_GENRE, ORDER_VIDEOGAME_NAME, ORDER_VIDEOGAME_RATING, FILTER_GENRE, FILTER_ORIGIN, GET_DETAIL_ID, CLEAN_DETAIL } from './const.js';
import axios  from 'axios';

export const cleanDetail = () =>{
    return{type:CLEAN_DETAIL}
}

export const getVideogames = () =>{
    return async function(dispatch){
    let json = await axios.get('http://localhost:3001/videogames')
    return dispatch({type:GET_VIDEOGAMES, payload:json.data})
}
}

export const getDetail = (payload) =>{
    return async function(dispatch){
        try{
        let json = await axios.get(`http://localhost:3001/videogames?name=${payload}`)
        return dispatch({type:GET_DETAIL, payload:json.data})
        }catch(e){
        return dispatch({type:'error', payload})    
        }
    }
}

export const getGenre = () =>{
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/genres')
        return dispatch({type:GET_GENRE, payload:json.data})
    }
}

export const getDetailId = (payload) =>{
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/videogame/${payload}`)
        return dispatch({type:GET_DETAIL_ID, payload:json.data})
    }
}

export const orderVideogamesName = (payload) =>{
    return {type: ORDER_VIDEOGAME_NAME, payload}
}

export const orderVideogamesRating = (payload) =>{
    return {type: ORDER_VIDEOGAME_RATING, payload}
}

export const filterGenre = (payload) =>{
    return{type:FILTER_GENRE, payload}
}

export const filterOrigin = (payload) =>{
    return{type:FILTER_ORIGIN, payload}
}


