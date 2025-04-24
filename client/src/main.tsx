import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import App from "./App";

// page components

import Accueil from "./pages/Accueil/Accueil";
import Backstage from "./pages/Backstage/Backstage";
import Boutique from "./pages/Boutique/Boutique";
import Compte from "./pages/Compte/Compte";
import Contact from "./pages/Contact/Contact";
import Discographie from "./pages/Discographie/Discographie";
import Evenements from "./pages/Evenements/Evenements";
import Log from "./pages/Log/Log";
import Rockband from "./pages/Rockband/Rockband";

// router creation

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/rockband",
        element: <Rockband />,
      },
      {
        path: "/discographie",
        element: <Discographie />,
      },
      {
        path: "/backstage",
        element: <Backstage />,
      },
      {
        path: "/evenements",
        element: <Evenements />,
      },
      {
        path: "/boutique",
        element: <Boutique />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/compte",
        element: <Compte />,
      },
      {
        path: "/log-in",
        element: <Log />,
      },
    ],
  },
]);

// rendering

const rootElement = document.getElementById("root");

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
