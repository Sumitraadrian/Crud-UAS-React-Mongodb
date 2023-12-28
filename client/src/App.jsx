import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Create, {
  action as actionCreate,
  loader as loaderCreate,
} from "./components/Create";
import Update, {
  action as actionUpdate,
  loader as loaderUpdate,
} from "./components/Update";
import Detail, { action as actionDelete, loader as loaderDetail } from "./components/Detail";

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          action: actionCreate,
          loader: loaderCreate,
          element: <Create />,
        },
        { path: "/:id", loader: loaderDetail, action: actionDelete, element: <Detail />},
        {
          path: "/:id/update",
          loader: loaderUpdate,
          action: actionUpdate,
          element: <Update />,
        },
      ])}
    />
  );
}
