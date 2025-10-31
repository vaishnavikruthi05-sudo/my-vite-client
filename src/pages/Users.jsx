import { useState, useEffect, useContext } from "react";
import API from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

const Users = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.isAdmin) {
        setError("Access denied: Admins only");
        return;
      }
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users");
      }
    };
    fetchUsers();
  }, [user]);

  if (error) return <p className="text-red-500 mt-10 text-center">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((u) => (
          <li key={u._id} className="border p-2 rounded shadow">
            <strong>{u.name}</strong> — {u.email} {u.isAdmin && "(Admin)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

