import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import FighterList from "../components/FighterList";
import "../styles/fighterspage.css";

interface Fighter {
  id: number;
  firstName: string;
  lastName: string;
  weightClass: string;
  category_name: string;
}

export default function Fighters() {
  const fighters = useLoaderData() as Fighter[];
  console.info(fighters);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [weightClass, setWeightClass] = useState("");

  const sortedFighters = [...fighters]
    .filter((fighter) =>
      weightClass ? fighter.category_name === weightClass : true,
    )
    .sort((a, b) => {
      const comparison = a.lastName.localeCompare(b.lastName);
      return sortOrder === "asc" ? comparison : -comparison;
    });

  return (
    <div className="fighters-page">
      <h3>Fighters List</h3>
      <div className="sort-options">
        <p className="sort">Sort alphabetically</p>
        <label>
          <input
            type="radio"
            name="sortOrder"
            value="asc"
            checked={sortOrder === "asc"}
            onChange={() => setSortOrder("asc")}
          />
          A-Z
        </label>
        <label>
          <input
            type="radio"
            name="sortOrder"
            value="desc"
            checked={sortOrder === "desc"}
            onChange={() => setSortOrder("desc")}
          />
          Z-A
        </label>
        <select
          value={weightClass}
          onChange={(e) => setWeightClass(e.target.value)}
        >
          <option value="">All Weight Classes</option>
          <option value="Bantamweight">Bantamweight</option>
          <option value="Featherweight">Featherweight</option>
          <option value="Lightweight">Lightweight</option>
          <option value="Welterweight">Welterweight</option>
          <option value="Middleweight">Middleweight</option>
          <option value="Light Heavyweight">Light-Heavyweight</option>
          <option value="Heavyweight">Heavyweight</option>
        </select>
      </div>
      <div className="list-fighters">
        {sortedFighters.length > 0 ? (
          sortedFighters.map((fighter) => (
            <FighterList key={fighter.id} fighter={fighter} />
          ))
        ) : (
          <p>No fighters found in this weight class.</p>
        )}
      </div>
    </div>
  );
}
