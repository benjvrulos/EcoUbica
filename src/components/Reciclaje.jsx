import { useParams } from "react-router-dom";
import styles from "./Reciclaje.module.css";
import { useEffect } from "react";
import { usePuntos } from "../contexts/PuntosProvider";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import RecyclingIcon from "@mui/icons-material/Recycling";
import DeleteIcon from "@mui/icons-material/Delete";

function Reciclaje() {
  const { id } = useParams();

  const { getPunto, currentPunto, isLoading } = usePuntos();

  useEffect(
    function () {
      getPunto(Number(id));
    },
    [id, getPunto]
  );

  const { address, tipoPunto, description } = currentPunto;

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>Tipo de Punto:</h6>
        <div className={styles.tipoPunto}>
          <span>
            {tipoPunto === "Reciclaje" ? (
              <RecyclingIcon fontSize="large" />
            ) : (
              <DeleteIcon fontSize="large" />
            )}
          </span>
          <h3>{tipoPunto}</h3>
        </div>
      </div>

      <div className={styles.row}>
        <h6>Direccion</h6>
        <p>{address}</p>
      </div>

      {description && (
        <div className={styles.row}>
          <h6>Descripcion</h6>
          <p>{description}</p>
        </div>
      )}

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default Reciclaje;
