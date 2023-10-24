import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
import RecyclingIcon from "@mui/icons-material/Recycling";
import DeleteIcon from "@mui/icons-material/Delete";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function ReciclajeItem({ city }) {
  const { currentCity } = useCities();
  const date = new Date();
  const { tipoPunto, id, position } = city;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {tipoPunto === "Reciclaje" ? <RecyclingIcon /> : <DeleteIcon />}

        <h3 className={styles.name}>{tipoPunto}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default ReciclajeItem;
