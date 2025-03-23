import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Bloggers from "../Bloggers/Bloggers";
import BloggerDetail from "../BloggerDetail/BloggerDetail";
import Servicios from "../Servicios/Servicios";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "blog", element: <Bloggers /> },
      { path: "bloggers/:id", element: <BloggerDetail /> },
      { path: "servicios", element: <Servicios /> },
    ],
  },
]);
