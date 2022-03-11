import { GET_DETAIL, GET_VIDEOGAMES, GET_GENRE, ORDER_VIDEOGAME_NAME, ORDER_VIDEOGAME_RATING, FILTER_GENRE, FILTER_ORIGIN, GET_DETAIL_ID, CLEAN_DETAIL } from "./const";

const initialState = {
    videogames:[],
    videogameDetail:{},
    genre:[],
    videogamesFilter:[]
}

export function rootReducer(state = initialState, action){
    switch(action.type){
        case CLEAN_DETAIL:
            return{...state, videogameDetail:{}};
        case GET_DETAIL_ID:
            return{...state, videogameDetail:action.payload};
        case GET_VIDEOGAMES:
            return {...state, videogames:action.payload};
        case GET_DETAIL:
            return{...state,videogamesFilter:action.payload};
        case GET_GENRE:
            return{...state, genre:action.payload};
        case ORDER_VIDEOGAME_NAME:
            let copyVideogamess = [...state.videogames];
            let copyVideogamesss = [...state.videogamesFilter];
            let videogamesOrdered =  copyVideogamess.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    if(action.payload === 'nombre-asc'){
                        return -1
                    }else{
                        return 1
                    }
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    if(action.payload === 'nombre-dsc'){
                        return -1
                    }else{
                        return 1
                    }
                }              
                return 0;
                });
            let vvideogamesOrdered =  copyVideogamesss?.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        if(action.payload === 'nombre-asc'){
                            return -1
                        }else{
                            return 1
                        }
                    }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        if(action.payload === 'nombre-dsc'){
                            return -1
                        }else{
                            return 1
                        }
                    }              
                    return 0;
                    });    
                return {...state, videogames:videogamesOrdered, videogamesFilter: vvideogamesOrdered}         
        case ORDER_VIDEOGAME_RATING:
            let copyVideogames = [...state.videogames];
            let copyFilter = [...state.videogamesFilter];
            let videogamesOrder = copyVideogames.sort(function (a, b) {
                if (a.rating < b.rating) {
                    if(action.payload === 'rating-asc'){
                        return -1
                    }else{
                        return 1
                    }
                }
                if (a.rating > b.rating) {
                    if(action.payload === 'rating-dsc'){
                        return -1
                    }else{
                        return 1
                    }
                }              
                return 0;
                });
                let videogameOrder = copyFilter?.sort(function (a, b) {
                    if (a.rating < b.rating) {
                        if(action.payload === 'rating-asc'){
                            return -1
                        }else{
                            return 1
                        }
                    }
                    if (a.rating > b.rating) {
                        if(action.payload === 'rating-dsc'){
                            return -1
                        }else{
                            return 1
                        }
                    }              
                    return 0;
                    });

                return {...state, videogames:videogamesOrder, videogamesFilter: videogameOrder}
            case FILTER_GENRE:
                let copyGames = [...state.videogames];
                let gamesFiltered = copyGames.filter(g => g.genre.includes(action.payload));
                return {...state, videogamesFilter : action.payload === 'todos' ? copyGames : gamesFiltered};
            case FILTER_ORIGIN:
                let copyG = [...state.videogames];
                let gameFiltered = action.payload === 'api' ? copyG.filter(g => Number(g.id)) : copyG.filter(g => isNaN(g.id));
                return {...state, videogamesFilter : action.payload === 'todos' ? copyG : gameFiltered};        
        default:return state;
    }
      
}