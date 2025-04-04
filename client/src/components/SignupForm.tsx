import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { createUser } from "../services/request";

import "../styles/login.css";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as UserData);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await createUser(user);

      if (success) {
        setTimeout(() => {
          navigate("/auth");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [checked, setChecked] = useState(false);
  const toggleCheck = () => {
    setChecked(!checked);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Create your account</h1>
        <h3>All fields are required</h3>

        <label htmlFor="email">
          Email<p>*</p>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChangeForm}
          placeholder="Your email"
        />

        <label htmlFor="lastName">
          Lastname<p>*</p>
        </label>
        <input
          type="lastName"
          id="lastName"
          name="lastName"
          value={user.lastName}
          onChange={handleChangeForm}
          placeholder="Your lastname"
        />
        <label htmlFor="firstName">
          Firstname<p>*</p>
        </label>
        <input
          type="firstName"
          id="firstName"
          name="firstName"
          value={user.firstName}
          onChange={handleChangeForm}
          placeholder="Your firstname"
        />
        <div className="password-input">
          <label htmlFor="password">
            Password<p>*</p>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            aria-invalid="false"
            aria-describedby="password-error-password"
            value={user.password}
            onChange={handleChangeForm}
            placeholder="Your password"
          />
        </div>
        <div className="password-input">
          <label htmlFor="confirmPassword">
            Confirm your password<p>*</p>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChangeForm}
            placeholder="Confirm your password"
          />
        </div>
        <label htmlFor="checkbox" className="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            checked={checked}
            onChange={toggleCheck}
          />
          <p>Accept all rights reserved</p>
        </label>
        <div>
          <button type="submit" className="input-button" disabled={!checked}>
            Create account
          </button>
        </div>
      </form>
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
    </div>
  );
}
