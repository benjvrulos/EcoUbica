import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import ReciclajeList from "./components/PuntoList";

import Form from "./components/Form";
import { PuntosProvider } from "./contexts/PuntosProvider";
import Reciclaje from "./components/Reciclaje";
import Account from "./components/Account";

import { AuthProvider } from "./contexts/UserProvider";
import EvidenciaList from "./components/EvidenciaList";
import FormEvidencia from "./components/FormEvidencia";
import EvidenciaLayout from "./components/EvidenciaLayout";
import PuntoList from "./components/PuntoList";

function App() {
  return (
    <AuthProvider>
      <PuntosProvider>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={<Homepage />}
            />
            <Route
              path="product"
              element={<Product />}
            />
            <Route
              path="pricing"
              element={<Pricing />}
            />
            <Route
              path="login"
              element={<Login />}
            />
            <Route
              path="sign-up"
              element={<SignUp />}
            />
            <Route
              path="app"
              element={<AppLayout />}
            >
              <Route
                index
                element={
                  <Navigate
                    replace
                    to="puntos"
                  />
                }
              />
              <Route
                path="puntos"
                element={<PuntoList />}
              />
              <Route
                path="puntos/:id"
                element={<Reciclaje />}
              />
              <Route
                path="form"
                element={<Form />}
              />
              <Route
                path="basural"
                element={<PuntoList />}
              />
              <Route
                path="reciclaje"
                element={<PuntoList />}
              />
              <Route
                path="user"
                element={<Account />}
              />

              <Route element={<EvidenciaLayout />}>
                <Route
                  path="form-evidencia"
                  element={<FormEvidencia />}
                />
                <Route
                  path="aportes"
                  element={<EvidenciaList />}
                />
              </Route>
            </Route>
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </BrowserRouter>
      </PuntosProvider>
    </AuthProvider>
  );
}

export default App;
