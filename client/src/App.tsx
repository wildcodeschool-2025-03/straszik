import "./App.css";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { BasketProvider } from "./Context/BasketContext";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation();

  return (
    <div>
      <BasketProvider>
        <main className="min-h-screen ">
          <Outlet />
        </main>
        {location.pathname !== "/" && <Footer />}
      </BasketProvider>
    </div>
  );
}

export default App;
