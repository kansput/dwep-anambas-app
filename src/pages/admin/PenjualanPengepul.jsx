import React, { useState, useEffect } from 'react';

// Komponen PenjualanPengepul.jsx
const PenjualanPengepul = () => {
    // Mock data untuk jenis sampah yang tersedia di stok
    const [mockWasteData, setMockWasteData] = useState([]);
    
    // State untuk menyimpan item sampah yang akan dijual
    const [soldItems, setSoldItems] = useState([{ wasteId: '', weight: 0, key: Math.random() }]);
    
    // State untuk tanggal penjualan, di-set default ke hari ini
    const [saleDate, setSaleDate] = useState(new Date().toISOString().split('T')[0]);

    // useEffect untuk memuat data awal
    useEffect(() => {
        // Simulasi mengambil data stok sampah dari database
        setMockWasteData([
            { id: 'PET01', name: 'Botol Plastik PET' },
            { id: 'KRD01', name: 'Kardus' },
            { id: 'ALM01', name: 'Kaleng Aluminium' },
            { id: 'KCB01', name: 'Kaca Bening' },
            { id: 'BST01', name: 'Besi Tua' }
        ]);
    }, []);

    // Fungsi untuk menambah baris item sampah baru
    const handleAddItem = () => {
        setSoldItems([...soldItems, { wasteId: '', weight: 0, key: Math.random() }]);
    };

    // Fungsi untuk menghapus baris item sampah
    const handleRemoveItem = (keyToRemove) => {
        const newItems = soldItems.filter(item => item.key !== keyToRemove);
        setSoldItems(newItems);
    };

    // Fungsi yang dipanggil saat ada perubahan pada baris item
    const handleItemChange = (key, field, value) => {
        const newItems = soldItems.map(item => {
            if (item.key === key) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setSoldItems(newItems);
    };

    // Fungsi untuk menangani submit form
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            saleDate: e.target['sale-date'].value,
            collectorName: e.target['collector-name'].value,
            notes: e.target['sale-notes'].value,
            items: soldItems.filter(item => item.wasteId && item.weight > 0),
            totalPayment: e.target['total-payment'].value
        };

        if (!formData.collectorName) {
            alert('Nama pengepul harus diisi.');
            return;
        }
        if (formData.items.length === 0) {
            alert('Silakan isi rincian sampah yang dijual.');
            return;
        }
        if (!formData.totalPayment || formData.totalPayment <= 0) {
            alert('Total uang yang diterima harus diisi.');
            return;
        }

        // Logika untuk menyimpan data akan ditambahkan di sini
        console.log('Data Penjualan:', formData);
        alert('Data penjualan berhasil disimpan!');
        
        // Reset form
        e.target.reset();
        setSoldItems([{ wasteId: '', weight: 0, key: Math.random() }]);
        setSaleDate(new Date().toISOString().split('T')[0]);
    };

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Penjualan ke Pengepul</h2>
                    <p className="text-slate-500">Catat transaksi penjualan sampah terkumpul.</p>
                </div>
            </header>

            {/* Sale Form */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <form onSubmit={handleFormSubmit}>
                        {/* Sale Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label htmlFor="sale-date" className="block text-sm font-medium text-slate-600 mb-1">Tanggal Penjualan</label>
                                <input type="date" id="sale-date" name="sale-date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                            </div>
                            <div>
                                <label htmlFor="collector-name" className="block text-sm font-medium text-slate-600 mb-1">Nama Pengepul</label>
                                <input type="text" id="collector-name" name="collector-name" placeholder="cth: Pengepul Maju Jaya" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                            </div>
                            <div className="md:col-span-2">
                                 <label htmlFor="sale-notes" className="block text-sm font-medium text-slate-600 mb-1">Catatan (Opsional)</label>
                                 <textarea id="sale-notes" name="sale-notes" rows="3" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="cth: Pembayaran DP, sisa menyusul..."></textarea>
                            </div>
                        </div>
                        
                        {/* Waste Items Sold */}
                        <div>
                            <label className="block text-lg font-semibold text-slate-800 mb-2">Rincian Sampah Dijual</label>
                            <div id="waste-items-container" className="space-y-4">
                                {soldItems.map((item, index) => (
                                    <div key={item.key} className="waste-item-row grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50 p-4 rounded-lg">
                                        <div className="col-span-12 md:col-span-7">
                                            <label className="block text-sm font-medium text-slate-600 mb-1">Jenis Sampah</label>
                                            <select 
                                                value={item.wasteId}
                                                onChange={(e) => handleItemChange(item.key, 'wasteId', e.target.value)}
                                                className="waste-type-select w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" required>
                                                <option value="" disabled>Pilih jenis sampah</option>
                                                {mockWasteData.map(waste => (
                                                    <option key={waste.id} value={waste.id}>{waste.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-span-8 md:col-span-4">
                                             <label className="block text-sm font-medium text-slate-600 mb-1">Berat (Kg)</label>
                                             <input 
                                                type="number" 
                                                step="0.1" 
                                                value={item.weight || ''}
                                                onChange={(e) => handleItemChange(item.key, 'weight', e.target.value)}
                                                className="waste-weight-input w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="0.0" required />
                                        </div>
                                        <div className="col-span-4 md:col-span-1 flex justify-end items-end h-full">
                                            {soldItems.length > 1 && (
                                                <button type="button" onClick={() => handleRemoveItem(item.key)} className="p-2 text-rose-500 hover:bg-rose-100 rounded-full">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={handleAddItem} className="mt-4 flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Tambah Jenis Sampah
                            </button>
                        </div>

                        {/* Financial Summary */}
                        <div className="border-t border-slate-200 mt-8 pt-6">
                            <label htmlFor="total-payment" className="block text-lg font-semibold text-slate-800 mb-2">Total Uang Diterima</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">Rp</span>
                                <input type="number" id="total-payment" name="total-payment" placeholder="0" className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg bg-white text-2xl font-bold text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-4 mt-8">
                            <button type="button" className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-all">
                                Batal
                            </button>
                            <button type="submit" className="px-8 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-all shadow-md shadow-teal-500/30 hover:shadow-lg">
                                Simpan Penjualan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PenjualanPengepul;
