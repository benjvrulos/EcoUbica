// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { AutoComplete } from "./AutoComplete";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { usePuntos } from "../contexts/PuntosProvider";
import { useAuth } from "../contexts/UserProvider";

const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const API_KEY = "AIzaSyDXPoPrJFxb3wDpyDCAuuddacMGesBd38U";

function Form() {
  const { user } = useAuth();

  const [lat, lng] = useUrlPosition();
  const { createPunto, isLoading } = usePuntos();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [tipoPunto, setTipoPunto] = useState("Reciclaje");
  const [address, setAddress] = useState("");

  const [description, setDescription] = useState("");

  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(
    function () {
      if (searchParams.get("reverse")) {
        // Returns the estimate place with parameters lat and lng
        async function fetchReverseGeocoding() {
          try {
            setIsLoadingGeocoding(true);
            setGeoCodingError("");
            const response = await fetch(`${BASE_URL}?latlng=${lat},${lng}&result_type=street_address&key=${API_KEY}`);
            const data = await response.json();
            console.log(data);

            // if (!data.countryCode)
            //   throw new Error(
            //     "That doesn´t seem to be a city. Click somewhere else 😉"
            //   );

            setAddress(data.results[1].formatted_address);
          } catch (err) {
            setGeoCodingError(err.message);
          } finally {
            setIsLoadingGeocoding(false);
          }
        }

        if (user) {
          fetchReverseGeocoding();
        }
      }
    },
    [lat, lng, searchParams]
  );
  async function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const latNum = Number(lat);
    const lngNum = Number(lng);
    const newPunto = {
      address,
      tipoPunto,
      description,
      position: { lat: latNum, lng: lngNum },
    };
    await createPunto(newPunto, user.role);
    navigate("/app/puntos");
  }
  if (!user) {
    return (
      <>
        <Message message="Ingresa para comenzar a agregar puntos de reciclaje"></Message>
        <Link to="/login">
          <Button type="primary">Ingresar</Button>
        </Link>
      </>
    );
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
          onAdress={setAddress}
          address={address}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">Tipo de Punto Limpio</label>
        <select
          id="date"
          value={tipoPunto}
          onChange={(e) => setTipoPunto(e.target.value)}
        >
          <option value="Reciclaje">Reciclaje</option>
          <option value="Basural">Basural</option>
        </select>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Descripcion</label>
        <textarea
          id="notes"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">{user.role === "admin" ? "Agregar" : "Solicitar"}</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
