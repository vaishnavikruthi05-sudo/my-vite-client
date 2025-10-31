import { useState, useEffect, useContext } from "react";
import API from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

const Campaign = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", goalAmount: "" });
  const [error, setError] = useState("");

  const fetchCampaigns = async () => {
    try {
      const res = await API.get("/campaigns");
      setCampaigns(res.data);
    } catch (err) {
      setError("Failed to load campaigns");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!user) return setError("You must be logged in to create a campaign");

    try {
      await API.post("/campaigns", formData); // token auto-attached via Axios interceptor
      setFormData({ title: "", description: "", goalAmount: "" });
      fetchCampaigns(); // refresh campaigns
    } catch (err) {
      setError(err.response?.data?.message || "Error creating campaign");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl mb-4">Campaigns</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {user && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6 border p-4 rounded shadow">
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border p-2 rounded" required />
          <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded" required />
          <input name="goalAmount" placeholder="Goal Amount" value={formData.goalAmount} onChange={handleChange} className="border p-2 rounded" required />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Campaign</button>
        </form>
      )}

      <h3 className="text-xl mb-2">All Campaigns:</h3>
      <ul className="space-y-2">
        {campaigns.map((c) => (
          <li key={c._id} className="border p-2 rounded shadow">
            <strong>{c.title}</strong> — {c.description} — ₹{c.goalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Campaign;
