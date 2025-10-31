import { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await API.get("/campaigns");
        setCampaigns(res.data);
      } catch (err) {
        console.error("Failed to load campaigns", err);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-3xl mb-4">Welcome to Charity Donation Portal</h1>
      <h2 className="text-xl mb-2">Active Campaigns</h2>
      <ul className="space-y-2">
        {campaigns.map((c) => (
          <li key={c._id} className="border p-2 rounded shadow">
            <strong>{c.title}</strong> — {c.description} — ₹{c.goalAmount}  
            <Link to={`/donation/${c._id}`} className="ml-4 text-blue-500 underline">
              Donate
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
