import { Card, CardContent, CardHeader } from "@mui/material";
import { useAportes } from "../contexts/AporteProvider";
import styles from "./Resumen.module.css";
import { usePuntos } from "../contexts/PuntosProvider";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ConstructionIcon from "@mui/icons-material/Construction";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import WineBarIcon from "@mui/icons-material/WineBar";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
function Resumen() {
  const { aporteList } = useAportes();
  const { puntosList } = usePuntos();
  return (
    <div className={styles.cardFlex}>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-start" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <LocalShippingIcon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{aporteList.length}</h1>
          <p style={{ textAlign: "center" }}>Total de Aportes</p>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-end" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <LocalDrinkIcon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{aporteList.length}</h1>
          <p style={{ textAlign: "center" }}>Cartón para liquidos</p>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-start" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <ConstructionIcon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{aporteList.length}</h1>
          <p style={{ textAlign: "center" }}>Metal</p>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-end" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <StickyNote2Icon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{aporteList.length}</h1>
          <p style={{ textAlign: "center" }}>Papel y cartón</p>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-start" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <LocalDiningIcon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{aporteList.length}</h1>
          <p style={{ textAlign: "center" }}>Plástico</p>
        </CardContent>
      </Card>
      <Card style={{ backgroundColor: "#42484d", color: "#fff", width: "90%", justifySelf: "self-end" }}>
        <CardContent>
          <span className={styles.cardIcon}>
            <WineBarIcon sx={{ fontSize: 40 }} />
          </span>
          <h1 style={{ textAlign: "center" }}>{aporteList.length}</h1>
          <p style={{ textAlign: "center" }}>Vidrio</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Resumen;
