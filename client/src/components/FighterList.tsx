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
      <p>
        {fighter.lastName} {fighter.firstName}
      </p>
    </Link>
  );
}
