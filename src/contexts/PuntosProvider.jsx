import { createContext, useCallback, useContext, useReducer } from "react";
import { getPunto as getPuntoApi, getPuntos, createPunto as createPuntoApi, deletePunto as deletePuntoApi } from "../../services/apiPuntos";

const PuntosContext = createContext();

const initialState = {
  puntosList: [],
  isLoading: false,
  currentPunto: {},
  error: "",
  currentUser: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "usuario/loaded":
      return { ...state, isLoading: false, currentUser: action.payload };
    case "puntos/loaded":
      return { ...state, isLoading: false, puntosList: action.payload };

    case "punto/loaded":
      return { ...state, isLoading: false, currentPunto: action.payload };
    case "punto/created":
      return {
        ...state,
        isLoading: false,
        puntosList: action.payload.role === "admin" ? [...state.puntosList, action.payload.punto] : state.puntosList,
        currentPunto: action.payload.role === "admin" ? action.payload.punto : state.currentPunto,
      };

    case "punto/deleted":
      return {
        ...state,
        isLoading: false,
        puntosList: state.puntosList.filter((punto) => punto.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function PuntosProvider({ children }) {
  const [{ puntosList, isLoading, currentPunto, error }, dispatch] = useReducer(reducer, initialState);

  async function fetchPuntos(comunaId) {
    dispatch({ type: "loading" });
    try {
      const data = await getPuntos(comunaId);

      dispatch({ type: "puntos/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading puntos...",
      });
    }
  }

  const getPunto = useCallback(
    async function getPunto(id) {
      if (Number(id) === currentPunto.id) return;
      dispatch({ type: "loading" });
      try {
        const data = await getPuntoApi(Number(id));

        dispatch({ type: "punto/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the punto...",
        });
      }
    },
    [currentPunto.id]
  );
  async function createPunto(newPunto, role) {
    dispatch({ type: "loading" });
    try {
      const data = await createPuntoApi(newPunto, role);

      dispatch({ type: "punto/created", payload: { punto: data, role } });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the punto...",
      });
    }
  }
  async function deletePunto(newPunto) {
    dispatch({ type: "loading" });
    try {
      const id = await deletePuntoApi(newPunto);
      dispatch({ type: "punto/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the punto...",
      });
    }
  }

  return (
    <PuntosContext.Provider
      value={{
        puntosList,
        isLoading,
        currentPunto,
        getPunto,
        error,
        fetchPuntos,
        createPunto,
        deletePunto,
      }}
    >
      {children}
    </PuntosContext.Provider>
  );
}

function usePuntos() {
  const context = useContext(PuntosContext);
  if (context === undefined) throw new Error("PuntosContext was used outside the PuntosProvider");
  return context;
}

export { PuntosProvider, usePuntos };
