import { createContext, useContext, useEffect, useReducer } from "react";
import { getEvidenciasApi } from "../../services/apiEvidencia";

const EvidenciaContext = createContext();

const initialState = {
  evidenciaList: [],
  isLoading: false,
  currentEvidencia: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "evidencias/loaded":
      return { ...state, isLoading: false, evidenciaList: action.payload };
    case "evidencia/loaded":
      return { ...state, isLoading: false, currentEvidencia: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function EvidenciaProvider({ children, userId }) {
  const [{ evidenciaList, isLoading }, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    async function getEvidencia(userId) {
      dispatch({ type: "loading" });

      try {
        const data = await getEvidenciasApi(userId);
        dispatch({ type: "evidencias/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "Contraseña o email incorrecto",
        });
      }
    }
    getEvidencia(userId);
  }, []);

  return (
    <EvidenciaContext.Provider
      value={{
        evidenciaList,
        isLoading,
      }}
    >
      {children}
    </EvidenciaContext.Provider>
  );
}

function useEvidencias() {
  const context = useContext(EvidenciaContext);
  if (context === undefined) throw new Error("EvidenciaContext was used outside the EvidenciaProvider");
  return context;
}

export { EvidenciaProvider, useEvidencias };
