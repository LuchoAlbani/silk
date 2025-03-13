import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Bloggers from "../Bloggers/Bloggers";
import BloggerDetail from "../BloggerDetail/BloggerDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/blog",
    element: <Bloggers />,
  },
  {
    path: "/bloggers/:id",
    element: <BloggerDetail />,
  },
]);
