import Spinner from "./Spinner";
import styles from "./LoginSpinner.module.css";

function LoginSpinner() {
  return (
    <div className={styles.allPage}>
      <Spinner />;
    </div>
  );
}

export default LoginSpinner;
