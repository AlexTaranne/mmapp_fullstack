import { Link, useLoaderData } from "react-router-dom";
import "../styles/rankingsdetails.css";
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
    <>
      <h2 className="title-cat">{rank.categoryName}</h2>
      <div className="rank-all">
        <div>
          <h4>{rank.champion.championName}</h4>
          <img
            src={`https://www.octagon-api.com/fighters/${rank.champion.id}.webp`}
            alt="champ"
          />
        </div>
        {data.map((fighter) => (
          <>
            <Link to={`/fighterdetails/${fighter.id}`} key={fighter.id}>
              <div>
                <h4 key={fighter.id}>{fighter.name}</h4>
                <img
                  src={`https://www.octagon-api.com/fighters/${fighter.id}.webp`}
                  alt="pics of champions"
                  key={fighter.id}
                />
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
}
