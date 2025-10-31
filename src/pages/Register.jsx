import { useState, useContext } from "react";
import API from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await API.post("/users/register", formData);
      login(res.data.user, res.data.token);
      navigate("/campaign"); // Redirect after successful registration
    } catch (err) {
      // Show error message without using prompt
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 rounded"
          type="email"
          required
        />
        <input
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 rounded"
          type="password"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

