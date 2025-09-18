// src/auth/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      // ❗ Do nothing here — let the refresh interceptor handle retry
    } finally {
      // ❗ Allow time for token refresh
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
    } else {
      loadUser();
    }
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/admin/auth/login", credentials, {
      withCredentials: true,
    });
    sessionStorage.setItem("token", res.data.access_token);
    setUser(res.data.success);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
