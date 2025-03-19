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
  const event = useLoaderData() as EventType[];

  return (
    <>
      <h2>{event[0]?.Name}</h2>
      <div className="all-results">
        {event.map((event) => (
          <EventDetails key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}
