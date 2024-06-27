import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="puntos">Todo</NavLink>
        </li>

        <li>
          <NavLink to="aportes">Aportes</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
