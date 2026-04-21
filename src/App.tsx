import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import ClientFormPage from "./pages/ClientFormPage";
import ClientsPage from "./pages/ClientsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0b3c5d",
    },
    secondary: {
      main: "#116466",
    },
    background: {
      default: "#f3f6fb",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Montserrat, "Segoe UI", sans-serif',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/clientes" element={<ClientsPage />} />
                <Route path="/clientes/nuevo" element={<ClientFormPage />} />
                <Route
                  path="/clientes/:id/editar"
                  element={<ClientFormPage />}
                />
              </Route>
            </Route>

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
