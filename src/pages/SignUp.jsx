import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from "../contexts/UserProvider";

import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      if (password.length < 6) {
        console.log("contraseña debe tener al menos 6 caracteres");
      } else if (password !== confirmationPassword) {
        console.log("Contraseñas distintas");
      } else {
        signUp(email, password, fullName);
      }
    } else {
      console.log("no ingresaste nada");
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />

      {isLoading ? (
        <Spinner />
      ) : (
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.row}>
            <label htmlFor="fullName">Nombre</label>
            <input
              type="text"
              id="fullName"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="email">Correo</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="confirmationPassword">Repitir contraseña</label>
            <input
              type="password"
              id="confirmationPassword"
              onChange={(e) => setConfirmationPassword(e.target.value)}
              value={confirmationPassword}
            />
          </div>
          <div>
            <Button type="primary">Login</Button>
          </div>
        </form>
      )}
    </main>
  );
}
