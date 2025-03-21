import axios from "axios";
import { useEffect, useState } from "react";

interface UsersTypes {
  firstName: string;
  lastName: string;
  id: number;
  role: string;
}

export default function DashboardUsers() {
  const [users, setUsers] = useState<UsersTypes[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/users", { withCredentials: true })
      .then((response) => {
        console.info("Données récupérées :", response.data);
        setUsers(response.data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération :", error),
      );
  }, []);

  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{user.role}</p>
        </div>
      ))}
    </>
  );
}
