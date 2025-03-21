import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import "../styles/login.css";

export default function Auth() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const navigate = useNavigate();
  const { setRole, setFirstName } = useAuth();

  const sendCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3310/api/login", credentials, {
        withCredentials: true,
      })
      .then((response) => {
        setRole(response.data.role);
        setFirstName(response.data.firstName);

        if (response.data.role === "administrateur") {
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="login">
      <form onSubmit={sendCredentials}>
        <p>Email</p>
        <input
          type="email"
          name="email"
          onChange={handleChangeCredentials}
          value={credentials.email}
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          onChange={handleChangeCredentials}
          value={credentials.password}
        />
        <input type="submit" className="input-button" />
      </form>
      <div>
        <h3>Not yet registered?</h3>
        <Link to="/signup" className="signlink">
          <u>Sign up</u>
        </Link>
      </div>
    </div>
  );
}
