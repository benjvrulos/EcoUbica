import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { useAuth } from "../contexts/UserProvider";

function User() {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    navigate("user");
  }

  return (
    <div className={styles.user}>
      <img
        src="/user-profile.png"
        alt={user.fullName}
      />
      <span>Bienvenido, {user.fullName}</span>
      <button onClick={handleClick}>Ver Perfil</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
