import "./App.css";
import { Link, Outlet } from "react-router";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
     
        <Header />
       
      
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
