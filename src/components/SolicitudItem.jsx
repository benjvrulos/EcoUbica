import { Link } from "react-router-dom";
import styles from "./ReciclajeItem.module.css";

import RecyclingIcon from "@mui/icons-material/Recycling";
import DeleteIcon from "@mui/icons-material/Delete";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
function SolicitudItem({ evidencia }) {
  const { idEvidencia, tipoPunto, estado, created_at } = evidencia;

  // function handleDelete(e) {
  //   e.preventDefault();
  //   deletePunto(id);
  // }

  return (
    <li>
      <Link className={`${styles.cityItem}`}>
        {tipoPunto === "Reciclaje" ? <RecyclingIcon /> : <DeleteIcon />}

        <h3 className={styles.name}>ID Evidencia: {idEvidencia}</h3>
        <p className={styles.date}>{estado.toUpperCase()}</p>
      </Link>
    </li>
  );
}

export default SolicitudItem;
