import { Link } from "react-router-dom";
import "../styles/eventdetails.css";

interface Fighter {
  FirstName: string;
  LastName: string;
  Winner?: boolean;
}

interface EventType {
  Fighters: Fighter[];
  ResultRound?: number | string;
}

interface EventDetailsProps {
  event: EventType;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const fighter1LastName = event.Fighters[0]?.LastName || "Inconnu";
  const fighter2LastName = event.Fighters[1]?.LastName || "Inconnu";
  const fighter1FirstName = event.Fighters[0]?.FirstName || "Inconnu";
  const fighter2FirstName = event.Fighters[1]?.FirstName || "Inconnu";

  const fighters = event?.Fighters || [];
  const fighter1 = fighters[0] || {};
  const fighter2 = fighters[1] || {};

  const getFighterSlug = (fighter?: Fighter) => {
    if (!fighter || !fighter.FirstName || !fighter.LastName) return "inconnu";

    const firstName = fighter.FirstName.toLowerCase().trim();
    const lastName = fighter.LastName.toLowerCase().trim();

    const slug1 = encodeURIComponent(`${firstName}-${lastName}`);
    const slug2 = encodeURIComponent(`${lastName}-${firstName}`);

    return [slug1, slug2];
  };

  let winner = "Inconnu";
  if (fighter1.Winner) {
    winner = `${fighter1FirstName} ${fighter1LastName}`;
  } else if (fighter2.Winner) {
    winner = `${fighter2FirstName} ${fighter2LastName}`;
  }

  return (
    <section className="results">
      <div className="fights">
        <div className="left-results">
          <Link
            to={`/fighterdetails/${getFighterSlug(fighter1)[0]}`}
            className="fight"
          >
            <h2>
              {fighter1FirstName} {fighter1LastName}
            </h2>
          </Link>

          <p>VS</p>

          <Link
            to={`/fighterdetails/${getFighterSlug(fighter2)[0]}`}
            className="fight"
          >
            <h2>
              {fighter2FirstName} {fighter2LastName}
            </h2>
          </Link>
        </div>
        <div>
          <p>
            Winner: <strong>{winner}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
