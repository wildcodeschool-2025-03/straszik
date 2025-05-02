import "./App.css";
import { Outlet } from "react-router";
import { BasketProvider } from "./Context/BasketContext";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BasketProvider>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </BasketProvider>
  );
}

export default App;
