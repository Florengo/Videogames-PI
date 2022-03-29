const { default: axios } = require('axios');
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame, Genre } = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

function getapiinfo(name) {
    if (name) {
        return axios.get(`https://api.rawg.io/api/games?key=4883d0b34cc949c3a08c79941ec309eb&search=${name}`)
            .then(resp => {
                const dataName = resp.data.results.map(e => {
                    return {
                        name: e.name,
                        id: e.id,
                        released: e.released,
                        genres: e.genres.map(e => e.name),
                        rating: e.rating,
                        rating_top: e.rating_top,
                        platforms: e.platforms.map(e => e.platform.name),
                        background_image: e.background_image

                    }

                })
                return dataName
            })
    }
    return axios.get('https://api.rawg.io/api/games?key=4883d0b34cc949c3a08c79941ec309eb&page_size=40')
        .then(resp => {
            const info = resp.data.results
            return axios.get('https://api.rawg.io/api/games?key=4883d0b34cc949c3a08c79941ec309eb&page=2&page_size=40')
                .then(resp1 => {
                    const info1 = resp1.data.results
                    return axios.get('https://api.rawg.io/api/games?key=4883d0b34cc949c3a08c79941ec309eb&page=3&page_size=20')
                        .then(resp2 => {
                            const info2 = resp2.data.results
                            const allgames = [...info, ...info1, ...info2]
                            const finalinfo = allgames.map(e => {
                                return {
                                    name: e.name,
                                    id: e.id,
                                    released: e.released,
                                    genres: e.genres.map(e => e.name),
                                    rating: e.rating,
                                    rating_top: e.rating_top,
                                    platforms: e.platforms.map(e => e.platform.name),
                                    background_image: e.background_image

                                }

                            })
                            return finalinfo
                        })
                })
        })

}

function getdbinfo() {
    return Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name']
        }
    })
        .then(resp => {
            console.log(resp)
            return resp
        })
}


router.get('/videogames', async (req, res) => {

    const { name } = req.query
    const info2 = await getdbinfo()
    if (name) {

        const nameinfo = await getapiinfo(name)
        const dbnameinfo = info2.filter(e => e.name === name)
        const finalinfo = [nameinfo, ...dbnameinfo]
        return res.json(finalinfo)
    }
    else {
        const info1 = await getapiinfo()
        return res.json([...info1, ...info2])
    }
})

router.post('/videogames', (req, res) => {
    const {
        name,
        released,
        genres,
        rating,
        description,
        rating_top,
        img,
        platforms,
        background_image
    }
        = req.body
    Videogame.create({
        name,
        released,
        rating,
        description,
        rating_top,
        img,
        platforms,
        background_image
    })
        .then(videogame => {
            videogame.addGenres(genres)
                .then(() => {
                    return res.send('ok')
                })
        })
})

router.post('/genres', (req, res) => {
    axios.get('https://api.rawg.io/api/genres?key=4883d0b34cc949c3a08c79941ec309eb')
        .then(resp => {
            const allGenres = resp.data.results.map(e => {
                return {
                    name: e.name
                }
            })
            Genre.bulkCreate(allGenres)
                .then(resp2 => {
                    return res.send('Ok')
                })
        })
})

router.get('/genres', (req, res) => {
    Genre.findAll()
        .then(resp => {
const genres = resp.map( e => e.name)
          return  res.json(genres)
        })
})

router.get('/videogames/:id',  (req, res) => {
    const { id } = req.params
    if (id.toString().length < 6 ){
    axios.get(`https://api.rawg.io/api/games/${id}?key=4883d0b34cc949c3a08c79941ec309eb`)
   .then ( resp => {
       const videogameid = {
           id: resp.data.id,
           name: resp.data.name,
           released: resp.data.released,
           genres: resp.data.genres.map(e => e.name),
           rating: resp.data.rating,
           rating_top: resp.data.rating_top,
           img: resp.data.background_image,
           platforms: resp.data.platforms.map( e => e.platform.name),
           background_image: resp.data.background_image_additional
       }
       return res.json(videogameid)
   })}
else{
    Videogame.findOne({
        where: {
            id: id
        },
        include:{
            model: Genre,
            attributes: ['name']
        }
    })
    .then(resp => {
        const resp2 = {
            ...resp.dataValues,
            genres: resp.genres.map(e => e.name)
        }
        return res.json(resp2)
    })
}
})




module.exports = router;
