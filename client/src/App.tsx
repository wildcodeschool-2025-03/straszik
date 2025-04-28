import "./App.css";
import { Outlet } from "react-router";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
