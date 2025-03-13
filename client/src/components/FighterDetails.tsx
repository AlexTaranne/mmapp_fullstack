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
}

export default function FighterDetails() {
  const fighter = useLoaderData() as Fighter;
  console.info(fighter);

  return (
    <div className="fighter-details">
      <h1>
        {fighter.firstName} {fighter.name || fighter.lastName}
      </h1>
      <p> {fighter.nickname && `"${fighter.nickname}"`}</p>
      <img src={fighter.photo || fighter.imgUrl} alt="" />
      <p>{fighter.placeOfBirth}</p>
      <p>Gym: {fighter.trainsAt}</p>
      <p>Wins: {fighter.wins}</p>
      <p>Losses: {fighter.losses}</p>
    </div>
  );
}
