import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

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
  const { setRole } = useAuth();

  const sendCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3310/api/login", credentials, {
        withCredentials: true,
      })
      .then((response) => {
        setRole(response.data.role);
        console.info(response);
        if (response.data.role === "administrateur") {
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
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
        <input type="submit" />
      </form>
      <div>
        <h3>Pas encore inscrit?</h3>
        <Link to="/signup">Inscrivez-vous</Link>
      </div>
    </>
  );
}
