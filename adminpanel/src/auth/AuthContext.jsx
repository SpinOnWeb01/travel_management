// src/auth/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto login on refresh
//   useEffect(() => {
//     axios.get("/auth/me")
//       .then(res => setUser(res.data.user))
//       .catch(() => setUser(null))
//       .finally(() => setLoading(false));
//   }, []);

  const login = async (credentials) => {
    const res = await axios.post("/auth/login", credentials);
    setUser(res.data.success);
    setLoading(false);
  };

  const signup = async (data) => {
    const res = await axios.post("/auth/signup", data);
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
