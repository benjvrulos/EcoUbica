import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { usePuntos } from "../contexts/PuntosProvider";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const navigate = useNavigate();
  const { puntosList } = usePuntos();

  const [tempMarker, setTempMarker] = useState([]);
  const [mapPosition, setMapPostion] = useState([-33.5000852, -70.6162928]);

  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setTempMarker([mapLat, mapLng]);
        setMapPostion([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition) {
        console.log(geolocationPosition);
        setMapPostion([geolocationPosition.lat, geolocationPosition.lng]);
        navigate("/app");
      }
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button
          type="position"
          onClick={getPosition}
        >
          {isLoadingPosition ? "Loading..." : "Usa tu ubicación"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={15}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {tempMarker.length > 0 && <Marker position={[tempMarker[0], tempMarker[1]]}></Marker>}

        {puntosList.map((punto) => (
          <Marker
            eventHandlers={{
              click: (e) => {
                setMapPostion([e.latlng.lat, e.latlng.lng]);
                navigate(`puntos/${punto.id}?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
              },
            }}
            position={[punto.position.lat, punto.position.lng]}
            key={punto.id}
          >
            <Popup>
              <span>Estado: {punto.estado ? punto.estado : "No hay información"}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// function DetectClick() {
//   const navigate = useNavigate();
//   useMapEvents({
//     click: (e) => {
//       const lat = e.latlng.lat;
//       const lng = e.latlng.lng;

//       navigate(`form?reverse=${true}&lat=${lat}&lng=${lng}`);
//     },
//   });
// }
export default Map;
