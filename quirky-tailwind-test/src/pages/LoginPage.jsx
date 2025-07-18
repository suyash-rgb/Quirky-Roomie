import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/api";
import { useAuth } from '../context/useAuth';
import { toast } from 'react-toastify';
import Footer from "../components/Footer";


const LoginPage = () => {
  const { login, setUser } = useAuth(); 
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!credentials.email || !credentials.password) {
    alert("Please fill out both email and password.");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(credentials.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (credentials.password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  try {
    const response = await loginApi(credentials); 
    console.log("Login successful:", response.data);

    login(response.data.token);                       // set authToken in context + localStorage
    setUser(response.data.user);                      // set user in context
    localStorage.setItem("user", JSON.stringify(response.data.user)); 
    localStorage.setItem("flatCode", response.data.user.flatCode);
    navigate("/dashboard");
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Login failed.");
  }
};


  return (
    <div className="flex flex-col min-h-screen">
    <main className="flex-grow">

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
      
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        pattern="\S+@\S+\.\S+"
        value={credentials.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="password"
        type="password"
        required
        minLength="6"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Login
      </button>

    </form>
    </main>
  <Footer />
</div>

  );
};

export default LoginPage;
