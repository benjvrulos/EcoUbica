import styles from "./Punto.module.css";
import { useEvidencias } from "../contexts/EvidenciaProvider";
import { useNavigate, useParams } from "react-router-dom";

import BackButton from "./BackButton";
import Button from "./Button";

function Evidencia() {
  const { evidenciaList } = useEvidencias();
  console.log(evidenciaList);
  const { id } = useParams();
  const navigate = useNavigate();
  const evidencia = evidenciaList.find((evidencia) => evidencia.idEvidencia === Number(id));

  const { responsableName, estado, image, idPunto } = evidencia;

  return (
    <div className={styles.city}>
      <div className={styles.headerAporte}>
        <div className={styles.row}>
          <h6>Responsable</h6>
          <p>{responsableName}</p>
        </div>
        <div className={styles.row}>
          <h6>Estado</h6>
          <p>{estado.toUpperCase()}</p>
        </div>
      </div>

      <div className={styles.headerAporte}>
        <div className={styles.row}>
          <h6>Id Punto</h6>
          <p>{idPunto}</p>
        </div>
      </div>
      {image && (
        <div className={styles.row}>
          <h6>Evidencia:</h6>
          <img
            className={styles.aporteImg}
            src={image}
          />
        </div>
      )}

      <div className={styles.containerBtns}>
        <Button
          onClick={(e) => {
            e.preventDefault();

            navigate(`/app/puntos/${idPunto}`);
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

export default Evidencia;
