import { Link } from "react-router-dom";
import styles from "./ReciclajeItem.module.css";
import { usePuntos } from "../contexts/PuntosProvider";
import RecyclingIcon from "@mui/icons-material/Recycling";

function PuntoItem({ punto, role }) {
  const { currentPunto, deletePunto } = usePuntos();

  const { id, position, address } = punto;

  function handleDelete(e) {
    e.preventDefault();
    deletePunto(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentPunto.id ? styles["cityItem--active"] : ""}`}
        to={`/app/puntos/${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <RecyclingIcon />
        <h3 className={styles.name}>{address.split(/,(.*)/s)[0]}</h3>
        <time className={styles.date}>ID: {id}</time>

        {role && (
          <button
            onClick={handleDelete}
            className={styles.deleteBtn}
          >
            &times;
          </button>
        )}
      </Link>
    </li>
  );
}

export default PuntoItem;
