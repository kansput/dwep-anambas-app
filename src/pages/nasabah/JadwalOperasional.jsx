import React from 'react';
import { useAppContext } from '../../AppContext'; // Impor untuk navigasi

// Komponen JadwalOperasional.jsx (Untuk Nasabah)
const JadwalOperasional = () => {
    const { navigateTo } = useAppContext();

    // Data jadwal palsu (mock data) untuk demo
    const schedule = [
        { day: 'Senin', time: 'Tutup', isOpen: false },
        { day: 'Selasa', time: '09:00 - 15:00', isOpen: true },
        { day: 'Rabu', time: '09:00 - 15:00', isOpen: true },
        { day: 'Kamis', time: 'Tutup', isOpen: false },
        { day: 'Jumat', time: '09:00 - 15:00', isOpen: true },
        { day: 'Sabtu', time: '08:00 - 12:00', isOpen: true },
        { day: 'Minggu', time: 'Tutup', isOpen: false },
    ];

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
            {/* Header */}
            <header className="p-6 flex items-center gap-4 bg-emerald-600 text-white sticky top-0 z-10">
                <button onClick={() => navigateTo('saldoNasabah')} className="p-2 -ml-2 rounded-full hover:bg-white/20 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold">Jadwal Operasional</h1>
            </header>

            {/* Main Content */}
            <main className="p-6 bg-slate-50 min-h-screen">
                
                {/* Schedule Section */}
                <section>
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Jam Buka Bank Sampah
                    </h2>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                        {schedule.map(item => (
                            <div key={item.day} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                                <p className="font-semibold">{item.day}</p>
                                <p className={`font-semibold ${item.isOpen ? 'text-green-600' : 'text-red-500'}`}>
                                    {item.time}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default JadwalOperasional;
