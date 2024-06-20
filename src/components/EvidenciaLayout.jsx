import { Link, Outlet } from "react-router-dom";
import { EvidenciaProvider } from "../contexts/EvidenciaProvider";
import { useAuth } from "../contexts/UserProvider";
import Message from "./Message";
import Button from "./Button";

function EvidenciaLayout() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated)
    return (
      <>
        <Message message="Ingresa para aportar a nuesta comunidad "></Message>
        <Link to="/login">
          <Button type="primary">Ingresar</Button>
        </Link>
      </>
    );

  return (
    <EvidenciaProvider userId={user.idUser}>
      <Outlet />
    </EvidenciaProvider>
  );
}

export default EvidenciaLayout;
