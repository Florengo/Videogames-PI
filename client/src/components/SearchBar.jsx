import react from "react";
import { useDispatch } from "react-redux";
import {useState} from "react";
import {getVideogamesByName} from "../actions";
import style from "./SearchBar.module.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInput(e){
e.preventDefault()
setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getVideogamesByName(name))
    }

    return(
        <div className={style.main}>
            <input type="text"
            placeholder="Search..."
            onChange={(e) => handleInput(e)}/>
            <button onClick={(e) => handleSubmit(e)}> Enter</button>
        </div>
    )
}