import styles from "./Reciclaje.module.css";
function Account() {
  const FAKE_USER = {
    name: "Benjamin",
    email: "cortesbenja@gmail.com",
    cargo: "admin",
    password: "qwerty",
    puntos: 23,
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>Usuario:</h6>
        <h3>
          <span>{FAKE_USER.name}</span>
        </h3>
      </div>

      <div className={styles.row}>
        <h6>Correo</h6>
        <p>{FAKE_USER.email}</p>
      </div>

      <div className={styles.row}>
        <h6>Cargo</h6>
        <p>{FAKE_USER.cargo}</p>
      </div>
    </div>
  );
}

export default Account;
