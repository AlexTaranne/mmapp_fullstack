import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import Homepagedetails from "../components/HomepageDetails";
import "../styles/homepage.css";

export default function Homepage() {
  const data = useLoaderData(); // Suppression de la destructuration incorrecte
  const events = Array.isArray(data) ? data.slice(7) : []; // Vérification pour éviter les erreurs

  return (
    <div className="eventhomepage">
      <h2>Upcoming Events</h2>
      {events.map((event) => (
        <Link to={`/event/${event.EventId}`} key={event.EventId}>
          <Homepagedetails event={event} />
        </Link>
      ))}
    </div>
  );
}
