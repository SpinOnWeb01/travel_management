// src/auth/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto login on refresh
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    api
      .get("/auth/me",)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
        sessionStorage.removeItem("token"); // Invalid token, remove it
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    setUser(res.data.success);
    sessionStorage.setItem("token", res.data.access_token);
    setLoading(false);
  };

  const signup = async (data) => {
    const res = await api.post("/auth/signup", data);
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
