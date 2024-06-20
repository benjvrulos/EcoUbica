import { Outlet } from "react-router-dom";
import { EvidenciaProvider } from "../contexts/EvidenciaProvider";
import { useAuth } from "../contexts/UserProvider";

function EvidenciaLayout() {
  const { user, isAuthenticated } = useAuth();
  console.log(user);
  if (!isAuthenticated) return <p>NO</p>;
  return (
    <EvidenciaProvider userId={user.idUser}>
      <Outlet />
    </EvidenciaProvider>
  );
}

export default EvidenciaLayout;
