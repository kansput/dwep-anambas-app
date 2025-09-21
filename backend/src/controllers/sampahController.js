import { db } from "../config/firebase.js";

// 🔹 Normalisasi hargaPerBank → selalu jadi object { bankName: harga }
const normalizeHargaPerBank = (hargaPerBank) => {
  if (Array.isArray(hargaPerBank)) {
    return hargaPerBank.reduce((acc, item) => {
      if (item.bank && item.harga !== undefined) {
        acc[item.bank] = item.harga;
      }
      return acc;
    }, {});
  }
  return hargaPerBank || {};
};

// 🔹 Ambil semua sampah
export const getSampah = async (req, res) => {
  try {
    const snapshot = await db.collection("sampah").get();

    const sampah = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        nama: data.namaSampah || data.nama || "Tanpa Nama",
        klasifikasi: data.klasifikasi || "-",
        jenis: data.jenis || "-",
        kategori: data.kategori || "-",
        contohProduk: data.contohProduk || "-",
        hargaPerBank: normalizeHargaPerBank(data.hargaPerBank),
      };
    });

    res.status(200).json({ sampah });
  } catch (error) {
    console.error("Error getSampah:", error);
    res.status(500).json({ message: "Gagal mengambil data sampah" });
  }
};

// 🔹 Ambil detail sampah by ID
export const getSampahDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.collection("sampah").doc(id).get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: "Sampah tidak ditemukan" });
    }

    const data = snapshot.data();
    res.json({
      id: snapshot.id,
      nama: data.namaSampah || data.nama || "Tanpa Nama",
      klasifikasi: data.klasifikasi || "-",
      jenis: data.jenis || "-",
      kategori: data.kategori || "-",
      contohProduk: data.contohProduk || "-",
      hargaPerBank: normalizeHargaPerBank(data.hargaPerBank),
    });
  } catch (error) {
    console.error("Error getSampahDetail:", error);
    res.status(500).json({ message: "Gagal mengambil detail sampah" });
  }
};

// 🔹 Tambah sampah baru
export const createSampah = async (req, res) => {
  try {
    const { nama, klasifikasi, jenis, kategori, contohProduk, hargaPerBank } = req.body;

    if (!nama) {
      return res.status(400).json({ message: "Nama sampah wajib diisi" });
    }

    const newDoc = await db.collection("sampah").add({
      namaSampah: nama,
      klasifikasi: klasifikasi || "-",
      jenis: jenis || "-",
      kategori: kategori || "-",
      contohProduk: contohProduk || "-",
      hargaPerBank: normalizeHargaPerBank(hargaPerBank),
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: "Sampah berhasil ditambahkan", id: newDoc.id });
  } catch (error) {
    console.error("Error createSampah:", error);
    res.status(500).json({ message: "Gagal menambahkan sampah" });
  }
};

// 🔹 Update sampah
export const updateSampah = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, klasifikasi, jenis, kategori, contohProduk, hargaPerBank } = req.body;

    const docRef = db.collection("sampah").doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: "Sampah tidak ditemukan" });
    }

    await docRef.update({
      ...(nama && { namaSampah: nama }),
      ...(klasifikasi && { klasifikasi }),
      ...(jenis && { jenis }),
      ...(kategori && { kategori }),
      ...(contohProduk && { contohProduk }),
      ...(hargaPerBank && { hargaPerBank: normalizeHargaPerBank(hargaPerBank) }),
      updatedAt: new Date().toISOString(),
    });

    res.json({ message: "Sampah berhasil diperbarui" });
  } catch (error) {
    console.error("Error updateSampah:", error);
    res.status(500).json({ message: "Gagal memperbarui sampah" });
  }
};

// 🔹 Hapus sampah
export const deleteSampah = async (req, res) => {
  try {
    const { id } = req.params;

    const docRef = db.collection("sampah").doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: "Sampah tidak ditemukan" });
    }

    await docRef.delete();

    res.json({ message: "Sampah berhasil dihapus" });
  } catch (error) {
    console.error("Error deleteSampah:", error);
    res.status(500).json({ message: "Gagal menghapus sampah" });
  }
};
