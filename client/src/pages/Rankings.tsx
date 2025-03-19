import { Link, useLoaderData } from "react-router-dom";

interface Champion {
  id: string;
  championName: string;
}

interface Category {
  id: string;
  categoryName: string;
  champion: Champion;
}

export default function Rankings() {
  const rankings = useLoaderData() as Category[];

  return (
    <div>
      {rankings.map((category) => (
        <Link to={`/rankings/${category.id}`} key={category.categoryName}>
          <div className="rankingscards">
            <h2>{category.categoryName}</h2>
            <p>{category.champion.championName}</p>
            <img
              src={`https://www.octagon-api.com/fighters/${category.champion.id}.webp`}
              alt="pics of champions"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
