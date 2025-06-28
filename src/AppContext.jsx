import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard'); 
  const [adminUser, setAdminUser] = useState(null); // Mulai dengan admin belum login
  const [nasabahUser, setNasabahUser] = useState(null); // State baru untuk nasabah

  const navigateTo = (page) => {
    setCurrentPage(page);
  };
  
  const loginAdmin = (userData) => {
      setAdminUser(userData);
      setNasabahUser(null); // Pastikan nasabah user kosong
      navigateTo('dashboard');
  }

  const loginNasabah = (nasabahData) => {
      setNasabahUser(nasabahData);
      setAdminUser(null); // Pastikan admin user kosong
      navigateTo('saldoNasabah'); // Langsung ke halaman saldo setelah login
  }

  const logout = () => {
      setAdminUser(null);
      setNasabahUser(null);
      navigateTo('loginAdmin');
  }

  const value = { currentPage, navigateTo, adminUser, nasabahUser, loginAdmin, loginNasabah, logout };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);