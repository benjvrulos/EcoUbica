import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/UserProvider";
import Message from "./Message";
import Button from "./Button";
import { useEvidencias } from "../contexts/EvidenciaProvider";
import { useEffect } from "react";

function EvidenciaLayout() {
  const { user, isAuthenticated } = useAuth();
  const { getEvidencias } = useEvidencias();

  useEffect(
    function () {
      if (isAuthenticated) getEvidencias(user.idUser);
    },
    [user]
  );

  if (!isAuthenticated)
    return (
      <>
        <Message message="Ingresa para aportar a nuesta comunidad "></Message>
        <Link to="/login">
          <Button type="primary">Ingresar</Button>
        </Link>
      </>
    );

  return <Outlet />;
}

export default EvidenciaLayout;
