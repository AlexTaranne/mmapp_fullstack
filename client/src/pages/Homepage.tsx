import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import Homepagedetails from "../components/HomepageDetails";

export default function Homepage() {
  const data = useLoaderData(); // Suppression de la destructuration incorrecte
  const events = Array.isArray(data) ? data.slice(7) : []; // Vérification pour éviter les erreurs

  return (
    <div className="eventhomepage">
      {events.map((event) => (
        <Link to={`/event/${event.EventId}`} key={event.EventId}>
          <Homepagedetails event={event} />
        </Link>
      ))}
    </div>
  );
}
