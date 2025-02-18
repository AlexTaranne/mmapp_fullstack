import { useEffect } from "react"
import axios from "axios"
import { useState } from "react";
export default function Fighter() {

    const [fighter, setFighter] = useState(null);
const [lastName, setLastName] = useState("");
const [firstName, setFirstName] = useState("");
const [nationality, setNationality] = useState("");
const [photo, setPhoto]= useState("");

const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  axios.post("http://localhost:3310/api/fighter/", {
  lastName: lastName, firstName:firstName, nationality:nationality, photo:photo,}).then((response) => console.info(response))
  .catch((error) => console.error(error));
}

    useEffect(() => {
        axios
          .get("http://localhost:3310/api/fighter")
          .then((response) => {
            console.info("Données récupérées :", response.data); 
            setFighter(response.data);
          })
          .catch((error) => console.error("Erreur lors de la récupération :", error));
      }, []);
    
const handleChangeLastName= (e: React.ChangeEvent<HTMLInputElement>) => {
  setLastName(e.currentTarget.value);
}

const handleChangeFirstName= (e: React.ChangeEvent<HTMLInputElement>) => {
  setFirstName(e.currentTarget.value);
}

const handleChangeNationality= (e: React.ChangeEvent<HTMLInputElement>) => {
  setNationality(e.currentTarget.value);
}

const handleChangePhoto= (e: React.ChangeEvent<HTMLInputElement>) => {
  setPhoto(e.currentTarget.value);
}

      return (
        <div>
          <h1>Liste des Fighters</h1>
          {fighter ? (
            fighter.map((fighter) => (
              <><h3 key={fighter.id}>{fighter.lastName}</h3><p>{fighter.firstName}</p>
              <p>{fighter.nationality}</p></>
            ))
          ) : (
            <p>Chargement...</p>
          )}
          <form onSubmit={sendForm}>
            <p>Nom</p>
            <input type="text" onChange={handleChangeLastName} />
            <p>Prénom</p>
            <input type="text" onChange={handleChangeFirstName} />
            <p>Pays</p>
            <input type="text" onChange={handleChangeNationality} />
            <p>Photo</p>
            <input type="text" onChange={handleChangePhoto}/>
            <input type="submit" />
          </form>
        </div>
      );
    }