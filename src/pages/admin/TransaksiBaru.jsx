import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../config/api";
import { useAppContext } from "../../AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransaksiBaru = () => {
  const { token } = useAppContext();

  const [nasabahList, setNasabahList] = useState([]);
  const [sampahList, setSampahList] = useState([]);
  const [wasteItems, setWasteItems] = useState([
    { wasteId: "", weight: 0, subtotal: 0, key: Math.random() },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);

  // 🔹 Fetch data nasabah & sampah
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsers = await fetch(`${API_BASE_URL}/users/nasabah`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersData = await resUsers.json();
        setNasabahList(usersData.users || []);

        const resSampah = await fetch(`${API_BASE_URL}/sampah`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sampahData = await resSampah.json();
        setSampahList(sampahData.sampah || []);
      } catch (err) {
        console.error("❌ Gagal fetch data:", err);
        toast.error("Gagal memuat data nasabah/sampah");
      }
    };
    fetchData();
  }, [token]);

  // 🔹 Cari harga sesuai bank
  const getHargaForBank = (sampah, bankName) => {
    if (!sampah || !sampah.hargaPerBank || !bankName) return 0;
    const targetKey = Object.keys(sampah.hargaPerBank).find(
      (k) => k.toLowerCase() === bankName.toLowerCase()
    );
    if (!targetKey) return 0;
    return sampah.hargaPerBank[targetKey] || 0;
  };

  // 🔹 Hitung subtotal & total
  const calculateTotals = (items, customer) => {
    if (!customer) return items;

    let total = 0;
    const updatedItems = items.map((item) => {
      const sampah = sampahList.find((s) => s.id === item.wasteId);
      const harga = getHargaForBank(sampah, customer.bankSampah);
      const berat = parseFloat(item.weight) || 0;
      const subtotal = harga * berat;
      total += subtotal;
      return { ...item, subtotal };
    });
    setGrandTotal(total);
    return updatedItems;
  };

  // 🔹 Perubahan item
  const handleItemChange = (key, field, value) => {
    let newItems = wasteItems.map((item) =>
      item.key === key ? { ...item, [field]: value } : item
    );
    newItems = calculateTotals(newItems, selectedCustomer);
    setWasteItems(newItems);
  };

  // 🔹 Tambah baris
  const handleAddItem = () => {
    setWasteItems([
      ...wasteItems,
      { wasteId: "", weight: 0, subtotal: 0, key: Math.random() },
    ]);
  };

  // 🔹 Hapus baris
  const handleRemoveItem = (keyToRemove) => {
    const newItems = wasteItems.filter((item) => item.key !== keyToRemove);
    setWasteItems(calculateTotals(newItems, selectedCustomer));
  };

  // 🔹 Pilih nasabah
  const handleCustomerSelect = (e) => {
    const nasabahId = e.target.value;
    const customer = nasabahList.find((c) => c.id === nasabahId);
    setSelectedCustomer(customer || null);
    setWasteItems([{ wasteId: "", weight: 0, subtotal: 0, key: Math.random() }]);
    setGrandTotal(0);
  };

  // 🔹 Submit transaksi
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomer)
      return toast.error("Silakan pilih nasabah terlebih dahulu.");
    if (
      wasteItems.length === 0 ||
      wasteItems.every((item) => !item.wasteId || item.weight <= 0)
    ) {
      return toast.error("Silakan isi data sampah yang disetor.");
    }

    try {
      const payload = {
        nasabahId: selectedCustomer.id,
        bankSampah: selectedCustomer.bankSampah,
        detailSampah: wasteItems.map((item) => ({
          idSampah: item.wasteId,
          berat: parseFloat(item.weight),
        })),
      };

      const res = await fetch(`${API_BASE_URL}/transactions/setor`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Gagal menyimpan transaksi");
      }

      toast.success("✅ Transaksi berhasil disimpan!");
      setSelectedCustomer(null);
      setWasteItems([{ wasteId: "", weight: 0, subtotal: 0, key: Math.random() }]);
      setGrandTotal(0);
    } catch (err) {
      toast.error(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Buat Transaksi Baru</h2>
          <p className="text-slate-500">Catat setoran sampah dari nasabah.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleFormSubmit}>
            {/* Customer */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-slate-800 mb-2">
                1. Pilih Nasabah
              </label>
              <select
                onChange={handleCustomerSelect}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                defaultValue=""
              >
                <option value="" disabled>
                  -- Pilih Nasabah --
                </option>
                {nasabahList.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name} ({n.bankSampah})
                  </option>
                ))}
              </select>
            </div>

            {/* Waste Items */}
            {selectedCustomer && (
              <div>
                <label className="block text-lg font-semibold text-slate-800 mb-2">
                  2. Input Data Sampah
                </label>
                <div className="space-y-4">
                  {wasteItems.map((item) => {
                    const sampah = sampahList.find((s) => s.id === item.wasteId);
                    const harga = getHargaForBank(
                      sampah,
                      selectedCustomer.bankSampah
                    );

                    return (
                      <div
                        key={item.key}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 p-4 rounded-lg"
                      >
                        <div className="col-span-12 md:col-span-5">
                          <label className="block text-sm font-medium text-slate-600 mb-1">
                            Jenis Sampah
                          </label>
                          <select
                            value={item.wasteId}
                            onChange={(e) =>
                              handleItemChange(item.key, "wasteId", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                          >
                            <option value="" disabled>
                              Pilih jenis sampah
                            </option>
                            {sampahList.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.nama}
                              </option>
                            ))}
                          </select>
                          {harga > 0 && (
                            <p className="text-xs text-slate-500 mt-1">
                              Harga: Rp {harga.toLocaleString("id-ID")} /kg
                            </p>
                          )}
                        </div>

                        <div className="col-span-6 md:col-span-2">
                          <label className="block text-sm font-medium text-slate-600 mb-1">
                            Berat
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={item.weight || ""}
                            onChange={(e) =>
                              handleItemChange(item.key, "weight", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="0.0"
                            required
                          />
                        </div>

                        <div className="col-span-6 md:col-span-2 flex items-end">
                          <span className="text-slate-500">Kg</span>
                        </div>

                        <div className="col-span-8 md:col-span-2">
                          <label className="block text-sm font-medium text-slate-600 mb-1">
                            Subtotal
                          </label>
                          <p className="text-lg font-semibold text-slate-800">
                            Rp {item.subtotal.toLocaleString("id-ID")}
                          </p>
                        </div>

                        <div className="col-span-4 md:col-span-1 flex justify-end">
                          {wasteItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.key)}
                              className="p-2 text-rose-500 hover:bg-rose-100 rounded-full"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="mt-4 flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
                >
                  ➕ Tambah Jenis Sampah
                </button>
              </div>
            )}

            {/* Summary */}
            <div className="border-t border-slate-200 mt-8 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-800">
                  Total Transaksi
                </span>
                <span className="text-2xl font-bold text-teal-600">
                  Rp {grandTotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="reset"
                onClick={() => {
                  setSelectedCustomer(null);
                  setWasteItems([
                    { wasteId: "", weight: 0, subtotal: 0, key: Math.random() },
                  ]);
                  setGrandTotal(0);
                }}
                className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-8 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg shadow-md shadow-teal-500/30 hover:shadow-lg"
              >
                Simpan Transaksi
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default TransaksiBaru;
