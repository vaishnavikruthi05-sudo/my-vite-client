import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Campaign from "./pages/Campaign";
import Donation from "./pages/Donation";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar uses Tailwind + AuthContext */}
        <div className="container mx-auto mt-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/donation/:id" element={<Donation />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


