import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import { useAuth } from "../contexts/UserProvider";

function AppNav() {
  const { user } = useAuth();
  return (
    <nav className={styles.nav}>
      <ul>
        {user.role === "admin" && (
          <li>
            <NavLink to="resumen">Resumen</NavLink>
          </li>
        )}

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
