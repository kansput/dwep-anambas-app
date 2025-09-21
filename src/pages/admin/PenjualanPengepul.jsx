import React, { useEffect, useMemo, useState } from "react";

const makeKey = () => `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

const PenjualanPengepul = () => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [sampahList, setSampahList] = useState([]); // [{idSampah, namaSampah}]
  const [formData, setFormData] = useState({
    collectorName: "",
    items: [{ wasteId: "", weight: "", key: makeKey() }],
    totalPayment: "",
  });

  // Fallback minimal dari seed (kalau API kosong/error)
  const fallbackSampah = useMemo(
    () => [
      { idSampah: "S01", namaSampah: "BOTOL A" },
      { idSampah: "S02", namaSampah: "BOTOL B" },
      { idSampah: "S03", namaSampah: "BOTOL C" },
      { idSampah: "S04", namaSampah: "BOTOL D" },
      { idSampah: "S05", namaSampah: "BOTOL E" },
      { idSampah: "S06", namaSampah: "GELAS PLASTIK" },
      { idSampah: "S07", namaSampah: "EMBER BENING" },
      { idSampah: "S08", namaSampah: "TUTUP BOTOL" },
      { idSampah: "S09", namaSampah: "EMBER MINYAK A" },
      { idSampah: "S10", namaSampah: "EMBER MINYAK B" },
    ],
    []
  );

  // Normalizer: terima berbagai bentuk respons API
  const normalizeSampah = (raw) => {
    const arr =
      Array.isArray(raw) ? raw :
      Array.isArray(raw?.data) ? raw.data :
      Array.isArray(raw?.items) ? raw.items :
      [];
    return arr
      .map((x) => ({
        idSampah: x.idSampah ?? x.id ?? x._id ?? "",
        namaSampah: x.namaSampah ?? x.nama ?? x.name ?? "",
      }))
      .filter((x) => x.idSampah && x.namaSampah);
  };

  useEffect(() => {
    const fetchSampah = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const token = localStorage.getItem("token");
        const resp = await fetch("/api/sampah", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const json = await resp.json().catch(() => ({}));
        const list = normalizeSampah(json);
        setSampahList(list.length ? list : fallbackSampah);
        if (!list.length) setLoadError("Daftar sampah dari server kosong, pakai fallback seed.");
      } catch (e) {
        setSampahList(fallbackSampah);
        setLoadError("Gagal memuat dari server, pakai fallback seed.");
      } finally {
        setLoading(false);
      }
    };
    fetchSampah();
  }, [fallbackSampah]);

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { wasteId: "", weight: "", key: makeKey() }],
    }));
  };

  const handleRemoveItem = (key) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.key !== key),
    }));
  };

  const handleItemChange = (key, field, value) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.key === key ? { ...i, [field]: value } : i)),
    }));
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      pengepul: formData.collectorName,
      detailSampah: formData.items
        .filter((i) => i.wasteId && Number(i.weight) > 0)
        .map((i) => ({ idSampah: i.wasteId, berat: Number(i.weight) })),
      totalPayment: Number(formData.totalPayment),
    };

    if (!payload.pengepul) return alert("Nama pengepul harus diisi.");
    if (!payload.detailSampah.length) return alert("Pilih minimal 1 sampah & berat > 0.");
    if (!payload.totalPayment || payload.totalPayment <= 0) return alert("Total pembayaran wajib diisi.");

    try {
      const token = localStorage.getItem("token");
      const resp = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || "Gagal menyimpan");
      alert("✅ Penjualan ke pengepul berhasil disimpan!");
      setFormData({ collectorName: "", items: [{ wasteId: "", weight: "", key: makeKey() }], totalPayment: "" });
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm border border-slate-200 rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-4">Penjualan ke Pengepul</h2>

      {loading ? (
        <p>Memuat daftar sampah…</p>
      ) : (
        <>
          {loadError && <p className="text-amber-600 mb-4">{loadError}</p>}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Nama Pengepul</label>
              <input
                name="collectorName"
                value={formData.collectorName}
                onChange={handleFieldChange}
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="cth: Pengepul Maju Jaya"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rincian Sampah</label>
              {formData.items.map((item) => (
                <div key={item.key} className="grid grid-cols-12 gap-3 mb-3">
                  <div className="col-span-7">
                    <select
                      value={item.wasteId}
                      onChange={(e) => handleItemChange(item.key, "wasteId", e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      required
                    >
                      <option value="">-- Pilih jenis sampah --</option>
                      {sampahList.map((s) => (
                        <option key={s.idSampah} value={s.idSampah}>
                          {s.namaSampah}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-4">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.weight}
                      onChange={(e) => handleItemChange(item.key, "weight", e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Berat (kg)"
                      required
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    {formData.items.length > 1 && (
                      <button type="button" onClick={() => handleRemoveItem(item.key)} className="text-rose-600">
                        Hapus
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button type="button" onClick={handleAddItem} className="mt-2 text-teal-600 font-semibold">
                + Tambah Item
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium">Total Pembayaran dari Pengepul</label>
              <input
                type="number"
                name="totalPayment"
                value={formData.totalPayment}
                onChange={handleFieldChange}
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="cth: 150000"
                required
              />
            </div>

            <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded font-semibold">
              Simpan Penjualan
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PenjualanPengepul;
