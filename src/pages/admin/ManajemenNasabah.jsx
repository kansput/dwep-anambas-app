import React, { useState, useEffect } from 'react';
import { mockCustomers } from '../../data/mockDatabase'; // Impor data nasabah dari file pusat

const ManajemenNasabah = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    
    // State untuk menyimpan data nasabah dan kata kunci pencarian
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Memuat data saat komponen pertama kali render
    useEffect(() => {
        setCustomers(mockCustomers);
    }, []);

    // Logika untuk memfilter nasabah berdasarkan pencarian
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenAddModal = () => {
        setModalMode('add');
        setSelectedCustomer(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (customer) => {
        setModalMode('edit');
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form nasabah disubmit!');
        handleCloseModal();
    };

    return (
        <>
            <div className="p-6 md:p-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">Manajemen Data Nasabah</h2>
                        <p className="text-slate-500">Kelola informasi, saldo, dan riwayat nasabah.</p>
                    </div>
                    
                </header>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                        <div className="relative w-full md:w-1/3">
                            <input 
                                type="text" 
                                placeholder="Cari nama atau ID nasabah..." 
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>
                        </div>
                        <button onClick={handleOpenAddModal} className="w-full md:w-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1z" /></svg>
                            Tambah Nasabah Baru
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 rounded-l-lg">Nama Nasabah</th>
                                    <th scope="col" className="px-6 py-3">Kontak</th>
                                    <th scope="col" className="px-6 py-3">Saldo</th>
                                    <th scope="col" className="px-6 py-3">Bergabung Sejak</th>
                                    <th scope="col" className="px-6 py-3 text-center rounded-r-lg">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800">{customer.name}</div>
                                            <div className="text-xs text-slate-500">ID: {customer.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>{customer.address}</div>
                                            <div className="text-xs text-slate-500">{customer.contact}</div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-teal-600">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(customer.balance)}
                                        </td>
                                        <td className="px-6 py-4">{customer.joinDate}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 hover:bg-slate-200 rounded-full" title="Lihat Detail"><svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                                                <button onClick={() => handleOpenEditModal(customer)} className="p-2 hover:bg-slate-200 rounded-full" title="Edit"><svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"></path></svg></button>
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
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">{modalMode === 'add' ? 'Tambah Nasabah Baru' : 'Edit Data Nasabah'}</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label htmlFor="nama-nasabah" className="block mb-2 text-sm font-medium text-slate-600">Nama Lengkap</label>
                                <input type="text" id="nama-nasabah" defaultValue={selectedCustomer ? selectedCustomer.name : ''} className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                            </div>
                             <div className="mb-4">
                                <label htmlFor="no-hp" className="block mb-2 text-sm font-medium text-slate-600">Nomor HP (Opsional)</label>
                                <input type="tel" id="no-hp" defaultValue={selectedCustomer ? selectedCustomer.contact : ''} placeholder="0812..." className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                            </div>
                             <div className="mb-6">
                                <label htmlFor="alamat-nasabah" className="block mb-2 text-sm font-medium text-slate-600">Alamat / Dusun</label>
                                <textarea id="alamat-nasabah" rows="3" defaultValue={selectedCustomer ? selectedCustomer.address : ''} className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" required></textarea>
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

export default ManajemenNasabah;
