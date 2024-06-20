import styles from "./ReciclajeList.module.css";
import Spinner from "./Spinner";
import SolicitudItem from "./SolicitudItem";
import { useEvidencias } from "../contexts/EvidenciaProvider";
import Message from "./Message";

function SolicitudesList() {
  const { getEvidencia, evidenciaList, isLoading } = useEvidencias();

  if (isLoading) return <Spinner />;
  if (!evidenciaList.length) return <Message message="No tienes aportes solicitados" />;

  return (
    <ul className={styles.cityList}>
      {evidenciaList.map((evidencia) => (
        <SolicitudItem
          evidencia={evidencia}
          key={evidencia.idEvidencia}
        />
      ))}
    </ul>
  );
}

export default SolicitudesList;
