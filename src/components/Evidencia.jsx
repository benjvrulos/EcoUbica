import Spinner from "./Spinner";

import { useEvidencias } from "../contexts/EvidenciaProvider";
import { useParams } from "react-router-dom";

function Evidencia() {
  const { evidenciaList } = useEvidencias();

  const { id } = useParams();

  const evidencia = evidenciaList.find((evidencia) => evidencia.idEvidencia === Number(id));
  console.log(evidencia);
  return <img src={evidencia?.image} />;
}

export default Evidencia;
