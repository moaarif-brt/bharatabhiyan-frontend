import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    const { access, refresh } = res.data.tokens;
    const userData = res.data.user;

    sessionStorage.setItem("access", access);
    sessionStorage.setItem("refresh", refresh);

    setUser(userData);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  const loadMe = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access");
    if (token) loadMe();
    else setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
