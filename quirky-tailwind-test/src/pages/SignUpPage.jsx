import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";


const SignUpPage = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    flatCode: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const { name, email, password, flatCode } = formData;

  if (!name || !email || !password || !flatCode) {
    alert("All fields are required.");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Please enter a valid email.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }


  const signupData = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    flatCode: formData.flatCode
  };

  console.log("Signup Data:", signupData);
  
  try {
      const response = await register(signupData);
      console.log("Signup successful:", response.data);
      alert("Sign-up successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Sign-up failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-24 space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">
      {/* SVG Background */}
      <svg
        className="absolute top-0 left-0 w-full h-full -z-10"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#A855F7"
          d="M0,32L60,53.3C120,75,240,117,360,122.7C480,128,600,96,720,101.3C840,107,960,149,1080,176C1200,203,1320,213,1380,218.7L1440,224V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
        />
      </svg>
      <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

      <input
        name="name"
        type="text"
        required
        pattern="^[A-Za-z\s]+$"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="email"
        type="email"
        required
        pattern="^[\\w.%+-]+@(gmail\\.com|yahoo\\.com|outlook\\.com|hotmail\\.com|icloud\\.com|protonmail\\.com|aol\\.com|zoho\\.com)$"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="password"
        type="password"
        required
        minLength="6"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="flatCode"
        type="text"
        placeholder="Flat Code"
        value={formData.flatCode}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpPage;