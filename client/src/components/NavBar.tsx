import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import "../styles/navbar.css";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const { role, setRole } = useAuth();

  const disconnet = () => {
    setRole("anonymous");
  };

  const links = [
    {
      name: "Fighters",
      path: "/fighters",
      role: ["anonymous", "utilisateur", "administrateur"],
    },
    {
      name: "Events",
      path: "/events",
      role: ["anonymous", "utilisateur", "administrateur"],
    },
    {
      name: "Rankings",
      path: "/ranking",
      role: ["anonymous", "utilisateur", "administrateur"],
    },
    {
      name: "News",
      path: "/news",
      role: ["anonymous", "utilisateur", "administrateur"],
    },
    {
      name: "Se connecter",
      path: "/auth",
      role: ["anonymous"],
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      role: ["administrateur"],
    },
  ];
  console.info("Current role:", role);
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
          {links
            .filter((link) => link.role.includes(role))
            .map((link) => (
              <li key={link.name}>
                <Link to={link.path} onClick={closeMenu}>
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>
      {role !== "anonymous" ? (
        <button type="button" onClick={disconnet}>
          Se déconnecter
        </button>
      ) : null}
    </nav>
  );
}
