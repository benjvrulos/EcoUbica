import PuntoItem from "./PuntoItem";
import styles from "./ReciclajeList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { usePuntos } from "../contexts/PuntosProvider";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/UserProvider";

function PuntoList() {
  const { puntosList, isLoading } = usePuntos();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const location = useLocation();

  let puntosFilter = puntosList;

  if (isLoading) return <Spinner />;
  if (!puntosList.length) return <Message message="Add your first city by clicking on a city on the map" />;

  if (location.pathname.includes("reciclaje")) {
    puntosFilter = puntosList.filter((punto) => punto.tipoPunto === "Reciclaje");
  } else if (location.pathname.includes("basural")) {
    puntosFilter = puntosList.filter((punto) => punto.tipoPunto === "Basural");
  } else {
    puntosFilter = puntosList;
  }

  return (
    <ul className={styles.cityList}>
      {puntosFilter.map((punto) => (
        <PuntoItem
          punto={punto}
          key={punto.id}
          role={isAdmin}
        />
      ))}
    </ul>
  );
}

export default PuntoList;
