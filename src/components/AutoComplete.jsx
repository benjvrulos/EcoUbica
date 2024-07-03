import { usePlacesWidget } from "react-google-autocomplete";
import { useNavigate } from "react-router-dom";

const API_KEY = "AIzaSyDXPoPrJFxb3wDpyDCAuuddacMGesBd38U";

export function AutoComplete({ onAddress, address }) {
  const navigate = useNavigate();

  const { ref } = usePlacesWidget({
    apiKey: API_KEY,
    onPlaceSelected: (place, inputRef) => {
      onAddress(inputRef.value, place.address_components[2].long_name);

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      navigate(`?lat=${lat}&lng=${lng}`);
    },
    options: {
      types: ["address"],
      componentRestrictions: { country: "cl" },
    },
  });

  return (
    <input
      ref={ref}
      style={{ width: "100%" }}
      defaultValue={address}
    />
  );
}
