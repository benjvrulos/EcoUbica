import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  getPunto as getPuntoApi,
  getPuntos,
  createPunto as createPuntoApi,
  deletePunto as deletePuntoApi,
} from "../../services/appPuntos";

const PuntosContext = createContext();

const initialState = {
  puntosList: [],
  isLoading: false,
  currentPunto: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "puntos/loaded":
      return { ...state, isLoading: false, puntosList: action.payload };

    case "punto/loaded":
      return { ...state, isLoading: false, currentPunto: action.payload };
    case "punto/created":
      return {
        ...state,
        isLoading: false,
        puntosList: [...state.puntosList, action.payload],
        currentPunto: action.payload,
      };

    case "punto/deleted":
      return {
        ...state,
        isLoading: false,
        puntosList: state.puntosList.filter(
          (punto) => punto.id !== action.payload
        ),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function PuntosProvider({ children }) {
  const [{ puntosList, isLoading, currentPunto, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchPuntos() {
      dispatch({ type: "loading" });
      try {
        const data = await getPuntos();

        dispatch({ type: "puntos/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading puntos...",
        });
      }
    }
    fetchPuntos();
  }, []);

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
  async function createPunto(newPunto) {
    dispatch({ type: "loading" });
    try {
      const data = await createPuntoApi(newPunto);

      dispatch({ type: "punto/created", payload: data[0] });
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
  if (context === undefined)
    throw new Error("PuntosContext was used outside the PuntosProvider");
  return context;
}

export { PuntosProvider, usePuntos };
