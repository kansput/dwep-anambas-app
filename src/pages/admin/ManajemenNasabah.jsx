import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";
import { useAppContext } from "../../AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Komponen tombol dengan style Tailwind
const Button = ({ onClick, children, color, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md text-white font-semibold text-sm transition-colors duration-200 ${color} ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-90"
    }`}
  >
    {children}
  </button>
);

const ManajemenNasabah = () => {
  const { token } = useAppContext();
  const [nasabah, setNasabah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(new Set());
  const [search, setSearch] = useState("");

  // Ambil data nasabah dari API
  useEffect(() => {
    const fetchNasabah = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/nasabah`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setNasabah(data.users || []);
        } else {
          toast.error(data.message || "Gagal memuat data nasabah");
        }
      } catch {
        toast.error("Tidak bisa menghubungi server");
      } finally {
        setLoading(false);
      }
    };
    fetchNasabah();
  }, [token]);

  // Fungsi mengubah status nasabah
  const updateStatus = async (uid, status) => {
    if (!uid) return toast.error("ID nasabah tidak valid");
    setProcessing((prev) => new Set([...prev, uid]));
    try {
      const res = await fetch(`${API_BASE_URL}/users/${uid}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Status nasabah diperbarui: ${status}`);
        const resNew = await fetch(`${API_BASE_URL}/users/nasabah`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataNew = await resNew.json();
        if (resNew.ok) setNasabah(dataNew.users || []);
      } else {
        toast.error(data.message || "Gagal update status");
      }
    } catch {
      toast.error("Terjadi kesalahan saat update status");
    } finally {
      setProcessing((prev) => {
        const newSet = new Set(prev);
        newSet.delete(uid);
        return newSet;
      });
    }
  };

  // 🔹 Group data nasabah berdasarkan bank sampah
  const groupedNasabah = nasabah.reduce((acc, cur) => {
    let bank = cur.bankSampah || "Lainnya";
    // Rapikan tampilan nama bank: underscore -> spasi, kapital awal
    bank = bank
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    if (!acc[bank]) acc[bank] = [];
    acc[bank].push(cur);
    return acc;
  }, {});

  // 🔹 Filter nasabah berdasarkan pencarian
  const filteredGroupedNasabah = Object.keys(groupedNasabah).reduce(
    (acc, bank) => {
      const filtered = groupedNasabah[bank].filter((n) =>
        n.name.toLowerCase().includes(search.toLowerCase())
      );
      if (filtered.length > 0) acc[bank] = filtered;
      return acc;
    },
    {}
  );

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600 text-xl">
        Memuat data nasabah...
      </div>
    );

  if (nasabah.length === 0)
    return (
      <div className="p-10 text-center text-gray-600 text-xl">
        Belum ada nasabah terdaftar.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-[80vh] font-sans">
      {/* Pencarian */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari nama nasabah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {Object.entries(filteredGroupedNasabah).map(([bankName, nasabahList]) => (
        <section
          key={bankName}
          className="mb-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
            Bank Sampah: {bankName} ({nasabahList.length} Nasabah)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-700">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-4 border-b-2 border-gray-200 w-16">No</th>
                  <th className="p-4 border-b-2 border-gray-200">Nama</th>
                  <th className="p-4 border-b-2 border-gray-200">Email</th>
                  <th className="p-4 border-b-2 border-gray-200 text-center w-28">
                    Status
                  </th>
                  <th className="p-4 border-b-2 border-gray-200 text-center w-48">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {nasabahList.map((n, idx) => (
                  <tr
                    key={n.id}
                    className={`transition-colors duration-200 ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-100`}
                  >
                    <td className="p-4">{idx + 1}</td>
                    <td className="p-4">{n.name}</td>
                    <td className="p-4">{n.email}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          n.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {n.status.charAt(0).toUpperCase() + n.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-2">
                      {n.status !== "active" && (
                        <Button
                          color="bg-green-600"
                          onClick={() => updateStatus(n.id, "active")}
                          disabled={processing.has(n.id)}
                        >
                          Approve
                        </Button>
                      )}
                      {n.status === "active" && (
                        <Button
                          color="bg-red-600"
                          onClick={() => updateStatus(n.id, "suspend")}
                          disabled={processing.has(n.id)}
                        >
                          Suspend
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ManajemenNasabah;
