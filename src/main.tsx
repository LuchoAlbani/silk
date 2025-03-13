import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/Routes/routes"; // 👈 Importamos el router corregido

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("No se encontró el elemento con id 'root'");

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* 👈 Usamos el router corregido */}
  </StrictMode>
);
