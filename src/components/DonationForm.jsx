import { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const DonationForm = ({ campaignId }) => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/donations", { campaignId, amount });
      alert("Donation successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Donation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-6">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Donate</button>
    </form>
  );
};

export default DonationForm;
