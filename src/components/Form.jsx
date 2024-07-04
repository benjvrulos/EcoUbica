// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { AutoComplete } from "./AutoComplete";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useNavigate } from "react-router-dom";
import { usePuntos } from "../contexts/PuntosProvider";
import supabase from "../../services/supabase";
import { useAuth } from "../contexts/UserProvider";

function Form() {
  const { user } = useAuth();
  const [lat, lng] = useUrlPosition();
  const { createPunto, isLoading } = usePuntos();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const [address, setAddress] = useState("");
  const [comuna, setComuna] = useState("");
  const [description, setDescription] = useState("");

  const [hasLiquidPackagingBoard, setHasLiquidPackagingBoard] = useState(false);
  const [hasMetal, setHasMetal] = useState(false);
  const [hasPaperAndCardboard, setHasPaperAndCardboard] = useState(false);
  const [hasPlastic, setHasPlastic] = useState(false);
  const [hasGlass, setHasGlass] = useState(false);
  const [geoCodingError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!address) return;
    if (!description) return;

    const latNum = Number(lat);
    const lngNum = Number(lng);
    console.log(comuna);

    let { data: comunaData, error } = await supabase.from("comuna").select("*").eq("comunaName", comuna);
    const comunaId = comunaData[0].comunaId;
    const newPunto = {
      comunaId,
      address,
      description,
      position: { lat: latNum, lng: lngNum },
      hasLiquidPackagingBoard,
      hasMetal,
      hasPaperAndCardboard,
      hasPlastic,
      hasGlass,
    };
    await createPunto(newPunto, user.role);
    navigate("/app/puntos");
  }

  function setAddressAndComuna(address, comuna) {
    setAddress(address);
    setComuna(comuna);
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">Dirección</label>
        <AutoComplete
          onAddress={setAddressAndComuna}
          address={address}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="comunaName">Comuna</label>
        <input
          value={comuna}
          disabled
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Descripcion</label>
        <textarea
          id="notes"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className={styles.row}>
        <label>Materiales</label>

        <div className={styles.inputList}>
          <label htmlFor="hasLiquidPackagingBoard">Cartón para líquidos</label>
          <input
            id="hasLiquidPackagingBoard"
            type="checkbox"
            value={hasLiquidPackagingBoard}
            onChange={() => setHasLiquidPackagingBoard((s) => !s)}
          />

          <label htmlFor="hasMetal">Metal</label>
          <input
            id="hasMetal"
            type="checkbox"
            value={hasMetal}
            onChange={() => setHasMetal((s) => !s)}
          />

          <label htmlFor="hasPaperAndCardboard">Papel y cartón</label>
          <input
            id="hasPaperAndCardboard"
            type="checkbox"
            value={hasPaperAndCardboard}
            onChange={() => setHasPaperAndCardboard((s) => !s)}
          />

          <label htmlFor="hasPlastic">Plástico</label>
          <input
            id="hasPlastic"
            type="checkbox"
            value={hasPlastic}
            onChange={() => setHasPlastic((s) => !s)}
          />

          <label htmlFor="hasGlass">Vidrio</label>
          <input
            id="hasGlass"
            type="checkbox"
            value={hasGlass}
            onChange={() => setHasGlass((s) => !s)}
          />
        </div>
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Agregar</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
