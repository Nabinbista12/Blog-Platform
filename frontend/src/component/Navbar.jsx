import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  // Check if token exists in localStorage
  const checkLoggedIn = () => !!localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex items-center justify-between shadow-md">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-yellow-300 transition">
          BlogWorld
        </Link>
      </div>

      {/* Links / Buttons */}
      <div className="flex items-center space-x-6">
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
            {/* Show user name */}
            {/* <span className="font-medium bg-yellow-300 text-blue-800 px-3 py-1 rounded-full shadow-sm">
              {user?.username || "User"}
            </span> */}

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
