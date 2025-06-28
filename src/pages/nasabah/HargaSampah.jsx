import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../AppContext'; // Impor untuk navigasi

// Komponen HargaSampah.jsx (Untuk Nasabah)
const HargaSampah = () => {
    const { navigateTo } = useAppContext();
    // Mock data untuk jenis sampah. Di aplikasi nyata, ini akan diambil dari database.
    const [wasteData, setWasteData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Simulasi mengambil data dari database saat komponen dimuat
        const data = [
            { id: 'PET01', name: 'Botol Plastik PET', category: 'Plastik', price: 3000, unit: 'Kg' },
            { id: 'KRD01', name: 'Kardus Bersih', category: 'Kertas', price: 1500, unit: 'Kg' },
            { id: 'ALM01', name: 'Kaleng Aluminium', category: 'Logam', price: 8000, unit: 'Kg' },
            { id: 'KCB01', name: 'Botol Kaca Bening', category: 'Kaca', price: 500, unit: 'Kg' },
            { id: 'BST01', name: 'Besi Tua', category: 'Logam', price: 2500, unit: 'Kg' },
            { id: 'HDPE01', name: 'Plastik HDPE (Botol Shampo)', category: 'Plastik', price: 2000, unit: 'Kg' },
            { id: 'KOR01', name: 'Koran Bekas', category: 'Kertas', price: 1200, unit: 'Kg' },
        ];
        setWasteData(data);
        setFilteredData(data);
    }, []);

    // Fungsi untuk menangani pencarian
    useEffect(() => {
        const results = wasteData.filter(waste =>
            waste.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            waste.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(results);
    }, [searchTerm, wasteData]);


    return (
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
            {/* Header */}
            <header className="p-6 flex items-center gap-4 bg-emerald-600 text-white sticky top-0 z-10">
                {/* Tombol kembali untuk navigasi */}
                <button onClick={() => navigateTo('saldoNasabah')} className="p-2 -ml-2 rounded-full hover:bg-white/20 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold">Harga Sampah</h1>
            </header>

            {/* Main Content */}
            <main className="p-6 bg-slate-50 min-h-screen">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <input 
                        type="text" 
                        placeholder="Cari jenis sampah..." 
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>
                </div>

                {/* Waste Price List */}
                <div className="space-y-3">
                    {filteredData.length > 0 ? (
                        filteredData.map(waste => (
                            <div key={waste.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${
                                    waste.category === 'Plastik' ? 'bg-sky-100' :
                                    waste.category === 'Kertas' ? 'bg-orange-100' :
                                    waste.category === 'Logam' ? 'bg-slate-200' :
                                    'bg-green-100'
                                }`}>
                                     <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                                        waste.category === 'Plastik' ? 'text-sky-600' :
                                        waste.category === 'Kertas' ? 'text-orange-600' :
                                        waste.category === 'Logam' ? 'text-slate-600' :
                                        'text-green-600'
                                     }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-slate-800">{waste.name}</p>
                                    <p className="text-sm text-slate-500">{waste.category}</p>
                                </div>
                                <div className="text-right">
                                     <p className="font-bold text-teal-600">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(waste.price)}
                                     </p>
                                     <p className="text-sm text-slate-500">/ {waste.unit}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-slate-500">Jenis sampah tidak ditemukan.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default HargaSampah;
