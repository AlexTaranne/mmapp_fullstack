import { useLoaderData } from "react-router-dom";
import "../styles/fighterdetails.css";

interface Fighter {
  id: number;
  name: string;
  lastName: string;
  firstName: string;
  wins: number;
  losses: number;
  gym: string;
  nickname?: string;
  technicalKnockouts?: number;
  submissions?: number;
  photo: string;
  imgUrl: string;
  placeOfBirth: string;
  trainsAt: string;
  category: string;
  age: number;
}

export default function FighterDetails() {
  const fighter = useLoaderData() as Fighter;
  console.info(fighter);

  return (
    <div className="fighter-details">
      <div className="details-left">
        <h1>
          {fighter.firstName} {fighter.name || fighter.lastName}
        </h1>
        <p>{fighter.nickname && `"${fighter.nickname}"`}</p>
        <img src={fighter.photo || fighter.imgUrl} alt="Fighter" />
      </div>
      <div className="details-right">
        <p>
          <strong>Division:</strong> {fighter.category}
        </p>
        <p>
          <strong>Born in:</strong> {fighter.placeOfBirth}
        </p>
        <p>
          <strong>Age:</strong> {fighter.age}
        </p>
        <p>
          <strong>Gym:</strong> {fighter.trainsAt}
        </p>
        <p>
          <strong>Wins:</strong> {fighter.wins}
        </p>
        <p>
          <strong>Losses:</strong> {fighter.losses}
        </p>
      </div>
    </div>
  );
}
