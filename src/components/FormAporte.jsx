import { useState } from "react";
import { useAuth } from "../contexts/UserProvider";
import { usePuntos } from "../contexts/PuntosProvider";

import { Link } from "react-router-dom";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Message from "./Message";
import { createAporte } from "../../services/apiAportes";

function FormAporte() {
  const { user } = useAuth();
  const { currentPunto } = usePuntos();
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [responsableName, setResponsableName] = useState("");
  const [liquidPackagingBoardQuantity, setLiquidPackagingBoard] = useState(currentPunto.hasLiquidPackagingBoard ? 0 : null);
  const [metalQuantity, setMetal] = useState(currentPunto.hasMetal ? 0 : null);
  const [paperAndCardboardQuantity, setPaperAndCardboard] = useState(currentPunto.hasPaperAndCardboard ? 0 : null);
  const [plasticQuantity, setPlastic] = useState(currentPunto.hasPlastic ? 0 : null);
  const [glassQuantity, setGlass] = useState(currentPunto.hasGlass ? 0 : null);

  async function handleSubmit(e) {
    e.preventDefault();

    const total = (liquidPackagingBoardQuantity || 0) + (metalQuantity || 0) + (paperAndCardboardQuantity || 0) + (plasticQuantity || 0) + (glassQuantity || 0);

    if (responsableName.length < 6) {
      console.log("Incluya su nombre y apellido");
      return;
    }
    if (total <= 0) {
      console.log("El total del aporte no puede ser 0");
      return;
    }

    if (!evidenceFile) {
      console.log("No existe imagen");
    }
    const newAporte = {
      puntoId: currentPunto.id,
      responsableName,
      userId: user.userId,
      image: evidenceFile,
      liquidPackagingBoardQuantity,
      metalQuantity,
      paperAndCardboardQuantity,
      plasticQuantity,
      glassQuantity,
    };

    const resp = await createAporte(newAporte);
  }

  if (!user) {
    return (
      <>
        <Message message="Ingresa para limpiar o reciclar en los puntos"></Message>
        <Link to="/login">
          <Button type="primary">Ingresar</Button>
        </Link>
      </>
    );
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={styles.form}
    >
      <div className={styles.row}>
        <label htmlFor="nameOrOrganization">Punto</label>
        <input
          id="nameOrOrganization"
          value={currentPunto.description}
          disabled
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="responsableName">Nombre encargado</label>
        <input
          id="responsableName"
          value={responsableName}
          onChange={(e) => setResponsableName(e.target.value)}
        />
      </div>
      {currentPunto.hasLiquidPackagingBoard && (
        <div className={styles.row}>
          <label htmlFor="liquidPackagingBoard">Cartón para líquidos</label>
          <input
            id="liquidPackagingBoard"
            value={liquidPackagingBoardQuantity}
            onChange={(e) => setLiquidPackagingBoard(Number(e.target.value))}
          />
        </div>
      )}
      {currentPunto.hasMetal && (
        <div className={styles.row}>
          <label htmlFor="metal">Metal</label>
          <input
            id="metal"
            value={metalQuantity}
            onChange={(e) => setMetal(Number(e.target.value))}
          />
        </div>
      )}

      {currentPunto.hasPaperAndCardboard && (
        <div className={styles.row}>
          <label htmlFor="paperAndCardboard">Papel y Cartón</label>
          <input
            id="paperAndCardboard"
            value={paperAndCardboardQuantity}
            onChange={(e) => setPaperAndCardboard(Number(e.target.value))}
          />
        </div>
      )}

      {currentPunto.hasPlastic && (
        <div className={styles.row}>
          <label htmlFor="plastic">Plástico</label>
          <input
            id="plastic"
            value={plasticQuantity}
            onChange={(e) => setPlastic(Number(e.target.value))}
          />
        </div>
      )}
      {currentPunto.hasGlass && (
        <div className={styles.row}>
          <label htmlFor="glass">Vidrio</label>
          <input
            id="glass"
            value={glassQuantity}
            onChange={(e) => setGlass(Number(e.target.value))}
          />
        </div>
      )}

      <div className={styles.containerFile}>
        <label
          htmlFor="image_uploads"
          className={styles.labelFile}
        >
          <FileUploadIcon /> Adjuntar evidencia
        </label>
        <span className={styles.textFile}>{evidenceFile && evidenceFile.name}</span>

        <input
          accept="image/*"
          className={styles.file}
          type="file"
          id="image_uploads"
          onChange={(e) => setEvidenceFile(e.target.files[0])}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Enviar</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default FormAporte;
