import React from 'react';
import { useAppContext } from '../../AppContext';

const SaldoNasabah = () => {
    const { nasabahUser, navigateTo, logout } = useAppContext();

    const transactions = [
        { type: 'setor', description: 'Setoran Plastik PET', date: '20 Juni 2025', amount: 15600, weight: 5.2 },
        { type: 'tarik', description: 'Penarikan Tunai', date: '10 Juni 2025', amount: 50000, weight: null },
        { type: 'setor', description: 'Setoran Kardus', date: '01 Juni 2025', amount: 10500, weight: 7.0 },
    ];

    if (!nasabahUser) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Silakan login terlebih dahulu...</p>
                <button onClick={() => navigateTo('loginAdmin')} className="ml-4 bg-teal-500 text-white px-4 py-2 rounded">
                    Ke Halaman Login
                </button>
            </div>
        );
    }
    
    return (
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
            <header className="p-6 flex justify-between items-center bg-emerald-600 text-white rounded-b-3xl sticky top-0 z-10">
                <div>
                    <p className="text-sm opacity-80">Selamat Pagi,</p>
                    <h1 className="text-2xl font-bold">{nasabahUser.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <img src={`https://placehold.co/48x48/f0fdf4/10b981?text=${nasabahUser.name.charAt(0)}`} alt="Avatar Nasabah" className="rounded-full border-2 border-white/50" />
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-300 ring-2 ring-emerald-600"></span>
                    </div>
                    <button onClick={logout} className="p-2 rounded-full hover:bg-white/20 transition-colors" title="Keluar">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </header>

            <main className="p-6">
                <section className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 mb-8 shadow-lg shadow-emerald-500/30">
                    <p className="text-sm opacity-80 mb-1">Saldo Tabungan Anda</p>
                    <p className="text-4xl font-bold tracking-tight mb-4">Rp 125.500</p>
                    <div className="h-px bg-white/20 my-4"></div>
                    <div className="flex justify-between items-center text-sm">
                        <div>
                            <p className="opacity-80">Total Sampah Terkumpul</p>
                            <p className="font-bold">25.5 Kg</p>
                        </div>
                        {/* PERBAIKAN: Tombol ini sekarang bisa diklik */}
                        <button onClick={() => navigateTo('tarikSaldo')} className="bg-white/20 hover:bg-white/30 transition-all font-semibold py-2 px-4 rounded-full text-xs">
                            Tarik Saldo
                        </button>
                    </div>
                </section>

                <section className="grid grid-cols-3 gap-4 mb-8 text-center">
                    <button onClick={() => navigateTo('hargaSampah')} className="bg-green-100/60 p-4 rounded-xl hover:bg-green-200/60 transition-all">
                        <div className="bg-green-200/70 p-3 inline-block rounded-full mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v.01M12 18v-2m0-4v-2m0-4V4m0 0v.01M12 6v.01M12 18v-2m0-4v-2m0-4V4m0 0v.01" /></svg>
                        </div>
                        <p className="text-xs font-semibold text-green-900">Harga Sampah</p>
                    </button>
                    <button onClick={() => navigateTo('jadwalOperasional')} className="bg-orange-100/60 p-4 rounded-xl hover:bg-orange-200/60 transition-all">
                         <div className="bg-orange-200/70 p-3 inline-block rounded-full mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-800" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <p className="text-xs font-semibold text-orange-900">Jadwal Buka</p>
                    </button>
                    <button onClick={() => navigateTo('lokasiBankSampah')} className="bg-sky-100/60 p-4 rounded-xl hover:bg-sky-200/60 transition-all">
                        <div className="bg-sky-200/70 p-3 inline-block rounded-full mb-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-800" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <p className="text-xs font-semibold text-sky-900">Lokasi</p>
                    </button>
                </section>

                <section className="bg-stone-100 p-5 rounded-2xl mb-8 border border-stone-200">
                    <div className="flex items-center gap-4">
                        <img src="https://img.icons8.com/plasticine/100/000000/plant-under-sun.png" alt="Ilustrasi Lingkungan" className="w-16 h-16"/>
                        <div>
                            <h3 className="font-bold text-slate-800">Terima Kasih, Pahlawan Lingkungan!</h3>
                            <p className="text-sm text-slate-600">Setiap sampah yang Anda setor sangat berarti untuk menjaga kelestarian Anambas.</p>
                        </div>
                    </div>
                </section>
                
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Riwayat Transaksi</h2>
                        <a href="#" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Lihat Semua</a>
                    </div>
                    <div className="space-y-4">
                        {transactions.map((tx, index) => (
                             <div key={index} className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${tx.type === 'setor' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                                    {tx.type === 'setor' ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" /></svg>
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold">{tx.description}</p>
                                    <p className="text-sm text-slate-500">{tx.date}</p>
                                </div>
                                <div className="ml-auto text-right">
                                     <p className={`font-bold ${tx.type === 'setor' ? 'text-green-600' : 'text-rose-600'}`}>
                                        {tx.type === 'setor' ? '+' : '-'} {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(tx.amount)}
                                     </p>
                                     {tx.weight && <p className="text-sm text-slate-500">{tx.weight} Kg</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};
export default SaldoNasabah;