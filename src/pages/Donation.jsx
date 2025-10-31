import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosConfig";

const Donation = () => {
  const { id } = useParams(); // campaign ID
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await API.get(`/campaigns/${id}`);
        setCampaign(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCampaign();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.post("/donations", { campaignId: id, amount });
      setMessage("Donation successful!");
      setAmount("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Donation failed");
    }
  };

  if (!campaign) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl mb-4">{campaign.title}</h2>
      <p className="mb-2">{campaign.description}</p>
      <p className="mb-4">Goal Amount: ₹{campaign.goalAmount}</p>

      {message && <p className="text-red-500 mb-2">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="number"
          placeholder="Donation Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Donate
        </button>
      </form>
    </div>
  );
};

export default Donation;

