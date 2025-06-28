import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import Litepicker from 'litepicker';

// Komponen Laporan.jsx
const Laporan = () => {

    // useEffect untuk menjalankan kode setelah komponen ditampilkan
    useEffect(() => {
        // --- Inisialisasi Datepicker ---
        const picker = new Litepicker({
            element: document.getElementById('datepicker'),
            singleMode: false,
            format: 'DD MMM YYYY',
            setup: (picker) => {
                picker.on('selected', (date1, date2) => {
                    // Logika untuk me-refresh data berdasarkan rentang tanggal
                    console.log('Rentang tanggal dipilih:', date1.dateInstance, date2.dateInstance);
                });
            }
        });

        // --- Inisialisasi Grafik Komposisi Sampah ---
        let wasteChartInstance = null;
        const wasteCtx = document.getElementById('wasteCompositionChart');
        if (wasteCtx) {
            const existingWasteChart = Chart.getChart(wasteCtx);
            if (existingWasteChart) {
                existingWasteChart.destroy();
            }
            wasteChartInstance = new Chart(wasteCtx, {
                type: 'bar',
                data: {
                    labels: ['Plastik', 'Kertas', 'Logam', 'Kaca', 'Lainnya'],
                    datasets: [{
                        label: 'Volume (Kg)',
                        data: [150.5, 100, 50, 10, 5],
                        backgroundColor: ['#14b8a6', '#fb923c', '#38bdf8', '#f59e0b', '#94a3b8'],
                        borderRadius: 6,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: '#e2e8f0' }, ticks: { color: '#64748b' } },
                        x: { grid: { display: false }, ticks: { color: '#64748b' } }
                    }
                }
            });
        }

        // --- Inisialisasi Grafik Tren Keuangan ---
        let financeChartInstance = null;
        const financeCtx = document.getElementById('financeTrendChart');
        if (financeCtx) {
             const existingFinanceChart = Chart.getChart(financeCtx);
            if (existingFinanceChart) {
                existingFinanceChart.destroy();
            }
            financeChartInstance = new Chart(financeCtx, {
                type: 'line',
                data: {
                    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
                    datasets: [
                        { label: 'Pendapatan', data: [250000, 400000, 300000, 250000], borderColor: '#14b8a6', backgroundColor: 'rgba(20, 184, 166, 0.1)', fill: true, tension: 0.4 },
                        { label: 'Pengeluaran', data: [200000, 300000, 210000, 290000], borderColor: '#fb923c', backgroundColor: 'rgba(251, 146, 60, 0.1)', fill: true, tension: 0.4 }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'top', align: 'end', labels: { color: '#475569', usePointStyle: true, pointStyle: 'rectRounded' } } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: '#e2e8f0' }, ticks: { color: '#64748b' } },
                        x: { grid: { display: false }, ticks: { color: '#64748b' } }
                    }
                }
            });
        }

    }, []); // Array kosong memastikan kode ini hanya berjalan sekali

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Laporan Bank Sampah</h2>
                    <p className="text-slate-500">Analisis kinerja dan operasional bank sampah.</p>
                </div>
                 <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="relative">
                        <input type="text" id="datepicker" className="w-full md:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Pilih rentang tanggal" />
                        <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        Ekspor
                    </button>
                </div>
            </header>
            
            {/* Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4 mb-2">
                       <div className="bg-teal-100 p-3 rounded-xl"><svg className="w-6 h-6 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg></div>
                       <p className="text-slate-500">Total Sampah Masuk</p>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">315.5 <span className="text-xl font-medium text-slate-500">Kg</span></p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4 mb-2">
                       <div className="bg-orange-100 p-3 rounded-xl"><svg className="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28a11.95 11.95 0 00-5.814 5.519l-2.74 1.22m0 0L2.25 18" /></svg></div>
                       <p className="text-slate-500">Penjualan (Pengepul)</p>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">Rp 1.2M</p>
                </div>
                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4 mb-2">
                       <div className="bg-sky-100 p-3 rounded-xl"><svg className="w-6 h-6 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.003A6.375 6.375 0 0112 21a6.375 6.375 0 01-3-1.128v-.003A6.375 6.375 0 0112 21a6.375 6.375 0 013-1.872" /></svg></div>
                       <p className="text-slate-500">Pembelian (Nasabah)</p>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">Rp 850K</p>
                </div>
                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4 mb-2">
                       <div className="bg-emerald-100 p-3 rounded-xl"><svg className="w-6 h-6 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v.01M12 18v-2m0-4v-2m0-4V4m0 0v.01M12 6v.01M12 18v-2m0-4v-2m0-4V4m0 0v.01" /></svg></div>
                       <p className="text-slate-500">Estimasi Profit</p>
                    </div>
                    <p className="text-3xl font-bold text-emerald-600">Rp 350K</p>
                </div>
            </section>
            
            {/* Charts */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Komposisi Sampah Terkumpul</h3>
                    <div className="h-64"><canvas id="wasteCompositionChart"></canvas></div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Tren Keuangan</h3>
                    <div className="h-64"><canvas id="financeTrendChart"></canvas></div>
                </div>
            </section>
            
            {/* Detailed Report Table */}
            <section>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Ringkasan Laporan</h3>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 rounded-l-lg">Deskripsi</th>
                                    <th scope="col" className="px-6 py-3 text-right">Volume</th>
                                    <th scope="col" className="px-6 py-3 text-right rounded-r-lg">Nilai (Rp)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-200"><td colSpan="3" className="px-6 py-2 font-semibold bg-slate-50 text-teal-600">Pemasukan</td></tr>
                                <tr className="border-b border-slate-200"><td className="px-6 py-3">Penjualan Plastik PET</td><td className="px-6 py-3 text-right">150.5 Kg</td><td className="px-6 py-3 text-right font-medium">Rp 602.000</td></tr>
                                <tr className="border-b border-slate-200"><td className="px-6 py-3">Penjualan Kardus</td><td className="px-6 py-3 text-right">100.0 Kg</td><td className="px-6 py-3 text-right font-medium">Rp 300.000</td></tr>
                                <tr className="border-b border-slate-200"><td className="px-6 py-3">Penjualan Logam</td><td className="px-6 py-3 text-right">50.0 Kg</td><td className="px-6 py-3 text-right font-medium">Rp 298.000</td></tr>
                                <tr className="border-b-4 border-slate-200"><td className="px-6 py-3 font-bold">Total Pemasukan</td><td></td><td className="px-6 py-3 text-right font-bold">Rp 1.200.000</td></tr>
                                
                                <tr className="border-b border-slate-200"><td colSpan="3" className="px-6 py-2 font-semibold bg-slate-50 text-orange-600">Pengeluaran</td></tr>
                                <tr className="border-b border-slate-200"><td className="px-6 py-3">Pembelian Sampah dari Nasabah</td><td></td><td className="px-6 py-3 text-right font-medium">Rp 850.000</td></tr>
                                <tr className="border-b border-slate-200"><td className="px-6 py-3">Biaya Operasional (Transportasi)</td><td></td><td className="px-6 py-3 text-right font-medium">Rp 150.000</td></tr>
                                <tr className="border-b-4 border-slate-200"><td className="px-6 py-3 font-bold">Total Pengeluaran</td><td></td><td className="px-6 py-3 text-right font-bold">Rp 1.000.000</td></tr>

                                <tr className=""><td className="px-6 py-4 font-bold text-lg">PROFIT BERSIH</td><td></td><td className="px-6 py-4 text-right font-bold text-lg text-emerald-600">Rp 200.000</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Laporan;
