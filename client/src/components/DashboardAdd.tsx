import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";

import { editFighter } from "../services/request";

interface FighterType {
  id: number;
  lastName: string;
  firstName: string;
  nationality: string;
  photo: string;
  category_name: string;
  category_id: number;
  wins: number;
  losses: number;
  nickname: string;
}

export default function DashboardAdd() {
  const [fighters, setFighters] = useState<FighterType[] | null>(null);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nationality, setNationality] = useState("");
  const [photo, setPhoto] = useState("");
  const [wins, setWins] = useState("");
  const [losses, setLosses] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const fetchFighters = useCallback(() => {
    axios
      .get(`${API}/api/fighter`, { withCredentials: true })
      .then((response) => {
        setFighters(response.data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération :", error),
      );
  }, []);

  useEffect(() => {
    fetchFighters();
  }, [fetchFighters]);

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `${API}/api/fighter/`,
        {
          lastName,
          firstName,
          nationality,
          photo,
          wins,
          losses,
          nickname,
        },
        { withCredentials: true },
      )
      .then((response) => {
        if (response.status === 201) {
          fetchFighters();
          const notifySucces = () => {
            toast.success("Fighter add with success.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Zoom,
            });
          };
          notifySucces();
        } else {
          const notifyError = () => {
            toast.error(`${response.data.error}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Zoom,
            });
          };
          notifyError();
        }
      })
      .catch((error) => console.error("Erreur lors de l'ajout :", error));
  };

  const deleteFighter = (id: number) => {
    return axios
      .delete(`${API}/api/fighter/${id}`, { withCredentials: true })
      .then(() => {
        navigate(0);
      })
      .catch((error) => console.error(error));
  };

  const [updatedFighter, setUpdatedFighter] = useState({
    id: Number(),
    lastName: "",
    firstName: "",
    nationality: "",
    photo: "",
    category_id: Number(),
    wins: Number(),
    losses: Number(),
    nickname: "",
  });

  const handleEditFighter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editFighter(updatedFighter.id, updatedFighter)
      .then(() => {
        navigate(0);
        closeModal();
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du fighter:", error);
      });
  };

  const handleChangeFighterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedFighter({ ...updatedFighter, [e.target.name]: e.target.value });
  };

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openModal = (fighter: FighterType) => {
    setUpdatedFighter(fighter);
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    dialogRef.current?.close();
    document.body.style.overflow = "";
  };

  return (
    <div className="section-add">
      <form onSubmit={sendForm}>
        <p>Lastname</p>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <p>Firstname</p>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <p>Country</p>
        <input
          type="text"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
        <p>Picture</p>
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <p>Wins</p>
        <input
          type="text"
          value={wins}
          onChange={(e) => setWins(e.target.value)}
        />
        <p>Losses</p>
        <input
          type="text"
          value={losses}
          onChange={(e) => setLosses(e.target.value)}
        />
        <p>Nickname</p>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input type="submit" value="Add" className="input-button" />
      </form>

      {fighters ? (
        fighters.map((fighter) => (
          <div className="card-fighter" key={fighter.id}>
            <h4>
              {fighter.lastName} {fighter.firstName}
            </h4>
            <div>
              <button type="button" onClick={() => deleteFighter(fighter.id)}>
                <img src="/garbage.png" alt="" />
              </button>
              <button type="button" onClick={() => openModal(fighter)}>
                <img src="/edit.png" alt="" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <dialog
        ref={dialogRef}
        className="modal"
        onClick={closeModal}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            closeModal();
          }
        }}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          {updatedFighter && (
            <form onSubmit={handleEditFighter} className="form-dashboard">
              <p>Lastname</p>
              <input
                type="text"
                id="lastName"
                value={updatedFighter.lastName}
                name="lastName"
                placeholder="Lastname"
                onChange={handleChangeFighterForm}
              />
              <p>Firstname</p>
              <input
                type="text"
                value={updatedFighter.firstName}
                name="firstName"
                id=""
                placeholder="Firstname"
                onChange={handleChangeFighterForm}
              />
              <p>Nationality</p>
              <input
                type="text"
                value={updatedFighter.nationality}
                name="nationality"
                placeholder="Nationality"
                onChange={handleChangeFighterForm}
              />
              <p>Picture</p>
              <input
                type="text"
                id="photo"
                value={updatedFighter.photo}
                name="photo"
                placeholder="URL"
                onChange={handleChangeFighterForm}
              />
              <p>Category</p>
              <input
                type="text"
                value={updatedFighter.category_id}
                name="category_id"
                placeholder="Category"
                onChange={handleChangeFighterForm}
              />
              <p>Wins</p>
              <input
                type="text"
                value={updatedFighter.wins}
                name="wins"
                placeholder="Number of wins"
                onChange={handleChangeFighterForm}
              />
              <p>Losses</p>
              <input
                type="text"
                value={updatedFighter.losses}
                name="losses"
                placeholder="Number of losses"
                onChange={handleChangeFighterForm}
              />
              <p>Nickname</p>
              <input
                type="text"
                name="nickname"
                placeholder="Nickname"
                value={updatedFighter.nickname}
                onChange={handleChangeFighterForm}
              />
              <button type="submit">Send</button>
            </form>
          )}
        </div>
      </dialog>
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
