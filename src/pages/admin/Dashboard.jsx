import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import API_BASE_URL from "../../config/api";
import { useAppContext } from "../../AppContext";

const Dashboard = () => {
  const { token } = useAppContext();

  const [summary, setSummary] = useState({ totalSampah: 0, totalPendapatan: 0 });
  const [trend, setTrend] = useState([]);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    // Fetch summary data
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/transaksi/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setSummary(data);
      } catch (err) {
        console.error("Error fetch summary:", err);
      }
    };

    // Fetch trend data
    const fetchTrend = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/transaksi/trend`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setTrend(data.trend || []);
      } catch (err) {
        console.error("Error fetch trend:", err);
      }
    };

    // Fetch reminders (opsional)
    const fetchReminders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/jadwal`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setReminders(data.jadwal || []);
      } catch (err) {
        console.error("Error fetch jadwal:", err);
      }
    };

    fetchSummary();
    fetchTrend();
    fetchReminders();
  }, [token]);

  // Render chart
  useEffect(() => {
    const ctx = document.getElementById("financeTrendChart");
    if (!ctx) return;

    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    new Chart(ctx, {
      type: "line",
      data: {
        labels: trend.map((t) => t.label),
        datasets: [
          {
            label: "Pendapatan",
            data: trend.map((t) => t.income),
            borderColor: "#14b8a6",
            backgroundColor: "rgba(20, 184, 166, 0.1)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Pengeluaran",
            data: trend.map((t) => t.expense),
            borderColor: "#fb923c",
            backgroundColor: "rgba(251, 146, 60, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
    });
  }, [trend]);

  return (
    <div className="p-6 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Dashboard Bank Sampah</h2>
          <p className="text-slate-500">Selamat datang kembali, Petugas!</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Summary */}
        <div className="lg:col-span-2 space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <p className="text-slate-500 text-sm">Total Sampah Bulan Ini</p>
              <p className="text-2xl font-bold">{summary.totalSampah} Kg</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <p className="text-slate-500 text-sm">Total Pendapatan</p>
              <p className="text-2xl font-bold">Rp {summary.totalPendapatan}</p>
            </div>
          </section>

          {/* Chart */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Tren Arus Kas</h3>
            <div className="h-64">
              <canvas id="financeTrendChart"></canvas>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-8">
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Jadwal & Pengingat</h3>
            <div className="space-y-4">
              {reminders.length === 0 ? (
                <p className="text-slate-500">Belum ada jadwal</p>
              ) : (
                reminders.map((r, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border">
                    <p className="font-semibold">{r.title}</p>
                    <p className="text-sm text-slate-500">{r.date}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
