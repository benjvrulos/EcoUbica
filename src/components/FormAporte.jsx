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

  async function handleSubmit(e) {
    e.preventDefault();
    const newAporte = { idPunto: currentPunto.id, responsableName, userId: user.idUser, image: evidenceFile };

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
        <label htmlFor="nameOrOrganization">Tipo Punto</label>
        <input
          id="nameOrOrganization"
          value={currentPunto.tipoPunto}
          disabled
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="responsableName">Nombre u Organización</label>
        <input
          id="responsableName"
          value={responsableName}
          onChange={(e) => setResponsableName(e.target.value)}
        />
      </div>

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
