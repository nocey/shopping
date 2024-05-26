import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "/public/output.css";
import Layout from "./layout/index.tsx";
import ProductList from "./pages/list/index.tsx";
import ProductDetail from "./pages/detail/index.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <ProductList />,
      },
      {
        path: ":id",
        element: <ProductDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
