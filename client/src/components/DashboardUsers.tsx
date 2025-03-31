import axios from "axios";
import { useLoaderData, useRevalidator } from "react-router-dom";

interface UsersTypes {
  firstName: string;
  lastName: string;
  id: number;
  role: string;
}

export default function DashboardUsers() {
  const { users } = useLoaderData() as { users: UsersTypes[] };
  const { revalidate } = useRevalidator();
  const API = import.meta.env.VITE_API_URL;

  const deleteUsers = (id: number) => {
    return axios
      .delete(`${API}/api/users/${id}`, { withCredentials: true })
      .then(() => revalidate())
      .catch((error) => console.error(error));
  };

  return (
    <div className="user-dashboard">
      {users.map((user) => (
        <div key={user.id} className="card-user">
          <div className="info-user">
            <h4>
              {user.firstName} {user.lastName}
            </h4>
            <p>{user.role}</p>
          </div>
          <button type="button" onClick={() => deleteUsers(user.id)}>
            <img src="/garbage.png" alt="" />
          </button>
        </div>
      ))}
    </div>
  );
}
