import styles from "./Button.module.css";
function Button({ children, onClick, type, style }) {
  return (
    <button
      style={style}
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
