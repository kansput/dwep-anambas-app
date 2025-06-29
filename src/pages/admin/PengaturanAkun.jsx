import React from 'react';

// Komponen PengaturanAkun.jsx
const PengaturanAkun = () => {
    
    // Fungsi dummy untuk menangani submit form
    const handleSubmit = (e, formType) => {
        e.preventDefault();
        alert(`Perubahan untuk ${formType} telah disimpan! (Simulasi)`);
    };

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Pengaturan Akun</h2>
                <p className="text-slate-500">Kelola informasi profil dan keamanan akun Anda.</p>
            </header>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Profile Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                        <h3 className="text-xl font-bold text-slate-800">Profil</h3>
                        <p className="text-sm text-slate-500">Informasi ini akan ditampilkan di seluruh aplikasi.</p>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e, 'Profil')} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-slate-600 mb-2">Foto Profil</label>
                                <div className="flex items-center gap-4">
                                    <img src="https://placehold.co/80x80/e2e8f0/475569?text=P" alt="Avatar Petugas" className="w-20 h-20 rounded-full" />
                                    <div className="flex gap-2">
                                        <button type="button" className="text-sm font-semibold text-rose-600 hover:underline">Hapus</button>
                                        <button type="button" className="text-sm font-semibold text-teal-600 hover:underline">Ubah</button>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                 <div>
                                    <label htmlFor="full-name" className="block text-sm font-medium text-slate-600 mb-1">Nama Lengkap</label>
                                    <input type="text" id="full-name" defaultValue="Petugas 01" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                </div>
                                 <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                                    <input type="email" id="email" defaultValue="petugas01@dwep.id" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button type="submit" className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all">Simpan Perubahan</button>
                        </div>
                    </form>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                     <div className="p-6 border-b border-slate-200">
                        <h3 className="text-xl font-bold text-slate-800">Keamanan</h3>
                        <p className="text-sm text-slate-500">Ubah password Anda secara berkala untuk menjaga keamanan akun.</p>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e, 'Keamanan')} className="p-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="current-password" className="block text-sm font-medium text-slate-600 mb-1">Password Saat Ini</label>
                                <input type="password" id="current-password" className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="********" />
                            </div>
                             <div>
                                <label htmlFor="new-password" className="block text-sm font-medium text-slate-600 mb-1">Password Baru</label>
                                <input type="password" id="new-password" className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Minimal 8 karakter" />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-600 mb-1">Konfirmasi Password Baru</label>
                                <input type="password" id="confirm-password" className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                            </div>
                        </div>
                         <div className="flex justify-end mt-6">
                            <button type="submit" className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-all">Ubah Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PengaturanAkun;

