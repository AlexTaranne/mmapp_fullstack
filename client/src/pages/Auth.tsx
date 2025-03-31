import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";
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
  const { setRole, setFirstName, setLastName, setPicture, setId, role } =
    useAuth();

  const sendCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:3310/api/login", credentials, {
        withCredentials: true,
      })
      .then((response) => {
        setRole(response.data.role);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPicture(response.data.picture);
        setId(response.data.id);

        if (role === "administrateur") {
          const notifySucces = () => {
            toast.success(
              `Hello ${response.data.firstName}, you are connected`,
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
              },
            );
          };
          notifySucces();
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          const notifySucces = () => {
            toast.success(
              `Hello ${response.data.firstName}, you are connected.`,
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
              },
            );
          };
          notifySucces();
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch(() =>
        toast.error("Login failed! Please check your credentials.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        }),
      );
  };

  return (
    <>
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </>
  );
}
