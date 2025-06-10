// src/components/Routes/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../Home"; // 👈 Importa tu nuevo componente Home
import Bloggers from "../Bloggers/Bloggers";
import BloggerDetail from "../BloggerDetail/BloggerDetail";
import Servicios from "../Servicios/Servicios";
import ServiciosInterno from "../ServiciosInterno/ServiciosInterno";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> }, // 👈 Esta es la nueva Home como ruta hija
      { path: "blog", element: <Bloggers /> },
      { path: "bloggers/:id", element: <BloggerDetail /> },
      { path: "servicios", element: <Servicios /> },
      { path: "servicios-interno", element: <ServiciosInterno /> },
    ],
  },
]);
