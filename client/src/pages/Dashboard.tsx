import { useState } from "react";
import DashboardAdd from "../components/DashboardAdd";
import DashboardUsers from "../components/DashboardUsers";
import "../styles/dashboard.css";
import DashboardFights from "../components/DashboardFights";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  return (
    <div>
      <div className="button-dashboard">
        <button type="button" onClick={() => setActiveComponent("dashboard")}>
          Add/Edit
        </button>
        <button type="button" onClick={() => setActiveComponent("users")}>
          Users
        </button>
        <button type="button" onClick={() => setActiveComponent("videos")}>
          Videos
        </button>
      </div>
      {activeComponent === "dashboard" && <DashboardAdd />}
      {activeComponent === "users" && <DashboardUsers />}
      {activeComponent === "videos" && <DashboardFights />}
    </div>
  );
}
