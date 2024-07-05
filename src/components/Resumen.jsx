import { Card, CardContent } from "@mui/material";
import { useAportes } from "../contexts/AporteProvider";
import styles from "./Resumen.module.css";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ConstructionIcon from "@mui/icons-material/Construction";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import WineBarIcon from "@mui/icons-material/WineBar";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { useOutletContext } from "react-router-dom";
function Resumen() {
  const { aporteList } = useAportes();
  const [filteredComuna] = useOutletContext();
  const aporteFiltered = filteredComuna === 0 ? aporteList : aporteList.filter((aporte) => aporte.puntos.comunaId === filteredComuna);
  const liquidPackagingBoardQuantity = aporteFiltered.reduce((acum, aporte) => acum + aporte.liquidPackagingBoardQuantity, 0);
  const metalQuantity = aporteFiltered.reduce((acum, aporte) => acum + aporte.metalQuantity, 0);
  const paperAndCardboardQuantity = aporteFiltered.reduce((acum, aporte) => acum + aporte.paperAndCardboardQuantity, 0);
  const plasticQuantity = aporteFiltered.reduce((acum, aporte) => acum + aporte.plasticQuantity, 0);
  const glassQuantity = aporteFiltered.reduce((acum, aporte) => acum + aporte.glassQuantity, 0);

  return (
    <div className={styles.cardFlex}>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-start" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <LocalShippingIcon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{aporteFiltered.length}</h1>
          <p style={{ textAlign: "center" }}>Total de Aportes</p>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-end" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <LocalDrinkIcon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{liquidPackagingBoardQuantity}</h1>
          <p style={{ textAlign: "center" }}>Cartón para liquidos</p>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-start" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <ConstructionIcon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{metalQuantity}</h1>
          <p style={{ textAlign: "center" }}>Metal</p>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-end" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <StickyNote2Icon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{paperAndCardboardQuantity}</h1>
          <p style={{ textAlign: "center" }}>Papel y cartón</p>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-start" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <LocalDiningIcon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{plasticQuantity}</h1>
          <p style={{ textAlign: "center" }}>Plástico</p>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-end" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <WineBarIcon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{glassQuantity}</h1>
          <p style={{ textAlign: "center" }}>Vidrio</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Resumen;
