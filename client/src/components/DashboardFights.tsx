import axios from "axios";
import { useRef, useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";

interface VideoType {
  id: number;
  title: string;
  link: string;
  genre: string;
}

export default function DashboardFights() {
  const { videos } = useLoaderData() as { videos: VideoType[] };
  const API = import.meta.env.VITE_API_URL;
  const { revalidate } = useRevalidator();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [genre, setGenre] = useState("Fight");

  const deleteFights = (id: number) => {
    return axios
      .delete(`${API}/api/fights/${id}`, { withCredentials: true })
      .then(() => revalidate())
      .catch((error) => console.error(error));
  };

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `${API}/api/fights/`,
        { title, link, genre },
        { withCredentials: true },
      )
      .then((response) => {
        if (response.status === 201) {
          revalidate();
          setTitle("");
          setLink("");
          setGenre("Fight");
        } else {
          alert(response.data.error);
        }
      })
      .catch((error) => console.error("Erreur lors de l'ajout :", error));
  };

  const [updatedVideos, setUpdatedVideos] = useState({
    id: Number(),
    title: "",
    link: "",
    genre: "",
  });

  const handleEditVideos = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`${API}/api/fights/${updatedVideos.id}`, updatedVideos, {
        withCredentials: true,
      })
      .then(() => {
        revalidate();
        closeModal();
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la mise à jour :",
          error.response?.data || error,
        );
      });
  };

  const handleChangeVideosForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedVideos({ ...updatedVideos, [e.target.name]: e.target.value });
  };

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openModal = (videos: VideoType) => {
    setUpdatedVideos(videos);
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    dialogRef.current?.close();
    document.body.style.overflow = "";
  };

  return (
    <section className="videos-dashboard">
      <form onSubmit={sendForm} className="form-video">
        <p>Title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>Link</p>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <p>Genre</p>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="Fight">Fight</option>
          <option value="Interview">Interview</option>
        </select>
        <input type="submit" value="Add" className="input-button" />
      </form>
      {videos.map((video) => (
        <div key={video.id} className="video-card">
          <div className="description">
            <h4>{video.title}</h4>
            <h4>{video.genre}</h4>
          </div>
          <div>
            <button type="button" onClick={() => deleteFights(video.id)}>
              <img src="/garbage.png" alt="" />
            </button>
            <button type="button" onClick={() => openModal(video)}>
              <img src="/edit.png" alt="" />
            </button>
          </div>
        </div>
      ))}
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
          {updatedVideos && (
            <form onSubmit={handleEditVideos} className="form-dashboard">
              <p>Title</p>
              <input
                type="text"
                id="title"
                value={updatedVideos.title}
                name="title"
                placeholder="Title"
                onChange={handleChangeVideosForm}
              />
              <p>Link</p>
              <input
                type="text"
                value={updatedVideos.link}
                name="link"
                id="link"
                placeholder="Link"
                onChange={handleChangeVideosForm}
              />
              <p>Nationality</p>
              <select name="" id="">
                <option value="">Fight</option>
                <option value="">Interview</option>
              </select>

              <button type="submit">Send</button>
            </form>
          )}
        </div>
      </dialog>
    </section>
  );
}
