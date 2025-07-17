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
      <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

      <input
        name="name"
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="password"
        type="password"
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