import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";
import { useAuth } from "../contexts/UserProvider";
import styles from "./AppLayout.module.css";
import { usePuntos } from "../contexts/PuntosProvider";
import { useEffect } from "react";
import { useAportes } from "../contexts/AporteProvider";

function AppLayout() {
  const { user, isAuthenticated } = useAuth();
  const { fetchPuntos } = usePuntos();
  const { getAllAportes } = useAportes();
  useEffect(
    function () {
      if (isAuthenticated) {
        fetchPuntos();
        getAllAportes(user.userId);
      }
    },
    [user.comunaId, user.userId, isAuthenticated]
  );

  return (
    <div className={styles.app}>
      <SideBar />

      <Map />
      {user && <User />}
    </div>
  );
}

export default AppLayout;
