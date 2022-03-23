const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const { KEY } = process.env;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function getApiInfo(){
        let arr = [1,2,3,4,5]
        arr = await Promise.all(arr.map(async num =>{
            let json = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page=${num}`);
            return json.data.results
        }))

    return await  Promise.all(arr.flat().map(async game => {
        let description = await axios.get(`http://localhost:3001/videogame/${game.id}`)
        description = description.data.description;
       return { id:game.id, 
        name:game.slug,
        description:description,
        date:game.released,
        rating:game.rating,
        platforms:game.platforms.map(platform => platform.platform.slug),
        genre:game.genres.map(g => g.slug),
        img: game.short_screenshots[0].image
       }
    }));
}

//coment
router.get('/videogames', async (req, res) =>{
    const { name } = req.query;
    if(name){
        try{
        let json = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${KEY}`)
        let gamesApi = json.data.results.slice(0,15).map(g =>{ 
            return{
            id:g.id, 
            name:g.slug,
            genre: g.genres.map(ge => ge.slug),
            img: g.background_image,
            rating: g.rating
        }});
        let gamesBd = await Videogame.findAll({where:{name: name.toLowerCase()}, include:{model:Genre}})
        gamesBd = gamesBd.map(g => {
            return{
                id: g.id,
                name:g.name,
                genre:g.genres.map(ge => ge.name),
                img:g.img,
                rating:g.rating
            }
        })
        let games = [].concat(gamesApi, gamesBd).slice(0,15);
        if(games.length) return res.json(games); 
        return res.json("Juego no Encontrado");
        }catch(e){
           console.log('Ningun juego con ese Nombre');
           return res.json("Juego no Encontrado")
        } 
    }
    let gameApi = await getApiInfo()
    let gameBd = await Videogame.findAll({include:{model:Genre}});
    gameBd = gameBd.map(g => {
        return{
            id: g.id,
            name:g.name,
            genre:g.genres.map(ge => ge.name),
            img:g.img,
            rating:g.rating
        }
    })
    res.json(gameApi.concat(gameBd));
})

router.get('/videogame/:id', async(req, res) =>{
    const { id } = req.params;
    try{
    let game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`);
    if(Object.keys(game.data).length > 1){
        return res.json({ id:game.data.id, 
            name:game.data.slug,
            description:game.data.description,
            date:game.data.released,
            rating:game.data.rating,
            platforms:game.data.platforms.map(platform => platform.platform.slug),
            genre:game.data.genres.map(g => g.slug),
            img:game.data.background_image
           });
    }
    }catch(e){
        console.log("no se pudo hacer la request")
    }
    try{
    let gamee = await Videogame.findByPk(id,{include: {
        model: Genre,
       }});
       if(gamee) return res.json({id:gamee.id, 
        name:gamee.name,
        description:gamee.description,
        date:gamee.date,
        rating:gamee.rating,
        platforms:gamee.platforms,
        genre:gamee.genres.map(g => g.name),
        img:gamee.img})
    }catch(e){
        return res.json("ID INVALIDO") 
    }
})

router.get('/genres', async(req,res) =>{
    let json = await axios.get(`https://api.rawg.io/api/genres?key=${KEY}`);
    let genres = json.data.results.map(genre => genre.slug);
    let genresSaved = await Promise.all(genres.map(async genre =>{
        return await Genre.findOrCreate({where:{
            name:genre
        }})
    }))
    return res.json(genresSaved);
})

router.post('/videogame', async(req, res) =>{
    const { name , description , date , rating , platforms , genre, img } = req.body;
    
    if(!img){ 
        var imagen = 'https://images.vexels.com/media/users/3/204941/isolated/preview/d8bc6d74b3da7ee41fc99b6000c1e6a4-trazo-de-puntuacion-de-signo-de-interrogacion.png';
    }
    let genres = await Promise.all(genre.map(async g => await Genre.findAll({where:{name: g}})))
    console.log(genres);
    let videogame = await Videogame.create({
         name : name.toLowerCase(), 
         description, 
         date, 
         rating, 
         platforms,
         img : img ? img : imagen  
    })
    await videogame.setGenres(genres.flat());
    //add agrega y no elimina lo anterior
    return res.json(videogame);
})




module.exports = router;
