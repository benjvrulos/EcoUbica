import { useNavigate, useParams } from "react-router-dom";
import styles from "./Punto.module.css";
import { useEffect } from "react";
import { usePuntos } from "../contexts/PuntosProvider";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import Button from "./Button";

function Punto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getPunto, currentPunto, isLoading } = usePuntos();

  useEffect(
    function () {
      getPunto(Number(id));
    },
    [id, getPunto]
  );

  const { address, description, image } = currentPunto;

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.headerAporte}>
        <div className={styles.row}>
          <h6>Direccion</h6>
          <p>{address}</p>
        </div>
      </div>
      {description && (
        <div className={styles.row}>
          <h6>Descripcion</h6>
          <p>{description}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Foto:</h6>
        {image ? (
          <img
            className={styles.aporteImg}
            src={image}
          />
        ) : (
          "no hay imagen"
        )}
      </div>

      <div className={styles.containerBtns}>
        <Button
          onClick={(e) => {
            e.preventDefault();

            navigate("/app/form-evidencia");
          }}
          type="primary"
        >
          Aportar
        </Button>
        <BackButton />
      </div>
    </div>
  );
}

export default Punto;
