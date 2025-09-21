import React, { useState } from "react";
import { useAppContext } from "../../AppContext";
import API_BASE_URL from "../../config/api";
import petugasBg from "../../assets/petugas-bg.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPetugas = () => {
  const { login, navigateTo } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.accessToken, data.user.role, data.user);
        toast.success(`✅ Login sukses sebagai ${data.user.role}!`);
      } else {
        toast.error(data.message || "Login gagal");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(
        "Tidak bisa terhubung ke server. Cek API_BASE_URL & server backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-4xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Kolom Formulir */}
        <div className="w-full md:w-7/12 flex flex-col justify-center p-8 md:p-12">
          <div className="w-full max-w-sm mx-auto">
            {/* 🔹 Logo + nama aplikasi */}
            <div
              className="flex items-center gap-3 mb-4 cursor-pointer"
              onClick={() => navigateTo("landingPage")}
            >
              <div className="bg-teal-500 p-2 rounded-lg">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12M12 2V6M12 22V18M12 2C14.75 2 17.1 3.24 18.75 5M12 2C9.25 2 6.9 3.24 5.25 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
                DWEP Anambas
              </h1>
            </div>

            {/* 🔹 Judul halaman */}
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Login Petugas
            </h2>
            <p className="text-slate-500 mb-8">
              Masuk ke sistem menggunakan akun Anda.
            </p>

            {/* 🔹 Form login */}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-600 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@email.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-600 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md shadow-slate-800/30 hover:shadow-lg"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </form>

            {/* 🔹 Link daftar */}
            <p className="text-center text-sm text-slate-500 mt-8">
              Belum punya akun?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("registerPetugas");
                }}
                className="font-semibold text-teal-600 hover:underline"
              >
                Daftar di sini
              </a>
            </p>

            {/* 🔹 Direct link ke Landing Page */}
            <p className="text-center text-sm text-slate-500 mt-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("landingPage");
                }}
                className="font-semibold text-slate-600 hover:underline"
              >
                ← Kembali ke Menu Utama
              </a>
            </p>
          </div>
        </div>

        {/* Kolom Gambar */}
        <div className="hidden md:block w-5/12">
          <img
            src={petugasBg}
            alt="Ilustrasi DWEP Anambas"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/800x1000/0f172a/ffffff?text=DWEP+Petugas";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPetugas;
