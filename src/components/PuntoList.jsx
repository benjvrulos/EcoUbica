import PuntoItem from "./PuntoItem";
import styles from "./ReciclajeList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { usePuntos } from "../contexts/PuntosProvider";
import { useAuth } from "../contexts/UserProvider";
import Button from "./Button";
import { useNavigate, useOutletContext } from "react-router-dom";

function PuntoList() {
  const { puntosList, isLoading } = usePuntos();
  const { user } = useAuth();
  const [filteredComuna] = useOutletContext();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";
  const filteredPuntos = filteredComuna === 0 ? puntosList : puntosList.filter((punto) => punto.comunaId === filteredComuna);
  if (isLoading) return <Spinner />;
  if (!puntosList.length) return <Message message="No tienes asignada ninguna comuna" />;

  return (
    <ul className={styles.cityList}>
      {filteredPuntos.map((punto) => (
        <PuntoItem
          punto={punto}
          key={punto.id}
          role={isAdmin}
        />
      ))}

      {user.role === "admin" && (
        <Button
          style={{ alignSelf: "center" }}
          type="primary"
          onClick={(e) => {
            e.preventDefault();

            navigate("/app/form");
          }}
        >
          Agregar Punto
        </Button>
      )}
    </ul>
  );
}

export default PuntoList;
