import React from 'react';
import { useAppContext } from '../../AppContext';
import adminLoginBg from '../../assets/petugas-bg.jpg';

const RegisterAdmin = () => {
    const { navigateTo } = useAppContext();

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Admin registration attempt');
        alert('Pendaftaran Admin Berhasil! Silakan masuk.');
        navigateTo('loginAdmin');
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Kolom Formulir (Kiri) */}
                <div className="w-full md:w-7/12 flex flex-col justify-center p-8 md:p-12 overflow-y-auto">
                    <div className="w-full max-w-sm mx-auto">
                        <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => navigateTo('landingPage')}>
                            <div className="bg-teal-500 p-2 rounded-lg">
                                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C21.9992 9.15545 20.9103 6.47926 18.9921 4.54533M12 2V6M12 22V18M12 2C14.75 2 17.1 3.24 18.75 5M12 2C9.25 2 6.9 3.24 5.25 5M18.75 5C19.75 6.41 20.4 8.2 20.5 10M18.75 5C18.75 5 15 8 12 8S5.25 5 5.25 5M5.25 5C4.25 6.41 3.6 8.2 3.5 10M3.5 10H7.5M20.5 10H16.5M7.5 10C7.5 10 9 12 12 12S16.5 10 16.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">DWEP Anambas</h1>
                        </div>

                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Buat Akun Petugas</h2>
                        <p className="text-slate-500 mb-8">Daftarkan diri Anda untuk mengelola sistem.</p>
                        
                        <form onSubmit={handleRegister}>
                            <div className="mb-4">
                                <label htmlFor="register-name" className="block text-sm font-medium text-slate-600 mb-1">Nama Lengkap</label>
                                <input type="text" id="register-name" placeholder="Nama Lengkap Anda" className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="register-email" className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                                <input type="email" id="register-email" placeholder="contoh@email.com" className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="register-password" className="block text-sm font-medium text-slate-600 mb-1">Password</label>
                                <input type="password" id="register-password" placeholder="Minimal 8 karakter" className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                            </div>
                            <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md shadow-slate-800/30 hover:shadow-lg">
                                Daftar Akun
                            </button>
                        </form>
                         <p className="text-center text-sm text-slate-500 mt-8">
                            Sudah punya akun? <a href="#" onClick={(e) => {e.preventDefault(); navigateTo('loginAdmin')}} className="font-semibold text-teal-600 hover:underline">Masuk di sini</a>
                        </p>
                    </div>
                </div>
                
                {/* Kolom Gambar (Kanan) */}
                <div className="hidden md:block w-5/12">
                    <img 
                        src={adminLoginBg} 
                        alt="Ilustrasi DWEP Anambas" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x1000/0f172a/ffffff?text=DWEP+Admin'; }}
                    />
                </div>
            </div>
        </div>
    );
};
export default RegisterAdmin;