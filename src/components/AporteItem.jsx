import { Link } from "react-router-dom";
import styles from "./ReciclajeItem.module.css";

import RecyclingIcon from "@mui/icons-material/Recycling";
import DeleteIcon from "@mui/icons-material/Delete";

function AporteItem({ aporte }) {
  const { idEvidencia, tipoPunto, estado } = aporte;

  return (
    <li>
      <Link
        className={`${styles.cityItem}`}
        to={`${idEvidencia}`}
      >
        {tipoPunto === "Reciclaje" ? <RecyclingIcon /> : <DeleteIcon />}

        <h3 className={styles.name}>ID Aporte: {idEvidencia}</h3>
        <p className={styles.date}>{estado.toUpperCase()}</p>
      </Link>
    </li>
  );
}

export default AporteItem;
