import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { useDarkTheme } from "./services/DarkThemeContext";
function App() {
  const { darkTheme } = useDarkTheme();

  const root = document.querySelector("#root");

  if (root) {
    root.className = darkTheme ? "dark" : "light";
  }

  return (
    <>
      <main>
        <NavBar />

        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default App;
