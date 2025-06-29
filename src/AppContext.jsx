import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('landingPage'); 
  const [adminUser, setAdminUser] = useState(null);
  const [nasabahUser, setNasabahUser] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };
  
  const loginAdmin = (userData) => {
      setAdminUser(userData);
      setNasabahUser(null);
      navigateTo('dashboard');
  }

  const loginNasabah = (nasabahData) => {
      setNasabahUser(nasabahData);
      setAdminUser(null);
      navigateTo('saldoNasabah');
  }

  const logout = () => {
      setAdminUser(null);
      setNasabahUser(null);
      navigateTo('landingPage');
  }

  const value = { currentPage, navigateTo, adminUser, nasabahUser, loginAdmin, loginNasabah, logout };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);