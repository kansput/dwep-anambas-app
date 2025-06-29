import React, { useState, useEffect } from 'react';
import { mockWasteTypes } from '../../data/mockDatabase';

const ManajemenSampah = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedWaste, setSelectedWaste] = useState(null);
    const [wasteData, setWasteData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setWasteData(mockWasteTypes);
    }, []);

    const filteredWasteData = wasteData.filter(waste =>
        waste.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedWaste(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (waste) => {
        setModalMode('edit');
        setSelectedWaste(waste);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form data sampah disubmit!');
        handleCloseModal();
    };

    return (
        <>
            <div className="p-6 md:p-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">Manajemen Data Sampah</h2>
                        <p className="text-slate-500">Kelola jenis, kategori, dan harga sampah yang diterima.</p>
                    </div>
                  
                </header>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                        <div className="relative w-full md:w-1/3">
                            <input 
                                type="text" 
                                placeholder="Cari nama sampah..." 
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>
                        </div>
                        <button onClick={handleOpenAddModal} className="w-full md:w-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Tambah Sampah Baru
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 rounded-l-lg">Nama Sampah</th>
                                    <th scope="col" className="px-6 py-3">Kategori</th>
                                    <th scope="col" className="px-6 py-3">Harga Beli</th>
                                    <th scope="col" className="px-6 py-3 text-center">Status</th>
                                    <th scope="col" className="px-6 py-3 text-center rounded-r-lg">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredWasteData.map((waste) => (
                                    <tr key={waste.id} className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="px-6 py-4 font-semibold text-slate-800">{waste.name}</td>
                                        <td className="px-6 py-4">{waste.category}</td>
                                        <td className="px-6 py-4">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(waste.price)} / {waste.unit}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                                                waste.status === 'Aktif' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                                {waste.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-4">
                                                <button onClick={() => handleOpenEditModal(waste)} className="p-2 hover:bg-slate-200 rounded-full" title="Edit"><svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"></path></svg></button>
                                                <button className="p-2 hover:bg-slate-200 rounded-full" title="Hapus"><svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">{modalMode === 'add' ? 'Tambah Sampah Baru' : 'Edit Data Sampah'}</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label htmlFor="nama-sampah" className="block mb-2 text-sm font-medium text-slate-600">Nama Sampah</label>
                                <input type="text" id="nama-sampah" defaultValue={selectedWaste ? selectedWaste.name : ''} className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="kategori-sampah" className="block mb-2 text-sm font-medium text-slate-600">Kategori</label>
                                <select id="kategori-sampah" defaultValue={selectedWaste ? selectedWaste.category : 'Plastik'} className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                                    <option>Plastik</option><option>Kertas</option><option>Logam</option><option>Kaca</option><option>Lainnya</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                 <div>
                                    <label htmlFor="harga-sampah" className="block mb-2 text-sm font-medium text-slate-600">Harga Beli</label>
                                    <input type="number" id="harga-sampah" defaultValue={selectedWaste ? selectedWaste.price : ''} placeholder="contoh: 3000" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                                </div>
                                 <div>
                                    <label htmlFor="satuan-sampah" className="block mb-2 text-sm font-medium text-slate-600">Satuan</label>
                                    <select id="satuan-sampah" defaultValue={selectedWaste ? selectedWaste.unit : 'Kg'} className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                                        <option>Kg</option><option>Pcs</option><option>Ikat</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                 <label htmlFor="status-sampah" className="block text-sm font-medium text-slate-600">Status Aktif</label>
                                 <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="status-sampah" className="sr-only peer" defaultChecked={selectedWaste ? selectedWaste.status === 'Aktif' : true} />
                                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                </div>
                            </div>
                             <div className="flex justify-end gap-4">
                                <button type="button" onClick={handleCloseModal} className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-all">Batal</button>
                                <button type="submit" className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
export default ManajemenSampah;