import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import Litepicker from "litepicker";
import { toast } from "react-toastify";

const Laporan = () => {
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const bankSampah = localStorage.getItem("bankSampah"); // asumsi disimpan waktu login

  // Init datepicker
  useEffect(() => {
    const picker = new Litepicker({
      element: document.getElementById("datepicker"),
      singleMode: false,
      format: "YYYY-MM-DD",
      setup: (picker) => {
        picker.on("selected", (start, end) => {
          setDateRange({
            start: start.format("YYYY-MM-DD"),
            end: end.format("YYYY-MM-DD"),
          });
        });
      },
    });
  }, []);

  // Fetch summary data
  useEffect(() => {
    const fetchData = async () => {
      if (!bankSampah) return;
      setLoading(true);
      try {
        const res = await fetch(
          `/api/reports/bank/${bankSampah}/excel?start=${dateRange.start}&end=${dateRange.end}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Gagal fetch laporan");
        // sementara Excel → backend generate file
        // Jadi di sini bisa tambahin endpoint khusus summary
        // Untuk contoh, aku kasih dummy dulu
        setSummary({
          totalSampah: 315.5,
          penjualan: 1200000,
          pembelian: 850000,
          profit: 350000,
          komposisi: [
            { label: "Plastik", value: 150.5 },
            { label: "Kertas", value: 100 },
            { label: "Logam", value: 50 },
            { label: "Kaca", value: 10 },
            { label: "Lainnya", value: 5 },
          ],
          tren: {
            labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
            pendapatan: [250000, 400000, 300000, 250000],
            pengeluaran: [200000, 300000, 210000, 290000],
          },
        });
      } catch (err) {
        console.error(err);
        toast.error("Gagal ambil data laporan");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bankSampah, dateRange, token]);

  // Render chart ketika summary berubah
  useEffect(() => {
    if (!summary) return;

    const wasteCtx = document.getElementById("wasteCompositionChart");
    if (wasteCtx) {
      const existing = Chart.getChart(wasteCtx);
      if (existing) existing.destroy();
      new Chart(wasteCtx, {
        type: "bar",
        data: {
          labels: summary.komposisi.map((k) => k.label),
          datasets: [
            {
              label: "Volume (Kg)",
              data: summary.komposisi.map((k) => k.value),
              backgroundColor: ["#14b8a6", "#fb923c", "#38bdf8", "#f59e0b", "#94a3b8"],
              borderRadius: 6,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    const financeCtx = document.getElementById("financeTrendChart");
    if (financeCtx) {
      const existing = Chart.getChart(financeCtx);
      if (existing) existing.destroy();
      new Chart(financeCtx, {
        type: "line",
        data: {
          labels: summary.tren.labels,
          datasets: [
            {
              label: "Pendapatan",
              data: summary.tren.pendapatan,
              borderColor: "#14b8a6",
              backgroundColor: "rgba(20, 184, 166, 0.1)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Pengeluaran",
              data: summary.tren.pengeluaran,
              borderColor: "#fb923c",
              backgroundColor: "rgba(251, 146, 60, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }
  }, [summary]);

  // Export handler
  const handleExport = async (type) => {
    try {
      const url = `/api/reports/sales/${bankSampah}/${type}?start=${dateRange.start}&end=${dateRange.end}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Gagal export");

      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `laporan-bank.${type}`;
      link.click();
      toast.success(`Berhasil export ${type.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      toast.error("Gagal export laporan");
    }
  };

  return (
    <div className="p-6 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Laporan Bank Sampah</h2>
          <p className="text-slate-500">Analisis kinerja dan operasional bank sampah.</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <input
            type="text"
            id="datepicker"
            className="w-full md:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg"
            placeholder="Pilih rentang tanggal"
          />
          <button
            onClick={() => handleExport("excel")}
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg"
          >
            Export Excel
          </button>
          <button
            onClick={() => handleExport("pdf")}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
          >
            Export PDF
          </button>
        </div>
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : summary ? (
        <>
          {/* Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <p className="text-slate-500">Total Sampah Masuk</p>
              <p className="text-3xl font-bold">{summary.totalSampah} Kg</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <p className="text-slate-500">Penjualan (Pengepul)</p>
              <p className="text-3xl font-bold">Rp {summary.penjualan.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <p className="text-slate-500">Pembelian (Nasabah)</p>
              <p className="text-3xl font-bold">Rp {summary.pembelian.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <p className="text-slate-500">Estimasi Profit</p>
              <p className="text-3xl font-bold text-emerald-600">
                Rp {summary.profit.toLocaleString()}
              </p>
            </div>
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-xl font-bold mb-4">Komposisi Sampah</h3>
              <div className="h-64">
                <canvas id="wasteCompositionChart"></canvas>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-xl font-bold mb-4">Tren Keuangan</h3>
              <div className="h-64">
                <canvas id="financeTrendChart"></canvas>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>Belum ada data laporan</p>
      )}
    </div>
  );
};

export default Laporan;
