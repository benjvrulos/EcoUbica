import styles from "./SideBar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllComunasApi } from "../../services/apiPuntos";

function SideBar() {
  const [allComunas, setAllComunas] = useState([]);
  const [filteredComuna, setFilteredComuna] = useState(0);

  useEffect(() => {
    async function getAllComunas() {
      const resp = await getAllComunasApi();
      setAllComunas(resp);
    }

    getAllComunas();
  }, []);
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <div className={styles.filter}>
        <p>Filtrar por comunas :</p>
        <select
          onChange={(e) => {
            setFilteredComuna(Number(e.target.value));
          }}
        >
          <option value={0}>Todas</option>
          {allComunas.length > 0 &&
            allComunas.map((comuna) => (
              <option
                key={comuna.comunaId}
                value={comuna.comunaId}
              >
                {comuna.comunaName}
              </option>
            ))}
        </select>
      </div>
      <Outlet context={[filteredComuna]} />
      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by EcoUbica</p>
      </footer>
    </div>
  );
}

export default SideBar;
