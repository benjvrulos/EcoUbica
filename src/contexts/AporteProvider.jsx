import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { getAllAportesApi } from "../../services/apiAportes";

const AporteContext = createContext();

const initialState = {
  aporteList: [],
  isLoading: false,
  currentAporte: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "aportes/loaded":
      return { ...state, isLoading: false, aporteList: action.payload };
    case "aporte/loaded":
      return { ...state, isLoading: false, currentAporte: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function AporteProvider({ children }) {
  const [{ aporteList, isLoading, currentAporte }, dispatch] = useReducer(reducer, initialState);

  async function getAllAportes(userId) {
    dispatch({ type: "loading" });

    try {
      const data = await getAllAportesApi(userId);
      dispatch({ type: "aportes/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Contraseña o email incorrecto",
      });
    }
  }

  return (
    <AporteContext.Provider
      value={{
        getAllAportes,
        aporteList,
        isLoading,
      }}
    >
      {children}
    </AporteContext.Provider>
  );
}

function useAportes() {
  const context = useContext(AporteContext);
  if (context === undefined) throw new Error("AporteContext was used outside the AporteProvider");
  return context;
}

export { AporteProvider, useAportes };
