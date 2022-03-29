const initialState = {
    videogames: [],
    allvideogames: [],
    genres: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allvideogames: action.payload
            }
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }

        case 'GET_VIDEOGAMES_BY_NAME':
            return {
                ...state,
                videogames: action.payload[0]
            }


            case 'ORDER_BY_RATING':
                let newarray = action.payload === 'asc' ?
                    state.videogames.sort(function (a, b) {
                        if (a.rating > b.rating) {
                            return 1;
                        }
                        if (b.rating > a.rating) {
                            return -1;
                        }
                        return 0;
                    }) :
    
                    state.videogames.sort(function (a, b) {
                        if (a.rating > b.rating) {
                            return -1;
                        }
                        if (b.rating> a.rating) {
                            return 1;
                        }
                        return 0; //no se cambia
                    })
    
                return {
                    ...state,
                    videogames: newarray
                }


                case 'ORDER_BY_NAME':
                    let array = action.payload === 'asc' ?
                        state.videogames.sort(function (a, b) {
                            if (a.name > b.name) {
                                return 1;
                            }
                            if (b.name > a.name) {
                                return -1;
                            }
                            return 0;
                        }) :
        
                        state.videogames.sort(function (a, b) {
                            if (a.name > b.name) {
                                return -1;
                            }
                            if (b.name> a.name) {
                                return 1;
                            }
                            return 0; //no se cambia
                        })
        
                    return {
                        ...state,
                        videogames: array
                    }

                    case 'FILTER_BY_GENRE':
                        const allVideogames = state.allvideogames
                        const filtered = action.payload === 'All' ? allVideogames : allVideogames.filter(e => e.genres.includes(action.payload))
                        return{
                            ...state,
                            videogames: filtered
                        }



        default: return state
    }

}

export default rootReducer