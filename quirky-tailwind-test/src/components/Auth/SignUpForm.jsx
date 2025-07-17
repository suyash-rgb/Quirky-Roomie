import { useState } from "react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    alert("Sign-up successful (mock)");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-24 space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

      <input
        name="fullName"
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
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

export default SignUpForm;