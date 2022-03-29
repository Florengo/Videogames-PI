import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import style from './Nav.module.css'
import SearchBar from "./SearchBar"

export default function Nav() {



    return (
        <div className={style.main}>
            <Link to='/home'>
                <img src="https://mpng.subpng.com/20180203/tfe/kisspng-playstation-4-logo-playstation-3-playstation-png-clipart-5a7562795784a9.2264000915176423613585.jpg" alt="Logo" width='30pxs' />
            </Link>
            <div>
                <SearchBar />
            </div>
        </div>
    )
}