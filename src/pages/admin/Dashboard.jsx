import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Pastikan Chart.js di-import

// Ini adalah komponen Dashboard dalam format JSX
const Dashboard = () => {

    // useEffect digunakan untuk menjalankan kode setelah komponen ini ditampilkan di layar.
    // Ini adalah tempat yang tepat untuk menginisialisasi grafik dan logika lainnya.
    useEffect(() => {
        // --- DATA ---
        const reminders = [
            { date: 26, title: 'Jadwal Pengepul Datang', color: 'sky' },
            { date: 27, title: 'Rapat Koordinasi Petugas', color: 'orange' },
            { date: 13, title: 'Sosialisasi ke Desa Bahari', color: 'orange' },
            { date: 5,  title: 'Jadwal Pengepul Datang', color: 'sky' }
        ];

        // --- CALENDAR & REMINDERS LOGIC ---
        const calendarGrid = document.getElementById('calendar-grid');
        const remindersList = document.getElementById('reminders-list');
        // Pastikan elemen ada sebelum melanjutkan
        if (!calendarGrid || !remindersList) return;

        const today = new Date(2025, 5, 27); // Kita set hari ini tanggal 27 Juni
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Bersihkan konten sebelumnya untuk menghindari duplikasi
        calendarGrid.innerHTML = '';
        remindersList.innerHTML = '';

        // Isi kalender dengan hari-hari
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarGrid.innerHTML += `<div></div>`;
        }
        for (let day = 1; day <= daysInMonth; day++) {
            let dayClasses = 'cursor-pointer hover:font-bold';
            let dotHtml = '';
            const reminderForDay = reminders.find(r => r.date === day);
            if (reminderForDay) {
                let dotColor = 'bg-sky-500';
                if(reminderForDay.color === 'orange') dotColor = 'bg-orange-500';
                dotHtml = `<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 ${dotColor} rounded-full"></div>`;
            }

            if (day === today.getDate()) {
                dayClasses = 'bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold';
            }
            calendarGrid.innerHTML += `<div class="relative"><span class="${dayClasses}">${day}</span></div>`;
        }
        
        // Isi daftar pengingat
        reminders.forEach(r => {
            let iconBg = 'bg-sky-100';
            let iconColor = 'text-sky-600';
            let iconSvg = `<svg class="w-5 h-5 ${iconColor}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" /></svg>`;

            if(r.color === 'orange') {
                 iconBg = 'bg-orange-100';
                 iconColor = 'text-orange-600';
                 iconSvg = `<svg class="w-5 h-5 ${iconColor}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a1.125 1.125 0 00-.437 1.259l4.5 8.25c.384.704.047 1.564-.673 1.95l-1.518.759a1 1 0 01-1.06.047l-4.435-.74a1 1 0 01-.836-.986V3z" /><path d="M16.5 3.5a1 1 0 01-1-1.414l.94-1.085a1 1 0 111.518 1.31l-.94 1.085a1 1 0 01-.578.19zM15 6a1 1 0 01-1.414-1L15 3.586l1.414 1.414a1 1 0 01-1.414 1zM19 9a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM15 13a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1z" /></svg>`
            }

            remindersList.innerHTML += `
                <div class="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                    <div class="${iconBg} p-3 rounded-lg">${iconSvg}</div>
                    <div><p class="font-semibold">${r.title}</p><p class="text-sm text-slate-500">${r.date} Juni 2025</p></div>
                </div>
            `;
        });
        
        // --- CHART ---
        let chartInstance = null;
        const financeCtx = document.getElementById('financeTrendChart');
        if (financeCtx) {
            // Hancurkan chart lama jika ada untuk menghindari error
            const existingChart = Chart.getChart(financeCtx);
            if (existingChart) {
                existingChart.destroy();
            }
            chartInstance = new Chart(financeCtx, {
                type: 'line',
                data: {
                    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5', 'Minggu 6'],
                    datasets: [
                        { label: 'Pendapatan', data: [250000, 400000, 300000, 650000, 500000, 850000], borderColor: '#14b8a6', backgroundColor: 'rgba(20, 184, 166, 0.1)', fill: true, tension: 0.4 },
                        { label: 'Pengeluaran', data: [200000, 300000, 210000, 450000, 380000, 600000], borderColor: '#fb923c', backgroundColor: 'rgba(251, 146, 60, 0.1)', fill: true, tension: 0.4 }
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
         
        // --- ONLINE/OFFLINE STATUS ---
        function updateOnlineStatus() {
            const isOnline = navigator.onLine;
            const onlineIndicator = document.getElementById('status-online');
            const offlineIndicator = document.getElementById('status-offline');
            if(onlineIndicator && offlineIndicator) {
                onlineIndicator.classList.toggle('hidden', !isOnline);
                offlineIndicator.classList.toggle('hidden', isOnline);
            }
        }
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();

        // Cleanup function untuk menghapus event listener saat komponen dibongkar
        return () => {
             window.removeEventListener('online', updateOnlineStatus);
             window.removeEventListener('offline', updateOnlineStatus);
        }

    }, []); // Array kosong [] berarti kode ini hanya akan dijalankan sekali saat komponen pertama kali muncul.

    // Ini adalah bagian JSX yang akan ditampilkan ke layar.
    // Perhatikan semua "class" sudah diubah menjadi "className".
    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Dashboard Bank Sampah</h2>
                    <p className="text-slate-500">Selamat datang kembali, Petugas!</p>
                </div>
                 <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div id="status-online" className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-100 py-2 px-3 rounded-full">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        Online
                    </div>
                    <div id="status-offline" className="hidden items-center gap-2 text-sm text-rose-600 bg-rose-100 py-2 px-3 rounded-full">
                        <span className="relative flex h-3 w-3"><span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span></span>
                        Offline
                    </div>
                     <div className="flex items-center gap-3">
                        <img src="https://placehold.co/40x40/e2e8f0/475569?text=P" alt="Avatar Petugas" className="rounded-full" />
                        <div>
                            <p className="font-semibold text-slate-800">Petugas 01</p>
                            <p className="text-xs text-slate-500">Admin</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Summary Cards */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-6">
                            <div className="bg-teal-100 p-4 rounded-xl"><svg className="h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg></div>
                            <div><p className="text-slate-500 text-sm">Total Sampah Bulan Ini</p><p className="text-2xl font-bold text-slate-800">1,250 <span className="text-lg font-medium">Kg</span></p></div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-6">
                            <div className="bg-orange-100 p-4 rounded-xl"><svg className="h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 014.5 5.25h-.75m0 0V5.25m-1.5 0v-.75A.75.75 0 013 3.75h.75m0 0h.75A.75.75 0 015.25 4.5v.75m0 0v.75A.75.75 0 014.5 6h-.75m0 0H3.75m0 0h-.75A.75.75 0 012.25 6v.75M3.75 18v-.75A.75.75 0 013 16.5h-.75m0 0v.75A.75.75 0 013 18h.75m0 0h.75a.75.75 0 01.75-.75v-.75m0 0v.75a.75.75 0 01-.75.75h-.75m0 0h.75a.75.75 0 01.75-.75V15m-3 0v.75a.75.75 0 01-.75.75H3.75m0 0v-.75a.75.75 0 01.75-.75h.75M15 13.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                            <div><p className="text-slate-500 text-sm">Total Pendapatan</p><p className="text-2xl font-bold text-slate-800">Rp 3.5Jt</p></div>
                        </div>
                    </section>
                    
                    {/* Quick Actions */}
                    <section>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Aksi Cepat</h3>
                        <div className="grid grid-cols-2 gap-4">
                           <button className="bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-slate-200 group">
                                <div className="p-3 bg-teal-100 rounded-full"><svg className="h-6 w-6 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg></div>
                                <span className="font-semibold text-slate-700">Tambah Transaksi</span>
                            </button>
                            <button className="bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-slate-200 group">
                                <div className="p-3 bg-sky-100 rounded-full"><svg className="h-6 w-6 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg></div>
                                <span className="font-semibold text-slate-700">Daftarkan Nasabah</span>
                            </button>
                        </div>
                    </section>

                    {/* Chart */}
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mt-8">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Tren Arus Kas (30 Hari Terakhir)</h3>
                        <div className="h-64"><canvas id="financeTrendChart"></canvas></div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Calendar */}
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-800">Juni 2025</h3>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-full hover:bg-slate-100"><svg className="w-5 h-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg></button>
                                <button className="p-2 rounded-full hover:bg-slate-100"><svg className="w-5 h-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm text-slate-500 mb-2">
                            <div>Sn</div><div>Sl</div><div>Rb</div><div>Km</div><div>Jm</div><div>Sb</div><div>Mg</div>
                        </div>
                        <div id="calendar-grid" className="grid grid-cols-7 gap-2 text-center">
                            {/* Calendar days will be generated by JS */}
                        </div>
                    </section>

                    {/* Reminders / Upcoming Activities */}
                    <section>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Jadwal & Pengingat</h3>
                        <div id="reminders-list" className="space-y-4">
                            {/* Reminder items will be generated by JS */}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
