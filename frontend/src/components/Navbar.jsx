// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Listings", path: "/listings" },
  { name: "Log Complaint", path: "/log-complaint" },
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/signup" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Quirky Roomie
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex bg-yelloe-600 space-x-6">
          {navigation.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className="text-gray-700 hover:text-blue-500 font-medium"
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Icon */}
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
        <nav className="md:hidden px-4 pb-4 bg-white border-t bg-green-100">
          {navigation.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              {name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
