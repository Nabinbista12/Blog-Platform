import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  // Check if token exists in localStorage
  const checkLoggedIn = () => !!localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-yellow-300 transition">
          BlogWorld
        </Link>
      </div>

      <div className="flex items-center space-x-8">
        {!checkLoggedIn() ? (
          <>
            <Link
              to="/login"
              className="hover:text-yellow-300 transition font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:text-yellow-300 transition font-semibold"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={logout}
              className="bg-yellow-400 text-blue-800 font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
