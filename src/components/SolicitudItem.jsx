import { Link } from "react-router-dom";
import styles from "./ReciclajeItem.module.css";
import { usePuntos } from "../contexts/PuntosProvider";
import RecyclingIcon from "@mui/icons-material/Recycling";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";

function SolicitudItem({ evidencia }) {
  const { idEvidencia, tipoPunto, estado } = evidencia;

  function handleDelete(e) {
    e.preventDefault();
    deletePunto(id);
  }

  return (
    <li>
      <Link className={`${styles.cityItem}`}>
        {tipoPunto === "Reciclaje" ? <RecyclingIcon /> : <DeleteIcon />}

        <h3 className={styles.name}>{tipoPunto}</h3>
        <time className={styles.date}>{estado.toUpperCase()}</time>
      </Link>
    </li>
  );
}

export default SolicitudItem;
