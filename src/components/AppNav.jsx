import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Todo</NavLink>
        </li>
        <li>
          <NavLink to="countries">Reciclaje</NavLink>
        </li>
        <li>
          <NavLink to="basural">Basural</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
