import React, { useState, useEffect } from 'react';

// Komponen TransaksiBaru.jsx
const TransaksiBaru = () => {
    // Mock data (data palsu) untuk simulasi. Di aplikasi nyata, ini akan datang dari database.
    const [mockWasteData, setMockWasteData] = useState([]);
    const [mockCustomerData, setMockCustomerData] = useState([]);

    // State untuk menyimpan item sampah dalam transaksi saat ini
    const [wasteItems, setWasteItems] = useState([{ wasteId: '', weight: 0, subtotal: 0 }]);
    // State untuk nasabah yang dipilih
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    // State untuk total keseluruhan transaksi
    const [grandTotal, setGrandTotal] = useState(0);

    // useEffect untuk memuat data awal (hanya sekali saat komponen pertama kali render)
    useEffect(() => {
        // Simulasi mengambil data dari database
        setMockWasteData([
            { id: 'PET01', name: 'Botol Plastik PET', price: 3000 },
            { id: 'KRD01', name: 'Kardus', price: 1500 },
            { id: 'ALM01', name: 'Kaleng Aluminium', price: 8000 },
            { id: 'KCB01', name: 'Kaca Bening', price: 500 },
            { id: 'BST01', name: 'Besi Tua', price: 2500 }
        ]);
        setMockCustomerData([
            { id: 'N-001', name: 'Ibu Siti', avatar: 'S' },
            { id: 'N-007', name: 'Bapak Budi', avatar: 'B' }
        ]);
        // Menambahkan satu baris item kosong saat halaman dimuat
        setWasteItems([{ wasteId: '', weight: 0, subtotal: 0, key: Math.random() }]);
    }, []);

    // Fungsi untuk menambah baris item sampah baru
    const handleAddItem = () => {
        setWasteItems([...wasteItems, { wasteId: '', weight: 0, subtotal: 0, key: Math.random() }]);
    };

    // Fungsi untuk menghapus baris item sampah
    const handleRemoveItem = (keyToRemove) => {
        const newItems = wasteItems.filter(item => item.key !== keyToRemove);
        setWasteItems(newItems);
    };

    // Fungsi untuk menghitung ulang subtotal dan total keseluruhan
    const calculateTotals = (items) => {
        let total = 0;
        const updatedItems = items.map(item => {
            const wasteInfo = mockWasteData.find(w => w.id === item.wasteId);
            const price = wasteInfo ? wasteInfo.price : 0;
            const weight = parseFloat(item.weight) || 0;
            const subtotal = price * weight;
            total += subtotal;
            return { ...item, subtotal };
        });
        setGrandTotal(total);
        return updatedItems;
    };

    // Fungsi yang dipanggil saat ada perubahan pada baris item
    const handleItemChange = (key, field, value) => {
        let newItems = wasteItems.map(item => {
            if (item.key === key) {
                return { ...item, [field]: value };
            }
            return item;
        });
        newItems = calculateTotals(newItems);
        setWasteItems(newItems);
    };
    
    // Fungsi untuk menangani pencarian nasabah
    const handleCustomerSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 1) {
            const foundCustomer = mockCustomerData.find(c => 
                c.name.toLowerCase().includes(query) || c.id.toLowerCase().includes(query)
            );
            setSelectedCustomer(foundCustomer || null);
        } else {
            setSelectedCustomer(null);
        }
    };
    
    // Fungsi untuk menangani submit form
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!selectedCustomer) {
            alert('Silakan pilih nasabah terlebih dahulu.');
            return;
        }
        if (wasteItems.length === 0 || wasteItems.every(item => !item.wasteId || item.weight <= 0)) {
            alert('Silakan isi data sampah yang disetor.');
            return;
        }
        // Logika untuk menyimpan data akan ditambahkan di sini
        console.log({
            customer: selectedCustomer,
            items: wasteItems,
            total: grandTotal
        });
        alert('Transaksi berhasil disimpan!');
        // Reset form
        setSelectedCustomer(null);
        document.getElementById('customer-search').value = '';
        setWasteItems([{ wasteId: '', weight: 0, subtotal: 0, key: Math.random() }]);
        setGrandTotal(0);
    };

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Buat Transaksi Baru</h2>
                    <p className="text-slate-500">Catat setoran sampah dari nasabah.</p>
                </div>
            </header>

            {/* Transaction Form */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <form onSubmit={handleFormSubmit}>
                        {/* Customer Selection */}
                        <div className="mb-8">
                            <label htmlFor="customer-search" className="block text-lg font-semibold text-slate-800 mb-2">1. Pilih Nasabah</label>
                            <div className="relative">
                                <input type="text" id="customer-search" onChange={handleCustomerSearch} placeholder="Ketik nama atau ID nasabah..." className="w-full pl-4 pr-10 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                 <svg className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>
                            </div>
                            {/* Customer Info Preview */}
                            {selectedCustomer && (
                                <div id="customer-preview" className="mt-4 bg-slate-50 p-4 rounded-lg flex items-center gap-4">
                                     <img src={`https://placehold.co/48x48/e2e8f0/475569?text=${selectedCustomer.avatar}`} alt="Avatar Nasabah" className="rounded-full" />
                                     <div>
                                         <p id="customer-name" className="font-bold text-slate-800">{selectedCustomer.name}</p>
                                         <p id="customer-id" className="text-sm text-slate-500">ID: {selectedCustomer.id}</p>
                                     </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Waste Items */}
                        <div>
                            <label className="block text-lg font-semibold text-slate-800 mb-2">2. Input Data Sampah</label>
                            <div id="waste-items-container" className="space-y-4">
                                {wasteItems.map((item, index) => (
                                    <div key={item.key} className="waste-item-row grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 p-4 rounded-lg">
                                        <div className="col-span-12 md:col-span-5">
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
                                        <div className="col-span-6 md:col-span-2">
                                             <label className="block text-sm font-medium text-slate-600 mb-1">Berat</label>
                                             <input 
                                                type="number" 
                                                step="0.1" 
                                                value={item.weight || ''}
                                                onChange={(e) => handleItemChange(item.key, 'weight', e.target.value)}
                                                className="waste-weight-input w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="0.0" required />
                                        </div>
                                         <div className="col-span-6 md:col-span-1 text-center">
                                            <span className="text-slate-500">Kg</span>
                                        </div>
                                        <div className="col-span-8 md:col-span-3">
                                             <label className="block text-sm font-medium text-slate-600 mb-1">Subtotal</label>
                                             <p className="subtotal-text text-lg font-semibold text-slate-800">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.subtotal)}
                                             </p>
                                        </div>
                                        <div className="col-span-4 md:col-span-1 flex justify-end">
                                            {wasteItems.length > 1 && (
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

                        {/* Summary */}
                        <div className="border-t border-slate-200 mt-8 pt-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-800">Total Transaksi</span>
                                <span id="grand-total" className="text-2xl font-bold text-teal-600">
                                     {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(grandTotal)}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-4 mt-8">
                            <button type="button" className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-all">
                                Batal
                            </button>
                            <button type="submit" className="px-8 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-all shadow-md shadow-teal-500/30 hover:shadow-lg">
                                Simpan Transaksi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TransaksiBaru;
