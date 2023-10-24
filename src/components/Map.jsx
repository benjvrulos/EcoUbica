import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  console.log(cities[0]?.tipoPunto);
  const [tempMarker, setTempMarker] = useState([]);
  const [mapPosition, setMapPostion] = useState([-33.5000852, -70.6162928]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

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
      if (geolocationPosition)
        setMapPostion([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
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

        {tempMarker.length > 0 && (
          <Marker position={[tempMarker[0], tempMarker[1]]}></Marker>
        )}

        {cities.map((punto) => (
          <Marker
            position={[punto.position.lat, punto.position.lng]}
            key={punto.id}
          >
            <Popup>
              <span>{punto.descripcion}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      navigate(`form?reverse=${true}&lat=${lat}&lng=${lng}`);
    },
  });
}
export default Map;
