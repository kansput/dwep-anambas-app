export const mockWasteTypes = [
    { id: 'GH01', name: 'Ghost Net', category: 'Jaring', price: 3000, unit: 'Kg', status: 'Aktif' },
    { id: 'KRD01', name: 'Kardus Bersih', category: 'Kertas', price: 1500, unit: 'Kg', status: 'Aktif' },
    { id: 'ALM01', name: 'Kaleng Aluminium', category: 'Logam', price: 8000, unit: 'Kg', status: 'Aktif' },
    { id: 'KCB01', name: 'Botol Kaca Bening', category: 'Kaca', price: 500, unit: 'Kg', status: 'Tidak Aktif' },
    { id: 'BST01', name: 'Besi Tua', category: 'Logam', price: 2500, unit: 'Kg', status: 'Aktif' },
    { id: 'HDPE01', name: 'Plastik HDPE (Botol Shampo)', category: 'Plastik', price: 2000, unit: 'Kg', status: 'Aktif' },
    { id: 'KOR01', name: 'Koran Bekas', category: 'Kertas', price: 1200, unit: 'Kg', status: 'Aktif' },
];

export const mockCustomers = [
    { id: 'N-001', name: 'Siti Aminah', avatar: 'S', contact: '0812-3456-7890', address: 'Dusun Pesisir', joinDate: '01 Jan 2024', balance: 125500, totalWasteKg: 25.5 },
    { id: 'N-007', name: 'Budi Santoso', avatar: 'B', contact: '0856-1122-3344', address: 'Dusun Bahari', joinDate: '15 Feb 2024', balance: 78000, totalWasteKg: 15.8 },
    { id: 'N-012', name: 'Wati Lestari', avatar: 'W', contact: '0877-5566-7788', address: 'Dusun Lestari', joinDate: '03 Mar 2024', balance: 210000, totalWasteKg: 45.2 },
    { id: 'N-015', name: 'Ahmad Maulana', avatar: 'A', contact: '0811-9988-7766', address: 'Dusun Pesisir', joinDate: '20 Apr 2024', balance: 55000, totalWasteKg: 11.0 },
    { id: 'N-021', name: 'Dewi Anggraini', avatar: 'D', contact: '0813-1234-5678', address: 'Kampung Baru', joinDate: '05 Mei 2024', balance: 340000, totalWasteKg: 78.1 },
    { id: 'N-022', name: 'Eko Prasetyo', avatar: 'E', contact: '0815-8765-4321', address: 'Dusun Bahari', joinDate: '11 Mei 2024', balance: 15000, totalWasteKg: 3.5 },
    { id: 'N-028', name: 'Linda Wati', avatar: 'L', contact: '0899-1111-2222', address: 'Dusun Lestari', joinDate: '02 Jun 2024', balance: 95500, totalWasteKg: 22.0 },
];

export const mockTransactions = [
    { id: 'TRX-SETOR-001', type: 'SETORAN_NASABAH', date: '2025-06-20T10:30:00Z', idPetugas: 'P-01', idNasabah: 'N-001', namaNasabah: 'Ibu Siti', items: [{ idSampah: 'PET01', namaSampah: 'Botol Plastik PET', beratKg: 5.2 }], totalNilai: 15600 },
    { id: 'TRX-TARIK-001', type: 'PENARIKAN_NASABAH', date: '2025-06-10T11:00:00Z', idPetugas: 'P-01', idNasabah: 'N-001', namaNasabah: 'Ibu Siti', items: [], totalNilai: -50000 },
    { id: 'TRX-SETOR-002', type: 'SETORAN_NASABAH', date: '2025-06-01T14:00:00Z', idPetugas: 'P-01', idNasabah: 'N-001', namaNasabah: 'Ibu Siti', items: [{ idSampah: 'KRD01', namaSampah: 'Kardus Bersih', beratKg: 7.0 }], totalNilai: 10500 },
    { id: 'TRX-JUAL-001', type: 'PENJUALAN_PENGEPUL', date: '2025-06-25T09:00:00Z', idPetugas: 'P-01', namaPengepul: 'Pengepul Maju Jaya', items: [{ idSampah: 'PET01', namaSampah: 'Botol Plastik PET', beratKg: 150.5 }, { idSampah: 'KRD01', namaSampah: 'Kardus Bersih', beratKg: 100.0 }], totalDiterima: 902500, catatan: 'Pembayaran lunas.' }
];