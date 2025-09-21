import React, { useState } from "react";
import { useAppContext } from "../../AppContext";
import nasabahBg from "../../assets/nasabah1.jpg";
import { api } from "../../config/api";

const banks = [
  { idBank: "matak_baling", nama: "Matak (Baling)", tipe: "Baling", lokasi: "Matak" },
  { idBank: "matak_bank_sampah", nama: "Matak (Bank Sampah)", tipe: "Bank Sampah", lokasi: "Matak" },
  { idBank: "jemaja_baling", nama: "Jemaja (Baling)", tipe: "Baling", lokasi: "Jemaja" },
  { idBank: "kuala_maras_pdu", nama: "Kuala Maras (PDU)", tipe: "PDU", lokasi: "Kuala Maras" },
  { idBank: "landak_bank_sampah", nama: "Landak (Bank Sampah)", tipe: "Bank Sampah", lokasi: "Landak" },
  { idBank: "kiabu_pdu", nama: "Kiabu (PDU)", tipe: "PDU", lokasi: "Kiabu" },
  { idBank: "telaga_besar_bank_sampah", nama: "Telaga Besar (Bank Sampah)", tipe: "Bank Sampah", lokasi: "Telaga Besar" },
  { idBank: "telaga_kecil_bank_sampah", nama: "Telaga Kecil (Bank Sampah)", tipe: "Bank Sampah", lokasi: "Telaga Kecil" },
  { idBank: "piasan_bank_sampah", nama: "Piasan (Bank Sampah)", tipe: "Bank Sampah", lokasi: "Piasan" }
];

const RegisterNasabah = () => {
  const { navigateTo } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [password, setPassword] = useState("");
  const [bankId, setBankId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!bankId) {
        setError("Silakan pilih bank sampah terlebih dahulu");
        setLoading(false);
        return;
      }

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role: "nasabah",
        noTelp,
        bankSampah: bankId,
      });

      alert(res.data.message || "Pendaftaran berhasil! Silakan login setelah di-approve Admin.");
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setNoTelp("");
      setBankId("");
      navigateTo("loginNasabah");
    } catch (err) {
      console.error("❌ Register Nasabah error:", err);
      setError(err.response?.data?.message || err.message || "Terjadi kesalahan saat registrasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Kolom Form (Kiri) */}
        <div className="w-full md:w-7/12 flex flex-col justify-center p-8 md:p-12 overflow-y-auto">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Buat Akun Nasabah</h2>
            <p className="text-slate-500 mb-4">Daftarkan diri Anda untuk mulai menabung sampah.</p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleRegister}>
              {/* Nama Lengkap */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                />
              </div>

              {/* No Telp */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600 mb-1">No. Telepon</label>
                <input
                  type="text"
                  value={noTelp}
                  onChange={(e) => setNoTelp(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                />
              </div>

              {/* Bank Sampah */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-600 mb-1">Bank Sampah</label>
                <select
                  value={bankId}
                  onChange={(e) => setBankId(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="">-- Pilih Bank Sampah --</option>
                  {banks.map((bank) => (
                    <option key={bank.idBank} value={bank.idBank}>
                      {bank.nama} ({bank.tipe} - {bank.lokasi})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50"
              >
                {loading ? "Mendaftar..." : "Daftar Akun"}
              </button>
            </form>

            {/* Link ke Login Nasabah */}
            <p className="text-center text-sm text-slate-500 mt-8">
              Sudah punya akun?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("loginNasabah");
                }}
                className="font-semibold text-teal-600 hover:underline"
              >
                Masuk di sini
              </a>
            </p>
          </div>
        </div>

        {/* Kolom Gambar (Kanan) */}
        <div className="hidden md:block w-5/12">
          <img
            src={nasabahBg}
            alt="Ilustrasi Nasabah"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterNasabah;
