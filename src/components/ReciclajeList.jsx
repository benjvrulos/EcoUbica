import ReciclajeItem from "./ReciclajeItem";
import styles from "./ReciclajeList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { usePuntos } from "../contexts/PuntosProvider";
import { useLocation } from "react-router-dom";

function ReciclajeList() {
  const { puntosList, isLoading } = usePuntos();

  const location = useLocation();

  let puntosFilter = puntosList;

  if (isLoading) return <Spinner />;
  if (!puntosList.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  if (location.pathname.includes("reciclaje")) {
    puntosFilter = puntosList.filter(
      (punto) => punto.tipoPunto === "Reciclaje"
    );
  } else if (location.pathname.includes("basural")) {
    puntosFilter = puntosList.filter((punto) => punto.tipoPunto === "Basural");
  } else {
    puntosFilter = puntosList;
  }

  return (
    <ul className={styles.cityList}>
      {puntosFilter.map((punto) => (
        <ReciclajeItem punto={punto} key={punto.id} />
      ))}
    </ul>
  );
}

export default ReciclajeList;
