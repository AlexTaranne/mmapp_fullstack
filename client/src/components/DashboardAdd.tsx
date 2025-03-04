import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface FighterType {
  id: number;
  lastName: string;
  firstName: string;
  nationality: string;
  photo: string;
  category_name?: string;
}

export default function DashboardAdd() {
  const [fighters, setFighters] = useState<FighterType[] | null>(null);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nationality, setNationality] = useState("");
  const [photo, setPhoto] = useState("");

  const fetchFighters = useCallback(() => {
    axios
      .get("http://localhost:3310/api/fighter")
      .then((response) => {
        console.info("Données récupérées :", response.data);
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
      .post("http://localhost:3310/api/fighter/", {
        lastName,
        firstName,
        nationality,
        photo,
      })
      .then((response) => {
        console.info("Fighter ajouté :", response.data);
        fetchFighters();
      })
      .catch((error) => console.error("Erreur lors de l'ajout :", error));
  };

  return (
    <div className="section-add">
      <form onSubmit={sendForm}>
        <p>Nom</p>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <p>Prénom</p>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <p>Pays</p>
        <input
          type="text"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
        <p>Photo</p>
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <input type="submit" value="Ajouter" />
      </form>

      {fighters ? (
        fighters.map((fighter) => (
          <div className="card-fighter" key={fighter.id}>
            {fighter.photo && (
              <img
                src={fighter.photo}
                alt={`${fighter.firstName} ${fighter.lastName}`}
              />
            )}
            <h3>
              {fighter.lastName} {fighter.firstName}
            </h3>
            <p>{fighter.nationality}</p>
            <p>{fighter.category_name || "Non classé"}</p>
          </div>
        ))
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
