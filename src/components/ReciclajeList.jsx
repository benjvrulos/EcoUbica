import CityItem from "./ReciclajeItem";
import styles from "./ReciclajeList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useLocation } from "react-router-dom";

function ReciclajeList() {
  const { cities, isLoading } = useCities();
  const location = useLocation();
  console.log(location.pathname);
  let puntosFilter = cities;

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  if (location.pathname.includes("reciclaje")) {
    puntosFilter = cities.filter((punto) => punto.tipoPunto === "Reciclaje");
  } else if (location.pathname.includes("basural")) {
    puntosFilter = cities.filter((punto) => punto.tipoPunto === "Basural");
  } else {
    puntosFilter = cities;
  }

  return (
    <ul className={styles.cityList}>
      {puntosFilter.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default ReciclajeList;
