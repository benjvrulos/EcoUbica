import { Link } from "react-router-dom";
import styles from "./ReciclajeItem.module.css";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function AporteItem({ aporte }) {
  const { contributionId, responsableName } = aporte;

  return (
    <li>
      <Link
        className={`${styles.cityItem}`}
        to={`${contributionId}`}
      >
        <LocalShippingIcon />
        <h3 className={styles.name}>{responsableName}</h3>
        <p className={styles.date}>ID: {contributionId}</p>
      </Link>
    </li>
  );
}

export default AporteItem;
