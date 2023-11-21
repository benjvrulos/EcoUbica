import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";
import { useAuth } from "../contexts/UserProvider";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const { user } = useAuth();

  return (
    <div className={styles.app}>
      <SideBar />

      <Map />
      {user && <User />}
    </div>
  );
}

export default AppLayout;
