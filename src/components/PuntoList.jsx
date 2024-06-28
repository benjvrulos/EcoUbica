import PuntoItem from "./PuntoItem";
import styles from "./ReciclajeList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { usePuntos } from "../contexts/PuntosProvider";
import { useAuth } from "../contexts/UserProvider";

function PuntoList() {
  const { puntosList, isLoading } = usePuntos();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  if (isLoading) return <Spinner />;
  if (!puntosList.length) return <Message message="No tienes asignada ninguna comuna" />;

  return (
    <ul className={styles.cityList}>
      {puntosList.map((punto) => (
        <PuntoItem
          punto={punto}
          key={punto.id}
          role={isAdmin}
        />
      ))}
    </ul>
  );
}

export default PuntoList;
