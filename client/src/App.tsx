import "./App.css";
import { Link, Outlet } from "react-router";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/rockband">Rockband</Link>
        <Link to="/discographie">Discographie</Link>
        <Link to="/backstage">Backstage</Link>
        <Link to="/evenements">Evènement</Link>
        <Link to="/boutique">Boutique</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
