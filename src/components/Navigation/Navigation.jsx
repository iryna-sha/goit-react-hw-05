import { NavLink } from "react-router-dom"
import s from './Navigation.module.css'
import clsx from "clsx"

const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
    return (
        <div className={s.header}>
            <p>FilmQuest</p>
            <nav>
                <ul className={s.nav}>
                    <li> <NavLink className={buildLinkClass} to="/">
                        Home
                    </NavLink></li>
                    <li><NavLink className={buildLinkClass} to="/movies">Movies</NavLink></li>
                </ul>
            </nav>
        </div>


    )
}

export default Navigation
