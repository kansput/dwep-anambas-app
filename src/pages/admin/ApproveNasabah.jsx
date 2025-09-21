import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";
import { useAppContext } from "../../AppContext";
import { toast, ToastContainer } from "react-toastify";

const ApproveNasabah = () => {
  const { token } = useAppContext();
  const [pendingNasabah, setPendingNasabah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState(new Set());

  // 🔹 Fetch pending nasabah
  const fetchPendingNasabah = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/admin/pending-nasabah`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Gagal memuat data nasabah pending");
      const data = await res.json();
      setPendingNasabah(data.users || []);
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Approve nasabah
  const handleApprove = async (id) => {
    if (!id) return toast.error("ID nasabah tidak valid");
    setProcessingIds((prev) => new Set([...prev, id]));

    try {
      const res = await fetch(`${API_BASE_URL}/auth/admin/approve-nasabah/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Gagal approve nasabah");
      toast.success("✅ Nasabah berhasil di-approve");
      fetchPendingNasabah();
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  // 🔹 Reject nasabah
  const handleReject = async (id) => {
    if (!window.confirm("Yakin ingin menolak nasabah ini?")) return;
    if (!id) return toast.error("ID nasabah tidak valid");
    setProcessingIds((prev) => new Set([...prev, id]));

    try {
      const res = await fetch(`${API_BASE_URL}/auth/admin/reject-nasabah/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Gagal menolak nasabah");
      toast.info("❌ Nasabah berhasil ditolak");
      fetchPendingNasabah();
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  useEffect(() => {
    fetchPendingNasabah();
  }, []);

  // 🔹 Loader
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          <p className="text-slate-600">Loading data nasabah pending...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Persetujuan Nasabah</h2>
        <p className="text-slate-600">Kelola persetujuan pendaftaran nasabah baru</p>
      </div>

      {/* Statistik */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl shadow-lg p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Nasabah Menunggu Persetujuan</h3>
            <p className="text-blue-100">Total nasabah yang menunggu review</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{pendingNasabah.length}</div>
            <div className="text-sm text-blue-100">Pendaftaran</div>
          </div>
        </div>
      </div>

      {/* Tabel */}
      {pendingNasabah.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Tidak Ada Nasabah Pending</h3>
          <p className="text-slate-500">Semua nasabah sudah di-review ✅</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">ID/UID</th>
                  <th className="px-6 py-4 text-left">Nama</th>
                  <th className="px-6 py-4 text-left">Kontak</th>
                  <th className="px-6 py-4 text-left">Bank Sampah</th>
                  <th className="px-6 py-4 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pendingNasabah.map((nasabah) => (
                  <tr key={nasabah.id}>
                    <td className="px-6 py-4 text-xs">
                      <div><strong>ID:</strong> {nasabah.id || "-"}</div>
                      <div><strong>UID:</strong> {nasabah.uid || "-"}</div>
                    </td>
                    <td className="px-6 py-4">{nasabah.name}</td>
                    <td className="px-6 py-4">
                      {nasabah.email} <br /> {nasabah.noTelp || "-"}
                    </td>
                    <td className="px-6 py-4">{nasabah.bankSampah || "-"}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleApprove(nasabah.id)}
                        disabled={processingIds.has(nasabah.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        {processingIds.has(nasabah.id) ? "Processing..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleReject(nasabah.id)}
                        disabled={processingIds.has(nasabah.id)}
                        className="ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                      >
                        {processingIds.has(nasabah.id) ? "Processing..." : "Reject"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveNasabah;
