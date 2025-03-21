import DashboardAdd from "../components/DashboardAdd";
import DashboardUsers from "../components/DashboardUsers";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div>
      <DashboardUsers />
      <DashboardAdd />
    </div>
  );
}
