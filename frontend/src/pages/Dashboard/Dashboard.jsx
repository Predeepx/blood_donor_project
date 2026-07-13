import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/dashboard.api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) return <h2>Loading...</h2>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="card">
          <h2>{stats.totalDonors}</h2>
          <p>Total Donors</p>
        </div>

        <div className="card">
          <h2>{stats.availableDonors}</h2>
          <p>Available Donors</p>
        </div>

        <div className="card">
          <h2>{stats.activeRequests}</h2>
          <p>Active Requests</p>
        </div>

        <div className="card">
          <h2>{stats.completedRequests}</h2>
          <p>Completed Donations</p>
        </div>
      </div>
    </div>
  );
}