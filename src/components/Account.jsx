import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserProvider";
import Button from "./Button";
import styles from "./Punto.module.css";

function Account() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <div className={styles.city}>
      <div className={styles.containerProfile}>
        <div className={styles.profile}>
          <h6>Avatar:</h6>
          <img
            src="/user-profile.png"
            alt={user.fullName}
          ></img>
        </div>
      </div>
      <div className={styles.row}>
        <h6>Nombre:</h6>
        <div>
          <h3>{user.fullName}</h3>
        </div>
      </div>

      <div className={styles.row}>
        <h6>Correo</h6>
        <p>{user.email}</p>
      </div>

      <div className={styles.buttons}>
        <Button
          type="danger"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Salir
        </Button>
      </div>
    </div>
  );
}

export default Account;
