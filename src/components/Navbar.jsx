import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="mr-4 font-bold">Charity Portal</Link>
        <Link to="/campaign" className="mr-4">Campaigns</Link>
        {user && <Link to="/donation" className="mr-4">Donate</Link>}
        {user && <Link to="/users" className="mr-4">Users</Link>}
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <button onClick={logout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
