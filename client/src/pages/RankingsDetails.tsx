import { Link, useLoaderData } from "react-router-dom";
interface Fighter {
  id: string;
  name: string;
}

interface RankTypes {
  id: string;
  categoryName: string;
  champion: {
    id: string;
    championName: string;
  };
  fighters: Fighter[];
}

export default function RankingDetails() {
  const rank = useLoaderData() as RankTypes;
  const data = rank.fighters;
  return (
    <div>
      <h1>{rank.id}</h1>
      <h2>{rank.categoryName}</h2>
      <h3>{rank.champion.championName}</h3>
      <img
        src={`https://www.octagon-api.com/fighters/${rank.champion.id}.webp`}
        alt="champ"
      />

      {data.map((fighter) => (
        <>
          <Link to={`/fighterdetails/${fighter.id}`} key={fighter.id}>
            <p key={fighter.id}>{fighter.name}</p>
            <img
              src={`https://www.octagon-api.com/fighters/${fighter.id}.webp`}
              alt="pics of champions"
              key={fighter.id}
            />
          </Link>
        </>
      ))}
    </div>
  );
}
