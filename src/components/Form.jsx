// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { AutoComplete } from "./AutoComplete";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useSearchParams } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const API_KEY = "AIzaSyCi1tocSc75FiVUB1IfbnGd0QVnjXPxzjU";

function Form() {
  const [lat, lng] = useUrlPosition();
  const [searchParams] = useSearchParams();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [address, setAddress] = useState("");

  const [notes, setNotes] = useState("");

  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(
    function () {
      if (searchParams.get("reverse")) {
        // Returns the estimate place with parameters lat and lng
        async function fetchReverseGeocoding() {
          try {
            setIsLoadingGeocoding(true);
            setGeoCodingError("");
            const response = await fetch(
              `${BASE_URL}?latlng=${lat},${lng}&result_type=street_address&key=${API_KEY}`
            );
            const data = await response.json();

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
        fetchReverseGeocoding();
      }
    },
    [lat, lng, searchParams]
  );

  if (isLoadingGeocoding) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">Dirección</label>
        <AutoComplete onAdress={setAddress} address={address} />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">Tipo de Punto Limpio</label>
        <select>
          <option>Reciclaje</option>
          <option>Basural</option>
        </select>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Descripcion</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Agregar</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
