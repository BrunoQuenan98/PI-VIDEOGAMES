import axios from "axios";
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getGenre } from "../redux/actions";
import s from "./form.module.css";
const { REACT_APP_KEY } = process.env;


const validate = (inputs) =>{
    let errors = {};
    if(!inputs.name){ 
        errors.name = 'Name required'
    }
    if(!inputs.rating) {
        errors.rating = 'Field required'
    }else if(isNaN(inputs.rating)){
        errors.rating = 'Debe ingresar unicamente numeros'
    }
    if(!inputs.date) {
        errors.date = 'Field required'
    }
    if(!inputs.description) {
        errors.description = 'Field required'
    }
    if(!inputs.platforms || inputs.platforms.length < 1) {
        errors.platforms = 'Field required'
    }
    if(!inputs.genre || inputs.genre.length < 1) {
        errors.genre = 'Field required'
    }
    return errors
}


export const Form = () =>{

    const history = useNavigate();
    const genres = useSelector(state => state.genre)
    const dispatch = useDispatch();
    const [platforms, setPlatforms] = useState([]);
    const [platformsArray, setPlatformsArr] = useState([]);
    const [genreArray, setGenreArray] = useState([]);
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState(validate(inputs));

    useEffect(()=>{
        dispatch(getGenre());
        return () =>{
            setPlatforms({});
        }
    },[dispatch])

    useEffect(()=>{
        const api = async () =>{
            let json = await axios.get(`https://api.rawg.io/api/platforms?key=${REACT_APP_KEY}`)
            setPlatforms(json.data.results) 
         }
         api();
         
    },[platforms])

     const dropGenre = (e) =>{
         setGenreArray([...genreArray.filter(g => g !== e.textContent)])
         setInputs({...inputs,genre:[...genreArray.filter(g => g !== e.textContent)]})
         setErrors(validate({...inputs,genre:[...genreArray.filter(g => g !== e.textContent)]}))
     }
     const dropPlatform = (e) =>{
         setPlatformsArr([...platformsArray.filter(g => g !== e.textContent)])
         setInputs({...inputs,platforms:[...platformsArray.filter(g => g !== e.textContent)]})
         setErrors(validate({...inputs,platforms:[...platformsArray.filter(g => g !== e.textContent)]}))
     }

    const handleChange = (e) =>{
        if(e.target.name !== 'platforms' && e.target.name !== 'genre'){
        setInputs({...inputs, [e.target.name]: e.target.value})
        setErrors(validate({...inputs, [e.target.name]: e.target.value}));
        }else if(e.target.name === 'platforms'){
        setPlatformsArr([...platformsArray, e.target.value])    
        setInputs({...inputs, [e.target.name]: [...platformsArray,e.target.value]})
        setErrors(validate({...inputs, [e.target.name]: [...platformsArray,e.target.value]}));
        }else{
        setGenreArray([...genreArray, e.target.value])
        setInputs({...inputs,[e.target.name]:[...genreArray, e.target.value]})
        setErrors(validate({...inputs,[e.target.name]:[...genreArray, e.target.value]}))
        }
       
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await axios.post('http://localhost:3001/videogame', inputs);
        history('/home');
    }

    return(<div className={s.conteiner}>
            <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
                <label className={s.label}>Nombre</label>
                {errors.name && <span className={s.error}>{errors.name}</span>}
                <input className={errors.name? s.inputError : s.input} type='text' name="name" onChange={(e) => handleChange(e)}/>
                <label className={s.label}>Descripcion</label>
                {errors.description && <span className={s.error}>{errors.description}</span>}
                <input className={errors.description? s.inputError : s.input} type='text' name="description" onChange={(e) => handleChange(e)}/>
                <label className={s.label}>Rating</label>
                {errors.rating && <span className={s.error}>{errors.rating}</span>}
                <input className={errors.rating? s.inputError : s.input} type='text' name="rating" onChange={(e) => handleChange(e)}/>
                <label className={s.label}>Plataforma</label>
                {errors.platforms && <span className={s.error}>{errors.platforms}</span>}
                <select className={errors.platforms? s.selectError : s.select} name="platforms" onChange={(e) => handleChange(e)}>
                
                {platforms?.map(p =><option className={s.selectOption} value={p.name} key={p.id}>{p.name}</option>)}
                
                </select>
                <div className={s.optionConteiner}>
                {platformsArray.map(p=><span className={s.selectOption} onClick={(e)=>dropPlatform(e.target)} key={p}>{p}</span>)}
                </div>
                <label className={s.label}>Fecha Lanzamiento</label>
                {errors.date && <span className={s.error}>{errors.date}</span>}
                <input type='date' name="date" onChange={(e) => handleChange(e)}/>
                <label className={s.label}>Genero</label>
                {errors.genre && <span className={s.error}>{errors.genre}</span>}
                <select className={errors.genre? s.selectError : s.select} name="genre" onChange={(e) => handleChange(e)}> 
                {genres?.map(g => <option  value={g[0].name} key={g[0].id}>{g[0].name}</option>)}
                </select>
                <div className={s.optionConteiner}>
                {genreArray?.map(g=><span className={s.selectOption} key={g} onClick={(e)=>dropGenre(e.target)}>{g}</span>)}
                </div>
                <label className={s.label}>Imagen</label>
                {!inputs.img && <span className={s.opcion}>Campo opcional</span>}
                <input className={inputs.img ?  s.input: s.inputOpcion} type='text' name="img" onChange={(e) => handleChange(e)}/>
                {Object.keys(errors).length > 0 ? <input type='submit' className={s.submit} disabled={true}/> : <input className={s.submit} type='submit' disabled={false}/>}
            </form>
        </div>)
}