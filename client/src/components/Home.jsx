import React, { useEffect, useState, } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getVideogames, getGenres } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import style from './Home.module.css'
import Nav from './Nav';
import {  orderByRating } from '../actions';
import { orderByName } from '../actions';
import { filterByGenre } from '../actions';
import Paginado from './Paginado'

export default function Home() {

    const dispatch = useDispatch()
    const allvideogames = useSelector((state) => state.videogames)
    const allallvideogames = useSelector(state => state.allvideogames)
    const allgenres = useSelector((state) => state.genres)
    const [orden, setOrden] = useState(' ')
    const [ordenAttack, setOrdenAttack] = useState(' ')
    const [currentPage, setCurrentPage] = useState(1)
    const videogamesPerPage = 15
    const indexOfLastVideogame = currentPage * videogamesPerPage //15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage //0
    const currentVideogames= allvideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
    }, [])

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function handleOrderRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleOrderName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)

    }

    function handlefilterByGenre(e){
        e.preventDefault();
        dispatch(filterByGenre())
    }

console.log(currentPage)
    return (
        <div>
            <Nav />
            <div className={style.home}>
            <select onChange={e => { handleOrderRating(e) }}  className={style.search}>
                        <option value="" selected disabled hidden>Sort by Rating</option>

                            <option value='asc'>
                                Ascending
                            </option>
                            <option value='desc'>
                                Descending
                            </option>

                        </select>

                        <select onChange={e => {handleOrderName(e)}} className={style.search}>
                            <option value=""selected disabled hidden> Sort by Name</option>
                            <option value='asc'>
                                A-Z
                            </option>
                            <option value='desc'>
                                Z-A
                            </option>


                        </select>

                        <select onChange={e => { handlefilterByGenre(e) }}>
                            {allgenres && allgenres.map((e) => {
                                return (
                                    <option  >
                                        {e.slice(0, 1).toUpperCase() + e.slice(1)}
                                    </option>
                                )
                            })}
                        </select>

                        <Paginado
                            videogamesPerPage={videogamesPerPage}
                            allvideogames={allvideogames.length}
                            paginado={paginado} />
 
                {


                    currentVideogames && currentVideogames.map(e => {
                        return <Card img={e.background_image}
                            name={e.name}
                            genres={e.genres}
                            id={e.id}
                            rating={e.rating}
                        />

                    })
                }
            </div>
        </div>
    )
}