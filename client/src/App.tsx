import "./App.css";
import { Outlet } from "react-router";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
