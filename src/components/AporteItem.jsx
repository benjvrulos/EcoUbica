import { Link } from "react-router-dom";
import styles from "./ReciclajeItem.module.css";

import RecyclingIcon from "@mui/icons-material/Recycling";

function AporteItem({ aporte }) {
  const { contributionId, resposableName } = aporte;

  return (
    <li>
      <Link
        className={`${styles.cityItem}`}
        to={`${contributionId}`}
      >
        <RecyclingIcon />
        <h3 className={styles.name}>ID Aporte: {contributionId}</h3>
        <p className={styles.date}>{resposableName}</p>
      </Link>
    </li>
  );
}

export default AporteItem;
