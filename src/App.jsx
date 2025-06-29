import React from 'react';
import { useAppContext } from './AppContext';

// Import semua halaman yang kita punya
import LandingPage from './pages/LandingPage';
import LoginAdmin from './pages/auth/LoginAdmin';
import RegisterAdmin from './pages/auth/RegisterAdmin';
import LoginNasabah from './pages/auth/LoginNasabah';
import RegisterNasabah from './pages/nasabah/RegisterNasabah';
import SaldoNasabah from './pages/nasabah/SaldoNasabah';
import HargaSampah from './pages/nasabah/HargaSampah';
import JadwalOperasional from './pages/nasabah/JadwalOperasional';
import LokasiBankSampah from './pages/nasabah/LokasiBankSampah';
import TarikSaldo from './pages/nasabah/TarikSaldo';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Laporan from './pages/admin/Laporan';
import ManajemenNasabah from './pages/admin/ManajemenNasabah';
import ManajemenSampah from './pages/admin/ManajemenSampah';
import PengaturanAkun from './pages/admin/PengaturanAkun';
import PenjualanPengepul from './pages/admin/PenjualanPengepul';
import TransaksiBaru from './pages/admin/TransaksiBaru';

function App() {
  const { currentPage, adminUser, nasabahUser } = useAppContext();

  // Jika tidak ada user yang login (baik admin maupun nasabah)
  if (!adminUser && !nasabahUser) {
    switch (currentPage) {
      case 'loginAdmin': return <LoginAdmin />;
      case 'registerAdmin': return <RegisterAdmin />;
      case 'loginNasabah': return <LoginNasabah />;
      case 'registerNasabah': return <RegisterNasabah />;
      case 'landingPage':
      default: return <LandingPage />;
    }
  }

  // Jika yang login adalah nasabah
  if (nasabahUser) {
    switch (currentPage) {
        case 'hargaSampah': return <HargaSampah />;
        case 'jadwalOperasional': return <JadwalOperasional />;
        case 'lokasiBankSampah': return <LokasiBankSampah />;
        case 'tarikSaldo': return <TarikSaldo />;
        case 'saldoNasabah':
        default: return <SaldoNasabah />;
    }
  }

  // Jika yang login adalah admin
  if (adminUser) {
    let AdminPageComponent;
    switch (currentPage) {
        case 'laporan': AdminPageComponent = Laporan; break;
        case 'manajemenNasabah': AdminPageComponent = ManajemenNasabah; break;
        case 'manajemenSampah': AdminPageComponent = ManajemenSampah; break;
        case 'pengaturanAkun': AdminPageComponent = PengaturanAkun; break;
        case 'penjualanPengepul': AdminPageComponent = PenjualanPengepul; break;
        case 'transaksiBaru': AdminPageComponent = TransaksiBaru; break;
        case 'dashboard':
        default: AdminPageComponent = Dashboard; break;
    }
    return <AdminLayout><AdminPageComponent /></AdminLayout>;
  }
  
  // Sebagai fallback jika terjadi kondisi aneh, kembali ke landing page
  return <LandingPage />;
}

export default App;