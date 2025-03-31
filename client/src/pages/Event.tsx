import { useLoaderData } from "react-router-dom";
import EventDetails from "../components/EventDetails";
import "../styles/eventdetails.css";

interface Fighter {
  FirstName: string;
  LastName: string;
  Winner?: boolean;
}
interface EventType {
  id: number;
  Name: string;
  Fighters: Fighter[];
  ResultRound?: number | string;
}

export default function Event() {
  const data = useLoaderData();
  const events = Array.isArray(data) ? (data as EventType[]) : [];
  console.info(data);

  return (
    <>
      {events.length > 0 ? (
        <>
          <h2>{events[0].Name}</h2>
          <div className="all-results">
            {events.map((eventItem) => (
              <EventDetails key={eventItem.id} event={eventItem} />
            ))}
          </div>
        </>
      ) : (
        <p>Aucun événement trouvé</p>
      )}
    </>
  );
}
