import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("token") || "");

  const login = (token, userData) => {
    setAuthToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  useEffect(() => {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  if (storedToken && storedUser) {
    setAuthToken(storedToken);
    setUser(JSON.parse(storedUser));
  } else {
    setAuthToken(null);
    setUser(null);
  }
}, []);

 
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
