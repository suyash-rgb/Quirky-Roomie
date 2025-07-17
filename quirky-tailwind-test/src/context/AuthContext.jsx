import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("token") || "");

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);
 
  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
