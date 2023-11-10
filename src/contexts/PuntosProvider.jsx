import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
const BASE_URL = "http://localhost:9000";

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
        const res = await fetch(`${BASE_URL}/puntosLimpios`);
        const data = await res.json();

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

  async function getPunto(id) {
    if (Number(id) === currentPunto.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/puntosLimpios/${id}`);
      const data = await res.json();
      console.log(data);
      dispatch({ type: "punto/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the punto...",
      });
    }
  }

  return (
    <PuntosContext.Provider
      value={{ puntosList, isLoading, currentPunto, getPunto, error }}
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
