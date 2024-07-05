import PuntoItem from "./PuntoItem";
import styles from "./ReciclajeList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { usePuntos } from "../contexts/PuntosProvider";
import { useAuth } from "../contexts/UserProvider";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllComunasApi } from "../../services/apiPuntos";

function PuntoList() {
  const { puntosList, isLoading } = usePuntos();
  console.log(puntosList);
  const { user } = useAuth();
  const [allComunas, setAllComunas] = useState([]);
  const [filterPuntos, setFilterPuntos] = useState(puntosList);
  const [comuna, setComuna] = useState("Todas");
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    async function getAllComunas() {
      const resp = await getAllComunasApi();

      setAllComunas(resp);
    }

    getAllComunas();
  }, []);

  function filterByComuna(comunaId) {
    if (comunaId === 0) {
      setFilterPuntos(puntosList);
    } else {
      const filteredArray = puntosList.filter((punto) => punto.comunaId === comunaId);
      console.log(filteredArray);
      setFilterPuntos(filteredArray);
    }
  }

  if (isLoading) return <Spinner />;
  if (!puntosList.length) return <Message message="No tienes asignada ninguna comuna" />;

  return (
    <>
      <div className={styles.filter}>
        <p>Filtrar por comunas :</p>
        <select
          value={comuna}
          onChange={(e) => {
            setComuna(Number(e.target.value));
            filterByComuna(Number(e.target.value));
          }}
        >
          <option value={0}>Todas</option>
          {allComunas.length > 0 && allComunas.map((comuna) => <option value={comuna.comunaId}>{comuna.comunaName}</option>)}
        </select>
      </div>
      <ul className={styles.cityList}>
        {filterPuntos.map((punto) => (
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
    </>
  );
}

export default PuntoList;
