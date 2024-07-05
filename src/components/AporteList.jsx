import styles from "./ReciclajeList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useAportes } from "../contexts/AporteProvider";
import AporteItem from "./AporteItem";
import { useOutletContext } from "react-router-dom";

function AporteList() {
  const { aporteList, isLoading } = useAportes();
  const [filteredComuna] = useOutletContext();
  const aporteFiltered = filteredComuna === 0 ? aporteList : aporteList.filter((aporte) => aporte.puntos.comunaId === filteredComuna);

  if (isLoading) return <Spinner />;
  if (!aporteList.length) return <Message message="No existen aportes" />;

  return (
    <ul className={styles.cityList}>
      {aporteFiltered.map((aporte) => (
        <AporteItem
          aporte={aporte}
          key={aporte.contributionId}
        />
      ))}
    </ul>
  );
}

export default AporteList;
