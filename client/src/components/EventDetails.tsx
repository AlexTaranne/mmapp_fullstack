import { Link } from "react-router-dom";

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

  let winner = "Inconnu";
  if (fighter1.Winner) {
    winner = `${fighter1FirstName} ${fighter1LastName}`;
  } else if (fighter2.Winner) {
    winner = `${fighter2FirstName} ${fighter2LastName}`;
  }

  const round = event?.ResultRound || "Inconnu";

  return (
    <section className="results">
      <div className="fights">
        <Link
          to={`/fighterdetails/${fighter1FirstName.toLowerCase().trim()}-${fighter1LastName.toLowerCase().trim()} `}
          className="fight"
        >
          <h2>
            {fighter1LastName ? fighter1FirstName : ""}{" "}
            {fighter1LastName ? fighter1LastName : ""}
          </h2>
        </Link>

        <p>VS</p>

        <Link
          to={`/fighterdetails/${fighter2FirstName.toLowerCase().trim()}-${fighter2LastName.toLowerCase().trim()}`}
          className="fight"
        >
          <h2>
            {fighter2FirstName ? fighter2FirstName : ""}{" "}
            {fighter2LastName ? fighter2LastName : ""}
          </h2>
        </Link>
        <p>
          Vainqueur: <strong>{winner}</strong> in round {round}
        </p>
      </div>
    </section>
  );
}
