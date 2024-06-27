import { useNavigate } from "react-router-dom";
import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";
import { useAuth } from "../contexts/UserProvider";
import styles from "./AppLayout.module.css";
import { usePuntos } from "../contexts/PuntosProvider";
import { useEffect } from "react";

function AppLayout() {
  const { user, isAuthenticated } = useAuth();
  const { fetchPuntos } = usePuntos();
  useEffect(
    function () {
      if (isAuthenticated) fetchPuntos(user.comunaId);
    },
    [user, isAuthenticated]
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
