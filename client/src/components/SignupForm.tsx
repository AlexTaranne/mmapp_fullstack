import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { createUser } from "../services/request";

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

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [confirmPassword, setConfirmPassword] = useState(false);
  const toggleConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  const [checked, setChecked] = useState(false);
  const toggleCheck = () => {
    setChecked(!checked);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Créer ton compte</h1>
        <h3>Tous les champs sont obligatoires</h3>

        <label htmlFor="email">
          Email<p>*</p>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChangeForm}
          placeholder="Votre adresse email"
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
            Mot de passe<p>*</p>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            aria-invalid="false"
            aria-describedby="password-error-password"
            value={user.password}
            onChange={handleChangeForm}
            placeholder="Votre mot de passe"
          />
          <button type="button" onClick={togglePassword}>
            aa
          </button>
        </div>
        <div className="password-input">
          <label htmlFor="confirmPassword">
            Confirmez votre mot de passe<p>*</p>
          </label>
          <input
            type={confirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChangeForm}
            placeholder="Confirmez votre mot de passe"
          />
          <button type="button" onClick={toggleConfirmPassword}>
            aa
          </button>
        </div>
        <label htmlFor="checkbox" className="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            checked={checked}
            onChange={toggleCheck}
          />
          <p>En cochant cette case, vous acceptez les CGU.</p>
        </label>
        <div>
          <button type="submit" className="submit" disabled={!checked}>
            Créer un compte
          </button>
        </div>
      </form>
    </>
  );
}
