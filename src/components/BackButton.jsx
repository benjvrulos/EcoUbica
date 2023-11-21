import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton({ type }) {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();

        navigate("/app/puntos");
      }}
    >
      &larr; Atrás
    </Button>
  );
}

export default BackButton;
