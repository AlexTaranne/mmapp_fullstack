interface EventType {
  Name: string;
  ShortName: string;
  DateTime: string;
}

interface EventDetailsProps {
  event: EventType;
}

export default function Homepagedetails({ event }: EventDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div className="detailsevent">
      <h2>{event.Name}</h2>
      <h3>{event.ShortName}</h3>
      <p>{formatDate(event.DateTime)}</p>
    </div>
  );
}
