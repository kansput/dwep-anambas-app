 import React from 'react';
    import { useAppContext } from '../../AppContext'; // Impor untuk navigasi

    const LokasiBankSampah = () => {
        const { navigateTo } = useAppContext();

        return (
            <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
                {/* Header */}
                <header className="p-6 flex items-center gap-4 bg-emerald-600 text-white sticky top-0 z-10">
                    <button onClick={() => navigateTo('saldoNasabah')} className="p-2 -ml-2 rounded-full hover:bg-white/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold">Lokasi Bank Sampah</h1>
                </header>

                {/* Main Content */}
                <main className="p-6 bg-slate-50 min-h-screen">
                    
                    {/* Location Section */}
                    <section>
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Temukan Kami Di Sini
                        </h2>
                        <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
                                {/* Placeholder untuk peta */}
                                <img src="https://placehold.co/600x400/e2e8f0/475569?text=Peta+Lokasi+Bank+Sampah" alt="Peta Lokasi Bank Sampah" className="w-full h-48 object-cover" />
                            </div>
                            <div>
                                <p className="font-semibold text-lg">Bank Sampah Pusat Anambas</p>
                                <p className="text-sm text-slate-600 mt-1">
                                    Jalan Pesisir, Desa Kuala Maras, Kecamatan Jemaja Timur, Kabupaten Kepulauan Anambas, Kepulauan Riau.
                                </p>
                                <a href="#" className="text-sm font-semibold text-teal-600 hover:underline mt-3 inline-block bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-full transition-colors">
                                    Buka di Peta &rarr;
                                </a>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        );
    };

    export default LokasiBankSampah;