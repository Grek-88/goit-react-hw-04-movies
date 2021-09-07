import { NavLink } from "react-router-dom";
import s from "../Header/Header.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <ul className={s.nav}>
        <li className={s.nav_item}>
          <NavLink exact to={"/"} activeClassName={s.active}>
            Home
          </NavLink>
        </li>
        <li className={s.nav_item}>
          <NavLink to={"/movies"} activeClassName={s.active}>
            Movies
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
