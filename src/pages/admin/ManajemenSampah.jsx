import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";
import { useAppContext } from "../../AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Komponen tombol aksi reusable
const ActionButton = ({ onClick, children, color = "#007bff", title }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      cursor: "pointer",
      backgroundColor: color,
      border: "none",
      borderRadius: 4,
      padding: "6px 12px",
      color: "#fff",
      margin: "0 4px",
      fontWeight: "bold",
      boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
      transition: "background-color 0.3s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = color)}
  >
    {children}
  </button>
);

const ManajemenSampah = () => {
  const { token } = useAppContext();
  const [sampah, setSampah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [editId, setEditId] = useState(null);

  const [showHargaModal, setShowHargaModal] = useState(false);
  const [selectedSampah, setSelectedSampah] = useState(null);
  const [editHarga, setEditHarga] = useState({});

  // Ambil daftar harga bank sampah berdasarkan data
  const hargaKeys = React.useMemo(() => {
    if (sampah.length === 0) return [];
    const firstItem = sampah[0];
    if (firstItem.hargaPerBank) return Object.keys(firstItem.hargaPerBank);
    if (firstItem.harga && typeof firstItem.harga === "object") return Object.keys(firstItem.harga);
    if (firstItem.prices && typeof firstItem.prices === "object") return Object.keys(firstItem.prices);
    return [];
  }, [sampah]);

  // Fetch sampah (tidak diubah dari asal)
  const fetchSampah = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/sampah`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const list = Array.isArray(data) ? data : data.sampah || [];
        setSampah(list);
      } else {
        toast.error(data.message || "Gagal memuat data sampah");
      }
    } catch (err) {
      console.error("Error fetch sampah:", err);
      toast.error("Tidak bisa menghubungi server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSampah();
  }, []);

  // Handle form submit (tidak diubah)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama || !harga) return toast.error("Nama & Harga wajib diisi");
    try {
      const url = editId ? `${API_BASE_URL}/sampah/${editId}` : `${API_BASE_URL}/sampah`;
      const method = editId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nama, harga: Number(harga) }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(editId ? "Sampah diperbarui" : "Sampah ditambahkan");
        setNama("");
        setHarga("");
        setEditId(null);
        fetchSampah();
      } else {
        toast.error(data.message || "Gagal simpan data");
      }
    } catch (err) {
      console.error("Error simpan sampah:", err);
      toast.error("Terjadi kesalahan server");
    }
  };

  // Handle delete (tidak diubah)
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data sampah ini?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/sampah/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Sampah dihapus");
        fetchSampah();
      } else {
        toast.error(data.message || "Gagal hapus sampah");
      }
    } catch (err) {
      console.error("Error hapus sampah:", err);
      toast.error("Terjadi kesalahan saat hapus sampah");
    }
  };

  // Handle edit sampah, isi form tambah/edit
  const handleEdit = (item) => {
    setEditId(item.id || item.idSampah);
    setNama(item.nama || item.namaSampah || "");
    setHarga(item.harga || 0);
  };

  // Open modal edit harga per bank dengan state terisi
  const openHargaModal = (item) => {
    setSelectedSampah(item);
    let hargaObj = {};
    if (item.hargaPerBank) hargaObj = item.hargaPerBank;
    else if (item.harga) hargaObj = item.harga;
    else if (item.prices) hargaObj = item.prices;
    setEditHarga(hargaObj || {});
    setShowHargaModal(true);
  };

  // Simpan harga per bank hasil edit
  const saveHarga = async () => {
    if (!selectedSampah) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/sampah/${selectedSampah.id || selectedSampah.idSampah}/harga`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ harga: editHarga }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Harga per bank berhasil diperbarui");
        setShowHargaModal(false);
        setSelectedSampah(null);
        fetchSampah();
      } else {
        toast.error(data.message || "Gagal update harga");
      }
    } catch (err) {
      console.error("Error update harga:", err);
      toast.error("Terjadi kesalahan server");
    }
  };

  if (loading) return <div>Loading data sampah...</div>;

  return (
    <div style={{ maxWidth: 960, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Manajemen Sampah</h2>

      {/* Form tambah/edit */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Nama Sampah"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          style={{ padding: 8, fontSize: 16, width: 250, marginRight: 10, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="number"
          placeholder="Harga (Rp)"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          style={{ padding: 8, fontSize: 16, width: 150, marginRight: 10, borderRadius: 4, border: "1px solid #ccc" }}
          min="0"
        />
        <button
          type="submit"
          style={{
            padding: "8px 20px",
            fontSize: 16,
            backgroundColor: "#28a745",
            color: "#fff",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
        >
          {editId ? "Update Sampah" : "Tambah Sampah"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setNama("");
              setHarga("");
            }}
            style={{
              marginLeft: 10,
              padding: "8px 20px",
              fontSize: 16,
              backgroundColor: "#6c757d",
              color: "#fff",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
            }}
          >
            Batal
          </button>
        )}
      </form>

      {/* Tabel data sampah */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 30,
          fontSize: 16,
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <th style={{ padding: "10px 8px", border: "1px solid #ddd" }}>ID Sampah</th>
            <th style={{ padding: "10px 8px", border: "1px solid #ddd" }}>Nama Sampah</th>
            {hargaKeys.map((key) => (
              <th
                key={key}
                style={{ padding: "10px 8px", border: "1px solid #ddd", minWidth: 120 }}
              >
                Harga {key}
              </th>
            ))}
            <th style={{ padding: "10px 8px", border: "1px solid #ddd" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sampah.map((s) => (
            <tr
              key={s.idSampah || s.id}
              style={{
                borderBottom: "1px solid #ddd",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {s.idSampah || s.id || "-"}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {s.namaSampah || s.nama}
              </td>
              {hargaKeys.map((key) => (
                <td
                  key={key}
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    fontWeight: "bold",
                    color: "#28a745",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#1e7e34")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#28a745")}
                >
                  Rp {s.hargaPerBank?.[key] || s.harga?.[key] || s.prices?.[key] || "-"}
                </td>
              ))}
              <td style={{ padding: "8px", border: "1px solid #ddd", whiteSpace: "nowrap" }}>
                <ActionButton onClick={() => handleEdit(s)} title="Edit Data Sampah">
                  Edit
                </ActionButton>
                <ActionButton
                  onClick={() => handleDelete(s.idSampah || s.id)}
                  color="#dc3545"
                  title="Hapus Data Sampah"
                >
                  Hapus
                </ActionButton>
                <ActionButton
                  onClick={() => openHargaModal(s)}
                  color="#17a2b8"
                  title="Edit Harga per Bank"
                >
                  Harga Per Bank
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Edit Harga */}
      {showHargaModal && selectedSampah && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowHargaModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              width: 400,
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            <h3>Edit Harga per Bank Sampah</h3>
            {hargaKeys.map((key) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <label
                  htmlFor={`harga-per-bank-${key}`}
                  style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}
                >
                  {key}
                </label>
                <input
                  id={`harga-per-bank-${key}`}
                  type="number"
                  min="0"
                  value={editHarga[key] || ""}
                  onChange={(e) =>
                    setEditHarga((prev) => ({
                      ...prev,
                      [key]: e.target.value === "" ? "" : Number(e.target.value),
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    fontSize: 16,
                  }}
                />
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <button
                onClick={() => setShowHargaModal(false)}
                style={{
                  marginRight: 10,
                  padding: "8px 16px",
                  borderRadius: 4,
                  border: "none",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
              <button
                onClick={saveHarga}
                style={{
                  padding: "8px 16px",
                  borderRadius: 4,
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ManajemenSampah;
