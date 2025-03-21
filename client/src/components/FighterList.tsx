import { Link } from "react-router-dom";
interface Fighter {
  id: number;
  firstName: string;
  lastName: string;
  weightClass: string;
  category_name: string;
}

interface FighterListProps {
  fighter: Fighter;
}
export default function FighterList({ fighter }: FighterListProps) {
  return (
    <Link
      to={`/fighterdetails/${fighter.firstName.toLowerCase().trim()}-${fighter.lastName.toLowerCase().trim()}`}
    >
      <div className="list">
        <h4>
          {fighter.lastName} {fighter.firstName}
        </h4>
        <p>{fighter.category_name}</p>
      </div>
    </Link>
  );
}
