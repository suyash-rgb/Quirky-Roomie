import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path as needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const protectedLinks = [
    { name: "Listings", path: "/dashboard" },
    { name: "Log Complaint", path: "/log-complaint" },
  ];

  const publicLinks = [
    { name: "Login", path: "/login" },
    { name: "Sign Up", path: "/signup" },
  ];

  return (
    <header className={`shadow-md transition-colors duration-300 ${isOpen ? "bg-green-100" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl text-blue-600 font-chewy font-bold">
          Quirky Roomie
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 font-nunito items-center">
          {(token ? protectedLinks : publicLinks).map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              {name}
            </Link>
          ))}

          {token && (
            <button
              onClick={handleLogout}
              className="ml-4 text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Hamburger Icon*/}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 text-2xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 bg-white border-t font-nunito">
          {(token ? protectedLinks : publicLinks).map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-700 hover:bg-purple-100 rounded"
            >
              {name}
            </Link>
          ))}

          {token && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left py-2 text-red-600 hover:bg-red-100 rounded"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
