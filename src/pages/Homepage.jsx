import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          EcoUbica
          <br />
          tu amigo que te ayuda a reciclar
        </h1>
        <h2>
          EcoUbica es una aplicación que te permite, consultar, registrar y
          actualizar puntos verdes de interés.
        </h2>
        <Link
          to="/app"
          className="cta"
        >
          Comienza ahora ya
        </Link>
      </section>
    </main>
  );
}
