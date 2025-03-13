import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour fermer le menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="title">
        <Link to="/" onClick={closeMenu}>
          <img src="/belt.png" alt="" />
        </Link>
        <h1 className="navbar-logo">MMAPP</h1>
      </div>
      <section>
        <div className="menu-icon" onClick={toggleMenu} onKeyDown={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/fighters" onClick={closeMenu}>
              Fighters
            </Link>
          </li>
          <li>
            <Link to="/events" onClick={closeMenu}>
              Events
            </Link>
          </li>
          <li>
            <Link to="/ranking" onClick={closeMenu}>
              Ranking
            </Link>
          </li>
          <li>
            <Link to="/news" onClick={closeMenu}>
              News
            </Link>
          </li>
          <li className="last-a">
            <Link to="/auth" onClick={closeMenu}>
              Se connecter
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}
