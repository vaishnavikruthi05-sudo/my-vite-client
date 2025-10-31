import { Link } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold text-xl">{campaign.title}</h2>
      <p>{campaign.description}</p>
      <Link to={`/donation/${campaign._id}`} className="mt-2 inline-block bg-blue-500 text-white p-2 rounded">
        Donate
      </Link>
    </div>
  );
};

export default CampaignCard;
