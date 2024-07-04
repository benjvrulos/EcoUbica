import styles from "./ReciclajeList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useAportes } from "../contexts/AporteProvider";
import AporteItem from "./AporteItem";

function AporteList() {
  const { aporteList, isLoading } = useAportes();

  if (isLoading) return <Spinner />;
  if (!aporteList.length) return <Message message="No existen aportes" />;

  return (
    <ul className={styles.cityList}>
      {aporteList.map((aporte) => (
        <AporteItem
          aporte={aporte}
          key={aporte.contributionId}
        />
      ))}
    </ul>
  );
}

export default AporteList;
