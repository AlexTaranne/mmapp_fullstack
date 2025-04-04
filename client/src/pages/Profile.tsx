import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useDarkTheme } from "../services/DarkThemeContext";
import "../styles/profil.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
  role: string;
}

export default function Profile() {
  const {
    id,
    firstName,
    lastName,
    picture,
    setFirstName,
    setLastName,
    setPicture,
  } = useAuth();

  const [firstNameForm, setFirstNameForm] = useState(firstName);
  const [lastNameForm, setLastNameForm] = useState(lastName);
  const [pictureForm, setPictureForm] = useState<File | string | null>(null);
  const { revalidate } = useRevalidator();

  useEffect(() => {
    setFirstNameForm(firstName);
    setLastNameForm(lastName);
    setPictureForm(picture);
  }, [firstName, lastName, picture]);

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstNameForm);
    formData.append("lastName", lastNameForm);

    if (pictureForm && pictureForm instanceof File) {
      formData.append("picture", pictureForm);
    } else {
    }

    try {
      const response = await axios.put(
        `http://localhost:3310/api/users/${id}`,
        formData,
      );
      setFirstName(firstNameForm);
      setLastName(lastNameForm);
      setPicture(response.data.picture);
      revalidate();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const user = useLoaderData() as User;

  const { darkTheme, setDarkTheme } = useDarkTheme();
  const switchMode = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className="profil">
      <h2>{firstName}'s profil</h2>

      <img
        src={`http://localhost:3310/uploads/${user.picture}`}
        alt="Profil"
        onError={(e) => console.error("Image not found", e)}
      />
      <h4>
        {user.firstName} {user.lastName}
      </h4>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <button type="button" onClick={switchMode} className="dark-mode">
        Light/Dark
      </button>
      <form onSubmit={sendForm}>
        <label htmlFor="firstname">Firstname</label>
        <input
          type="text"
          value={firstNameForm}
          onChange={(e) => setFirstNameForm(e.target.value)}
          placeholder="Prénom"
        />
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          value={lastNameForm}
          onChange={(e) => setLastNameForm(e.target.value)}
          placeholder="Nom"
        />
        <label htmlFor="picture">Profil picture</label>
        <input
          type="file"
          onChange={(e) => setPictureForm(e.target.files?.[0] || null)}
          lang="en"
        />
        <button type="submit" className="maj-button">
          Update profil
        </button>
      </form>
    </div>
  );
}
