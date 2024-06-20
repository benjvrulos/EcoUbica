import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import Button from "./Button";
import styles from "./Form.module.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useAuth } from "../contexts/UserProvider";
import Message from "./Message";
import { createEvidencia } from "../../services/apiEvidencia";
function FormEvidencia() {
  const { user } = useAuth();

  let location = useLocation();
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [responsableName, setResponsableName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formEvidencia = { tipoPunto: location.state.tipoPunto, responsableName, userId: user.idUser };

    const resp = await createEvidencia(formEvidencia);
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
          value={location.state.tipoPunto}
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

export default FormEvidencia;
