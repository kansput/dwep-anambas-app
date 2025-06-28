import React from 'react';
import { useAppContext } from './AppContext';

// Import Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Laporan from './pages/admin/Laporan';
import ManajemenNasabah from './pages/admin/ManajemenNasabah';
import ManajemenSampah from './pages/admin/ManajemenSampah';
import PengaturanAkun from './pages/admin/PengaturanAkun';
import PenjualanPengepul from './pages/admin/PenjualanPengepul';
import TransaksiBaru from './pages/admin/TransaksiBaru';
import AdminLayout from './components/admin/AdminLayout';

// Import Auth Page
import LoginAdmin from './pages/auth/LoginAdmin';

// Import Nasabah Pages
import SaldoNasabah from './pages/nasabah/SaldoNasabah';
import HargaSampah from './pages/nasabah/HargaSampah';
import JadwalOperasional from './pages/nasabah/JadwalOperasional';
import LokasiBankSampah from './pages/nasabah/LokasiBankSampah';


function App() {
  const { currentPage, adminUser, nasabahUser } = useAppContext();

  // Jika tidak ada user admin DAN tidak ada user nasabah, tampilkan halaman login
  if (!adminUser && !nasabahUser) {
    return <LoginAdmin />;
  }

  // Jika ada user nasabah, tampilkan halaman nasabah
  if (nasabahUser) {
    let NasabahPageComponent;
    switch (currentPage) {
        case 'hargaSampah':
            NasabahPageComponent = HargaSampah;
            break;
        case 'jadwalOperasional':
            NasabahPageComponent = JadwalOperasional;
            break;
        case 'lokasiBankSampah':
            NasabahPageComponent = LokasiBankSampah;
            break;
        case 'saldoNasabah':
        default:
            NasabahPageComponent = SaldoNasabah;
            break;
    }
    return <NasabahPageComponent />;
  }

  // Jika ada user admin, tampilkan layout admin
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
}
export default App;
