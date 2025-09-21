import React, { useState } from "react";
import { useAppContext } from "../../AppContext";

const TarikSaldo = () => {
  const { token, nasabahUser, navigateTo, setUser } = useAppContext();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!nasabahUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">
          Silakan login terlebih dahulu...{" "}
          <button
            onClick={() => navigateTo("loginNasabah")}
            className="text-green-600 font-semibold underline"
          >
            Ke Halaman Login
          </button>
        </p>
      </div>
    );
  }

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const jumlah = Number(amount);

    if (!jumlah || jumlah <= 0) {
      setMessage("Jumlah penarikan tidak valid.");
      return;
    }
    if (jumlah > (nasabahUser.balance || 0)) {
      setMessage("Saldo tidak mencukupi.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: jumlah }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Permintaan tarik saldo berhasil diajukan (menunggu approval petugas).");

        // Update balance di UI sementara
        const newBalance = (nasabahUser.balance || 0) - jumlah;
        setUser({ ...nasabahUser, balance: newBalance });
        setAmount("");
      } else {
        setMessage(data.message || "Gagal mengajukan tarik saldo.");
      }
    } catch (err) {
      console.error("Error withdraw:", err);
      setMessage("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-bold text-green-600 mb-6 text-center">
        Tarik Saldo
      </h1>

      {/* Info saldo */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-center">
        <p className="text-gray-600">Saldo Anda</p>
        <p className="text-2xl font-bold text-green-600">
          Rp {Number(nasabahUser.balance || 0).toLocaleString("id-ID")}
        </p>
      </div>

      {/* Form tarik saldo */}
      <form
        onSubmit={handleWithdraw}
        className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto"
      >
        <label className="block mb-2 text-gray-700">Jumlah Penarikan</label>
        <input
          type="number"
          className="w-full border p-2 rounded-md mb-4"
          placeholder="Masukkan jumlah (Rp)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {message && <p className="text-sm text-red-600 mb-3">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          {loading ? "Memproses..." : "Ajukan Penarikan"}
        </button>
      </form>

      {/* Tombol kembali */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigateTo("homeNasabah")}
          className="text-green-600 underline"
        >
          ← Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default TarikSaldo;
