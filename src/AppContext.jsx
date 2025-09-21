// src/AppContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("landingPage");
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  // cache data
  const [transactions, setTransactions] = useState([]);
  const [sampahList, setSampahList] = useState([]);

  // restore dari localStorage
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      const savedRole = localStorage.getItem("role");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedRole && ["admin", "nasabah", "petugas"].includes(savedRole)) {
        setToken(savedToken);
        setRole(savedRole);
        setUser(savedUser ? JSON.parse(savedUser) : null);

        if (savedRole === "nasabah") setCurrentPage("homeNasabah");
        else setCurrentPage("dashboard");
      } else {
        localStorage.clear();
        setToken(null);
        setRole(null);
        setUser(null);
        setCurrentPage("landingPage");
      }
    } catch (err) {
      console.error("❌ Gagal parse localStorage:", err);
      localStorage.clear();
    }
  }, []);

  const navigateTo = (page) => setCurrentPage(page);

  const login = (jwt, userRole, userData) => {
    if (!["admin", "nasabah", "petugas"].includes(userRole)) {
      console.warn("❌ Role tidak valid saat login:", userRole);
      logout();
      return;
    }
    setToken(jwt);
    setRole(userRole);
    setUser(userData);

    localStorage.setItem("token", jwt);
    localStorage.setItem("role", userRole);
    localStorage.setItem("user", JSON.stringify(userData));

    if (userRole === "nasabah") navigateTo("homeNasabah");
    else navigateTo("dashboard");
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    setTransactions([]);
    setSampahList([]);
    localStorage.clear();
    navigateTo("landingPage");
  };

  // 🔹 Refresh data manual
  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const freshUser = await res.json();
        setUser(freshUser);
        localStorage.setItem("user", JSON.stringify(freshUser));
      }
    } catch (err) {
      console.error("❌ Error refreshUser:", err);
    }
  };

  const refreshTransactions = async () => {
    if (!user || !token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/transactions/nasabah/${user.uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setTransactions(await res.json());
      }
    } catch (err) {
      console.error("❌ Error refreshTransactions:", err);
    }
  };

  const refreshSampah = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/sampah", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSampahList(data.sampah || []);
      }
    } catch (err) {
      console.error("❌ Error refreshSampah:", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        token,
        role,
        user,
        nasabahUser: role === "nasabah" ? user : null,
        login,
        logout,
        // cache + refresh
        transactions,
        sampahList,
        refreshUser,
        refreshTransactions,
        refreshSampah,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
