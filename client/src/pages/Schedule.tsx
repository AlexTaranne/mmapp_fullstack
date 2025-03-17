import { Link, useLoaderData } from "react-router-dom";
import Scheduledetails from "../components/ScheduleDetails";
interface ScheduleProps {
  id: number;
  Name: string;
  DateName: string;
  DateTime: string;
  EventId: string;
}

export default function Schedule() {
  const schedule = useLoaderData() as ScheduleProps[];

  return (
    <section className="events">
      {schedule.map((events) => (
        <Link to={`/event/${events.EventId}`} key={events.id}>
          <Scheduledetails key={events.id} events={events} />
        </Link>
      ))}
    </section>
  );
}
