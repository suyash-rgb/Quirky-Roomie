import { useState } from "react";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Credentials:", credentials);
    alert("Login successful (mock)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Login
      </button>
    </form>
  );
};

export default LoginForm;