import { useEffect } from "react";
import { useAportes } from "../contexts/AporteProvider";
import { useAuth } from "../contexts/UserProvider";
import { Link, Outlet } from "react-router-dom";
import Message from "./Message";
import Button from "./Button";

function AporteLayout() {
  const { user, isAuthenticated } = useAuth();
  const { getAllAportes } = useAportes();

  useEffect(
    function () {
      if (isAuthenticated) getAllAportes(user.userId);
    },
    [user.userId, isAuthenticated]
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

export default AporteLayout;
