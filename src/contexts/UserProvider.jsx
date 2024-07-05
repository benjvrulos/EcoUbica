import { createContext, useContext, useEffect, useReducer } from "react";
import { createAccount, fetchAccount, loginApi, logoutApi, signUpApi } from "../../services/apiUsers";
import supabase from "../../services/supabase";
import LoginSpinner from "../components/LoginSpinner";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false, error: "" };
    case "sign-up":
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false, error: "" };
    case "logout":
      return { ...state, isLoading: false, user: null, isAuthenticated: false };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error, isLoading }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getSessionApi() {
      dispatch({ type: "loading" });
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        dispatch({ type: "logout" });
      }
      const account = await fetchAccount(data.session.user.id);
      const accountFull = { ...account[0], email: data.session.user.email };
      dispatch({ type: "login", payload: accountFull });
    }

    getSessionApi();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {});

    return () => subscription.unsubscribe();
  }, []);

  async function login(email, password) {
    dispatch({ type: "loading" });

    try {
      const { user } = await loginApi(email, password);
      const account = await fetchAccount(user.id);
      const accountFull = { ...account[0], email: user.email };
      dispatch({ type: "login", payload: accountFull });
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
      const userId = data.user.id;

      const respCreateUserInfo = await createAccount(fullName, userId);
      const account = await fetchAccount(userId);
      const accountFull = { ...account[0], email };
      console.log(accountFull);
      dispatch({ type: "sign-up", payload: accountFull });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "rejected",
        payload: "Contraseña o email incorrecto",
      });
    }
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

  function setError() {
    dispatch({ type: "rejected", payload: "No ingresaste correo o contraseña" });
  }
  if (isLoading) return <LoginSpinner />;

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signUp, error, setError }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContext was used outisede AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
