import { useNavigate, useParams } from "react-router-dom";
import styles from "./Punto.module.css";
import { useEffect } from "react";
import { usePuntos } from "../contexts/PuntosProvider";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import Button from "./Button";

import ConstructionIcon from "@mui/icons-material/Construction";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import WineBarIcon from "@mui/icons-material/WineBar";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

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
          <h6>Dirección</h6>
          <p>{address}</p>
        </div>
      </div>
      {description && (
        <div className={styles.row}>
          <h6>Descripción</h6>
          <p>{description}</p>
        </div>
      )}

      {image && (
        <div className={styles.row}>
          <h6>Foto:</h6>

          <img
            className={styles.aporteImg}
            src={image}
            alt={id}
          />
        </div>
      )}

      <div className={styles.row}>
        <h6>Tipo de materiales:</h6>
        <ul className={styles.materials}>
          {currentPunto.hasLiquidPackagingBoard && (
            <li>
              <LocalDrinkIcon /> <p>Cartón para líquidos</p>
            </li>
          )}
          {currentPunto.hasMetal && (
            <li>
              <ConstructionIcon /> <p>Metal</p>
            </li>
          )}
          {currentPunto.hasPaperAndCardboard && (
            <li>
              <StickyNote2Icon /> <p>Papel y cartón</p>
            </li>
          )}
          {currentPunto.hasPlastic && (
            <li>
              <LocalDiningIcon /> <p>Plástico</p>
            </li>
          )}
          {currentPunto.hasGlass && (
            <li>
              <WineBarIcon /> <p>Vidrio</p>
            </li>
          )}
        </ul>
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
