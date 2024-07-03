import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import PuntoList from "./components/PuntoList";
import Form from "./components/Form";
import Punto from "./components/Punto";
import Account from "./components/Account";
import AporteList from "./components/AporteList";
import FormAporte from "./components/FormAporte";
import Resumen from "./components/Resumen";

import { PuntosProvider } from "./contexts/PuntosProvider";
import { AuthProvider } from "./contexts/UserProvider";
import { AporteProvider } from "./contexts/AporteProvider";
import Aporte from "./components/Aporte";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <PuntosProvider>
        <AporteProvider>
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
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
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
                  path="resumen"
                  element={<Resumen />}
                />
                <Route
                  path="puntos/:id"
                  element={<Punto />}
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

                <Route
                  path="form-evidencia"
                  element={<FormAporte />}
                />
                <Route
                  path="aportes"
                  element={<AporteList />}
                />
                <Route
                  path="aportes/:id"
                  element={<Aporte />}
                />
              </Route>
              <Route
                path="*"
                element={<PageNotFound />}
              />
            </Routes>
          </BrowserRouter>
        </AporteProvider>
      </PuntosProvider>
    </AuthProvider>
  );
}

export default App;
