import axios from 'axios';

// export function getVideogames(){
//     return async function (dispatch){
//         var json = await axios.get("http://localhost:3001/videogames");
//         return dispatch ({
//             type: 'GET_VIDEOGAMES',
//             payload: json.data
//         })
//     }
// }

export function getVideogames() {
    return function (dispatch) {
        axios.get("http://localhost:3001/videogames")
            .then(resp => {
                return dispatch({
                    type: 'GET_VIDEOGAMES',
                    payload: resp.data
                })
            })
    }
}

export function getGenres() {
    return function (dispatch) {
        axios.get("http://localhost:3001/genres")
            .then(resp => {
                return dispatch({
                    type: 'GET_GENRES',
                    payload: resp.data
                })
            })
    }
}

export function getVideogamesByName(name) {
    return function (dispatch) {
        axios.get("http://localhost:3001/videogames?name=" + name)
            .then(resp => {
                return dispatch({
                    type: 'GET_VIDEOGAMES_BY_NAME',
                    payload: resp.data
                })
            })
    }
}

export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
    
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function filterByGenre(payload){
    return{
        type: 'FILTER_BY_GENRE',
        payload
    }
}