import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import App from "./App";

// page components

import Accueil from "./pages/Accueil/Accueil";
import Backstage from "./pages/Backstage/Backstage";
import Basket from "./pages/Basket/Basket.tsx";
import Boutique from "./pages/Boutique/Boutique";
import CGV from "./pages/CGV/CGV";
import Compte from "./pages/Compte/Compte";
import Contact from "./pages/Contact/Contact";
import Discographie from "./pages/Discographie/Discographie";
import Evenements from "./pages/Evenements/Evenements";
import Log from "./pages/Log/Log";
import MentionsLegales from "./pages/MentionsLegales/MentionsLegales.tsx";
import Rockband from "./pages/Rockband/Rockband";
import Sign from "./pages/Sign/Sign";

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
        path: "/panier",
        element: <Basket />,
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
      {
        path: "/sign-in",
        element: <Sign />,
      },
      {
        path: "/cgv",
        element: <CGV />,
      },
      {
        path: "/mentions-legales",
        element: <MentionsLegales />,
      },
    ],
  },
]);

// rendering

const rootElement = document.getElementById("root");

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
