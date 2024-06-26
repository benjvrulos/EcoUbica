import { createContext, useContext, useReducer } from "react";
import { createUserInfo, fetchUserInfo, loginApi, logoutApi, signUpApi } from "../../services/apiUsers";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: {},
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  async function login(email, password) {
    dispatch({ type: "loading" });

    try {
      const { user } = await loginApi(email, password);
      const userInfo = await fetchUserInfo(user.id);
      const userFull = { ...userInfo[0], correo: user.email };
      dispatch({ type: "login", payload: userFull });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Contraseña o email incorrecto",
      });
    }
  }

  async function signUp(email, password, fullName) {
    dispatch({ type: "loading" });
    try {
      const data = await signUpApi(email, password);
      const idUser = data.user.id;
      const respCreateUserInfo = await createUserInfo(fullName, idUser);
      const userInfo = await fetchUserInfo(idUser);

      const userFull = { ...userInfo[0], correo: user.email };
      dispatch({ type: "login", payload: userFull });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Contraseña o email incorrecto",
      });
    }

    // return data.user;
  }

  async function logout() {
    dispatch({ type: "loading" });
    try {
      await logoutApi();
      dispatch({ type: "logout" });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loging out",
      });
    }
  }
  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signUp }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContext was used outisede AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
