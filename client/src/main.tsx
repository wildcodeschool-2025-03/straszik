import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

import Accueil from "./pages/Accueil/Accueil";
import Admin from "./pages/Admin/Admin.tsx";
import Backstage from "./pages/Backstage/Backstage";
import Basket from "./pages/Basket/Basket.tsx";
import Boutique from "./pages/Boutique/Boutique";
import CGV from "./pages/CGV/CGV";
import Compte from "./pages/Compte/Compte";
import Contact from "./pages/Contact/Contact";
import Discographie from "./pages/Discographie/Discographie";
// page components
import EnterPage from "./pages/EnterPage/EnterPage";
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
        element: <EnterPage />,
      },
      { path: "/home", element: <Accueil /> },
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
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

// rendering

const rootElement = document.getElementById("root");

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
