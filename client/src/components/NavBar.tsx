import axios from "axios";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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
  const { role, setRole, firstName, lastName, picture, id } = useAuth();
  console.info(lastName);

  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const disconnect = () => {
    axios
      .get(`${API}/api/logout`, { withCredentials: true })
      .then(() => {
        setRole("anonymous");
        closeMenu();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const links = [
    {
      name: "Fighters",
      path: "/fighters",
      role: ["anonymous", "utilisateur", "administrateur"],
    },
    {
      name: "Schedule",
      path: "/schedule",
      role: ["anonymous", "utilisateur", "administrateur"],
    },
    {
      name: "Rankings",
      path: "/rankings",
      role: ["anonymous", "utilisateur", "administrateur"],
    },
    {
      name: "News",
      path: "/news",
      role: ["anonymous", "utilisateur", "administrateur"],
    },

    {
      name: "Dashboard",
      path: "/dashboard",
      role: ["administrateur"],
    },
    {
      name: "Bets",
      path: "/odds",
      role: ["utilisateur", "administrateur"],
    },
    {
      name: "Videos",
      path: "/videos",
      role: ["utilisateur", "administrateur"],
    },
  ];

  return (
    <nav>
      <div className="title">
        <Link to="/" onClick={closeMenu}>
          <h1 className="navbar-logo">MMAPP</h1>
        </Link>
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
          {role === "anonymous" ? (
            <Link to="/auth" onClick={closeMenu} className="login-mobile">
              Login
            </Link>
          ) : (
            <Link to="/" className="disconnect-mobile">
              <button type="button" onClick={disconnect} onKeyDown={disconnect}>
                Disconnect
              </button>
            </Link>
          )}
          {role === "utilisateur" || role === "administrateur" ? (
            <li>
              <Link
                to={`/profil/${id}`}
                className="firstname-mobile"
                onClick={closeMenu}
              >
                <img
                  src={`http://localhost:3310/uploads/${picture}`}
                  alt=""
                  className="profil-picture"
                />
                <p>{firstName}</p>
              </Link>
            </li>
          ) : null}
        </ul>
      </section>
      <div className="auth-profil">
        {role === "utilisateur" || role === "administrateur" ? (
          <Link
            to={`/profil/${id}`}
            className="firstname-desktop"
            onClick={closeMenu}
          >
            <img
              src={`http://localhost:3310/uploads/${picture}`}
              alt=""
              className="profil-picture"
            />

            <p>{firstName}</p>
          </Link>
        ) : null}
        {role === "anonymous" ? (
          <Link to="/auth" onClick={closeMenu} className="login-desktop">
            Login
          </Link>
        ) : (
          <Link to="/" className="disconnect-desktop">
            <button type="button" onClick={disconnect} onKeyDown={disconnect}>
              Disconnect
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
