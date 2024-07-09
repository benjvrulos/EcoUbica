import styles from "./Punto.module.css";
import { useAportes } from "../contexts/AporteProvider";
import { useNavigate, useParams } from "react-router-dom";

import BackButton from "./BackButton";
import Button from "./Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function Aporte() {
  const { aporteList } = useAportes();

  const { id } = useParams();
  const navigate = useNavigate();
  const aporte = aporteList.find((contribution) => contribution.contributionId === Number(id));

  const { responsableName, image, puntoId, contributionId, created_at } = aporte;

  return (
    <div className={styles.city}>
      <div className={styles.headerAporte}>
        <div className={styles.row}>
          <h6>Responsable</h6>
          <p>{responsableName}</p>
          <h6>Id Punto</h6>
          <p>{puntoId}</p>
        </div>

        <div className={styles.row}>
          <h6>Fecha </h6>
          <p>{formatDate(created_at)}</p>
          <h6>Cantidad de materiales</h6>
          {aporte.liquidPackagingBoardQuantity !== null && <p>Cartón para liquidos: {aporte.liquidPackagingBoardQuantity} unidades</p>}
          {aporte.metalQuantity !== null && <p>Metal: {aporte.metalQuantity}kg</p>}
          {aporte.paperAndCardboardQuantity !== null && <p>Papel y cartón: {aporte.paperAndCardboardQuantity} unidades</p>}
          {aporte.plasticQuantity !== null && <p>Plástico: {aporte.plasticQuantity} unidades</p>}
          {aporte.glassQuantity !== null && <p>Vidrio: {aporte.glassQuantity}kg</p>}
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
