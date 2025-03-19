import "../styles/schedule.css";
interface EventProps {
  Name: string;
  DateTime: string;
}
interface EventTypes {
  events: EventProps;
}

export default function Scheduledetails({ events }: EventTypes) {
  return (
    <>
      <div className="event">
        <div>{events.Name}</div>
        <p>{events.DateTime}</p>
      </div>
    </>
  );
}
