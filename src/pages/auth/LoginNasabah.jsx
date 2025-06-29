import React, { useState } from 'react';
import { useAppContext } from '../../AppContext';
import anambasImage from '../../assets/nasabah1.jpg'; 

const LoginNasabah = () => {
    const { navigateTo, loginNasabah } = useAppContext();
    const [view, setView] = useState('phoneInput');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        const phone = e.target['phone-number'].value;
        if (phone) {
            setPhoneNumber(phone);
            setView('otpInput');
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        console.log('OTP verified');
        loginNasabah({ name: 'Ibu Siti', id: 'N-001' });
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Kolom Gambar (Kiri) */}
                <div className="hidden md:block w-5/12">
                    <img 
                        src={anambasImage} 
                        alt="Komunitas Peduli Lingkungan Anambas" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x1000/dbf4ff/10b981?text=DWEP+Anambas'; }}
                    />
                </div>

                {/* Kolom Formulir (Kanan) */}
                <div className="w-full md:w-7/12 flex flex-col justify-center p-8 md:p-12">
                    <div className="w-full max-w-sm mx-auto">
                        <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => navigateTo('landingPage')}>
                            <div className="bg-teal-500 p-2 rounded-lg">
                                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C21.9992 9.15545 20.9103 6.47926 18.9921 4.54533M12 2V6M12 22V18M12 2C14.75 2 17.1 3.24 18.75 5M12 2C9.25 2 6.9 3.24 5.25 5M18.75 5C19.75 6.41 20.4 8.2 20.5 10M18.75 5C18.75 5 15 8 12 8S5.25 5 5.25 5M5.25 5C4.25 6.41 3.6 8.2 3.5 10M3.5 10H7.5M20.5 10H16.5M7.5 10C7.5 10 9 12 12 12S16.5 10 16.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">DWEP Anambas</h1>
                        </div>
                        {view === 'phoneInput' && (
                            <>
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">Selamat Datang!</h2>
                                <p className="text-slate-500 mb-8">Masukkan nomor HP Anda yang terdaftar.</p>
                                <form onSubmit={handlePhoneSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="phone-number" className="block text-sm font-medium text-slate-600 mb-1">Nomor HP</label>
                                        <input type="tel" id="phone-number" name="phone-number" placeholder="0812..." className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                                    </div>
                                    <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-all">Kirim Kode Verifikasi</button>
                                </form>
                            </>
                        )}
                        {view === 'otpInput' && (
                            <form onSubmit={handleOtpSubmit}>
                                 <h2 className="text-3xl font-bold text-slate-800 mb-2">Verifikasi Akun</h2>
                                 <p className="text-slate-500 mb-8">Kami telah mengirim kode ke <span className="font-bold">{phoneNumber}</span></p>
                                <div className="flex justify-center gap-3 mb-6">
                                    <input type="text" maxLength="1" className="w-14 h-16 text-3xl text-center border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                                    <input type="text" maxLength="1" className="w-14 h-16 text-3xl text-center border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                                    <input type="text" maxLength="1" className="w-14 h-16 text-3xl text-center border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                                    <input type="text" maxLength="1" className="w-14 h-16 text-3xl text-center border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                                </div>
                                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-all">Verifikasi & Masuk</button>
                                 <p className="text-center text-sm text-slate-500 mt-4">
                                    <a href="#" onClick={(e) => { e.preventDefault(); setView('phoneInput')}} className="font-semibold text-slate-600 hover:underline">Ubah Nomor HP</a>
                                </p>
                            </form>
                        )}
                        <p className="text-center text-sm text-slate-500 mt-8">
                            Belum punya akun? <a href="#" onClick={(e) => {e.preventDefault(); navigateTo('registerNasabah')}} className="font-semibold text-teal-600 hover:underline">Daftar di sini</a>
                        </p>
                        <p className="text-center text-sm text-slate-500 mt-2">
                           Atau kembali ke <a href="#" onClick={(e) => {e.preventDefault(); navigateTo('landingPage')}} className="font-semibold text-slate-600 hover:underline">Halaman Utama</a>
                        </p>
                    </div>
                 </div>
            </div>
        </div>
    );
};
export default LoginNasabah;