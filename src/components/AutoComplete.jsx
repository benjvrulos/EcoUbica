import { usePlacesWidget } from "react-google-autocomplete";
import { useNavigate } from "react-router-dom";

const API_KEY = "AIzaSyCi1tocSc75FiVUB1IfbnGd0QVnjXPxzjU";

export function AutoComplete({ onAdress, address }) {
  const navigate = useNavigate();

  const { ref } = usePlacesWidget({
    apiKey: API_KEY,
    onPlaceSelected: (place, inputRef) => {
      onAdress(inputRef.value);

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      navigate(`?lat=${lat}&lng=${lng}`);
    },
    options: {
      types: ["address"],
      componentRestrictions: { country: "cl" },
    },
  });

  return <input ref={ref} style={{ width: "100%" }} defaultValue={address} />;
}
