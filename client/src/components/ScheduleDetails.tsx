import "../styles/schedule.css";

interface EventProps {
  Name: string;
  DateTime: string;
}

export default function Scheduledetails({ events }: { events: EventProps }) {
  return (
    <div className="event">
      <h4>{events.Name}</h4>
      <p>{events.DateTime}</p>
    </div>
  );
}
