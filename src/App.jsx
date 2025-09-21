import React from "react";
import { useAppContext } from "./AppContext";

// Import halaman umum
import LandingPage from "./pages/LandingPage";

// Auth
import LoginPetugas from "./pages/auth/LoginPetugas";
import RegisterPetugas from "./pages/auth/RegisterPetugas";
import LoginNasabah from "./pages/auth/LoginNasabah";
import RegisterNasabah from "./pages/auth/RegisterNasabah";

// Nasabah pages
import HomeNasabah from "./pages/nasabah/HomeNasabah";
import HargaSampah from "./pages/nasabah/HargaSampah";
import TarikSaldo from "./pages/nasabah/TarikSaldo";

// Admin & Petugas pages
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Laporan from "./pages/admin/Laporan";
import ManajemenNasabah from "./pages/admin/ManajemenNasabah";
import ManajemenSampah from "./pages/admin/ManajemenSampah";
import ApproveNasabah from "./pages/admin/ApproveNasabah";
import PenjualanPengepul from "./pages/admin/PenjualanPengepul";
import TransaksiBaru from "./pages/admin/TransaksiBaru";

function App() {
  const { currentPage, token, role } = useAppContext();

  // 🔹 Belum login
  if (!token) {
    switch (currentPage) {
      case "loginPetugas":
        return <LoginPetugas />;
      case "registerPetugas":
        return <RegisterPetugas />;
      case "loginNasabah":
        return <LoginNasabah />;
      case "registerNasabah":
        return <RegisterNasabah />;
      case "landingPage":
      default:
        return <LandingPage />;
    }
  }

  // 🔹 Jika login sebagai Nasabah
  if (role === "nasabah") {
    switch (currentPage) {
      case "hargaSampah":
        return <HargaSampah />;
      case "tarikSaldo":
        return <TarikSaldo />;
      case "homeNasabah":
      default:
        return <HomeNasabah />; // 🔹 default langsung HomeNasabah
    }
  }

  // 🔹 Jika login sebagai Admin atau Petugas
  if (role === "admin" || role === "petugas") {
    let AdminPageComponent;
    switch (currentPage) {
      case "laporan":
        AdminPageComponent = Laporan;
        break;
      case "approveNasabah":
        AdminPageComponent = ApproveNasabah;
        break;
      case "manajemenNasabah":
        AdminPageComponent = ManajemenNasabah;
        break;
      case "manajemenSampah":
        AdminPageComponent = ManajemenSampah;
        break;
      case "penjualanPengepul":
        AdminPageComponent = PenjualanPengepul;
        break;
      case "transaksiBaru":
        AdminPageComponent = TransaksiBaru;
        break;
      case "dashboard":
      default:
        AdminPageComponent = Dashboard;
        break;
    }
    return (
      <AdminLayout>
        <AdminPageComponent />
      </AdminLayout>
    );
  }

  // 🔹 fallback ke landing
  return <LandingPage />;
}

export default App;
