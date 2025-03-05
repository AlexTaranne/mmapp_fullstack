import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="title">
        <img src="/belt.png" alt="" />
        <h1 className="navbar-logo">MMAPP</h1>
      </div>
      <section>
        <div className="menu-icon" onClick={toggleMenu} onKeyDown={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/fighters">Fighters</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/ranking">Ranking</Link>
          </li>
          <li>
            <Link to="/ranking">News</Link>
          </li>
          <li className="last-a">
            <Link to="/login">Se connecter</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}
