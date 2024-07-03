import styles from "./Punto.module.css";
import { useAportes } from "../contexts/AporteProvider";
import { useNavigate, useParams } from "react-router-dom";

import BackButton from "./BackButton";
import Button from "./Button";

function Aporte() {
  const { aporteList } = useAportes();

  const { id } = useParams();
  const navigate = useNavigate();
  const aporte = aporteList.find((contribution) => contribution.contributionId === Number(id));

  const { responsableName, image, puntoId, contributionId } = aporte;

  return (
    <div className={styles.city}>
      <div className={styles.headerAporte}>
        <div className={styles.row}>
          <h6>Responsable</h6>
          <p>{responsableName}</p>
        </div>
        {/* <div className={styles.row}>
          <h6>Estado</h6>
          <p>{estado.toUpperCase()}</p>
        </div> */}
      </div>

      <div className={styles.headerAporte}>
        <div className={styles.row}>
          <h6>Id Punto</h6>
          <p>{puntoId}</p>
        </div>
      </div>

      {image && (
        <div className={styles.row}>
          <h6>Evidencia:</h6>
          <img
            className={styles.aporteImg}
            src={image}
            alt={contributionId}
          />
        </div>
      )}

      <div className={styles.containerBtns}>
        <Button
          onClick={(e) => {
            e.preventDefault();

            navigate(`/app/puntos/${puntoId}`);
          }}
          type="primary"
        >
          Ver Punto
        </Button>
        <BackButton />
      </div>
    </div>
  );
}

export default Aporte;
