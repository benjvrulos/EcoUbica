import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="resumen">Resumen</NavLink>
        </li>
        <li>
          <NavLink to="puntos">Puntos</NavLink>
        </li>

        <li>
          <NavLink to="aportes">Aportes</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
