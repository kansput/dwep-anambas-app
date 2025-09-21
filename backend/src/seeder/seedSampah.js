import { db } from "../config/firebase.js";

const sampahBatch1 = [
  {
    idSampah: "S01",
    namaSampah: "BOTOL A",
    klasifikasi: "Botol Plastik",
    jenis: "Botol Mineral",
    kategori: "PET (1)",
    contohProduk:
      "Aqua, Ades, Le Mineral, Cleo, Bestari, Frestine, Club, Nestle Pure Life, Amidis, sanford dll",
    hargaPerBank: {
      MATAK_Baling: 1000,
      MATAK_BankSampah: 1500,
      Jemaja_Baling: 1000,
      Kuala_Maras_PDU: 1200,
      Landak_BankSampah: 1000,
      Kiabu_PDU: 1000,
      Telaga_Besar_BankSampah: 1200,
      Telaga_Kecil_BankSampah: 1200,
      Piasan_BankSampah: null,
    },
  },
  {
    idSampah: "S02",
    namaSampah: "BOTOL B",
    klasifikasi: "Botol Plastik",
    jenis: "Botol Minuman Ringan Bening Kelas 1",
    kategori: "PET (1)",
    contohProduk:
      "Cocacola, Pepsi, Sprite bening, Fanta, Bigcola, Pocari Sweat, Teh Pucuk, Tebs, Lasegar dll",
    hargaPerBank: {
      MATAK_Baling: 1000,
      MATAK_BankSampah: 1500,
      Jemaja_Baling: 1000,
      Kuala_Maras_PDU: 1200,
      Landak_BankSampah: 1200,
      Kiabu_PDU: 1000,
      Telaga_Besar_BankSampah: 1200,
      Telaga_Kecil_BankSampah: 1200,
      Piasan_BankSampah: null,
    },
  },
  {
    idSampah: "S03",
    namaSampah: "BOTOL C",
    klasifikasi: "Botol Plastik",
    jenis: "Botol Minuman Ringan Bening Kelas 2",
    kategori: "PET (1)",
    contohProduk:
      "Lasegar, Cap Badak, Cap Kaki Tiga, Botol dengan Label Kertas dan sejenisnya",
    hargaPerBank: {
      MATAK_Baling: 700,
      MATAK_BankSampah: 900,
      Jemaja_Baling: 500,
      Kuala_Maras_PDU: 700,
      Landak_BankSampah: 700,
      Kiabu_PDU: 700,
      Telaga_Besar_BankSampah: 800,
      Telaga_Kecil_BankSampah: 800,
      Piasan_BankSampah: null,
    },
  },
  {
    idSampah: "S04",
    namaSampah: "BOTOL D",
    klasifikasi: "Botol Plastik",
    jenis: "Botol Minuman Warna",
    kategori: "PET (1)",
    contohProduk: "Mizone, Nipis Madu, Sprit Hijau dan sejenisnya",
    hargaPerBank: {
      MATAK_Baling: 600,
      MATAK_BankSampah: 800,
      Jemaja_Baling: 600,
      Kuala_Maras_PDU: 1000,
      Landak_BankSampah: 1000,
      Kiabu_PDU: 400,
      Telaga_Besar_BankSampah: 500,
      Telaga_Kecil_BankSampah: 500,
      Piasan_BankSampah: null,
    },
  },
  {
    idSampah: "S05",
    namaSampah: "BOTOL E",
    klasifikasi: "Botol Plastik",
    jenis: "Botol Kecap/Bumbu",
    kategori: "PET (1)",
    contohProduk: "Botol Kecap, botol sambal, botol cuka aneka brand",
    hargaPerBank: {
      MATAK_Baling: 500,
      MATAK_BankSampah: 700,
      Jemaja_Baling: 500,
      Kuala_Maras_PDU: 700,
      Landak_BankSampah: 700,
      Kiabu_PDU: 500,
      Telaga_Besar_BankSampah: 500,
      Telaga_Kecil_BankSampah: 500,
      Piasan_BankSampah: null,
    },
  },
  {
    idSampah: "S06",
    namaSampah: "GELAS PLASTIK",
    klasifikasi: "Gelas Plastik",
    jenis: "Gelas Bening dan Warna",
    kategori: "PP (5)",
    contohProduk:
      "Aqua, Hanqua, Mountea, Teh Pucuk, The Rio, Panther, ale-ale, okky/vita jelly drink, cup plastik dll",
    hargaPerBank: {
      MATAK_Baling: 500,
      MATAK_BankSampah: 700,
      Jemaja_Baling: 700,
      Kuala_Maras_PDU: 1200,
      Landak_BankSampah: 1000,
      Kiabu_PDU: 500,
      Telaga_Besar_BankSampah: 500,
      Telaga_Kecil_BankSampah: 500,
      Piasan_BankSampah: null,
    },
  },
  {
    idSampah: "S07",
    namaSampah: "EMBER BENING",
    klasifikasi: "Botol Plastik",
    jenis: "Botol Bening diluar minuman",
    kategori: "PET (1)",
    contohProduk:
      "Botol dan Jerigen Minyak Goreng Bening berbagai brand, Listerin",
    hargaPerBank: {
      MATAK_Baling: 500,
      MATAK_BankSampah: 700,
      Jemaja_Baling: 500,
      Kuala_Maras_PDU: 700,
      Landak_BankSampah: 700,
      Kiabu_PDU: 500,
      Telaga_Besar_BankSampah: 500,
      Telaga_Kecil_BankSampah: 500,
      Piasan_BankSampah: null,
    },
  },
  {
    idSampah: "S08",
    namaSampah: "TUTUP BOTOL",
    klasifikasi: "Plastik Emberan",
    jenis: "Tutup Botol, Tutup Galon",
    kategori: "PET (1), PP",
    contohProduk: "Semua Jenis Tutup Botol dan Tutup Galon",
    hargaPerBank: {
      MATAK_Baling: 1000,
      MATAK_BankSampah: 1200,
      Jemaja_Baling: 700,
      Kuala_Maras_PDU: 1000,
      Landak_BankSampah: 1000,
      Kiabu_PDU: 700,
      Telaga_Besar_BankSampah: 1000,
      Telaga_Kecil_BankSampah: 1000,
      Piasan_BankSampah: null,
    },
  },
  {
    idSampah: "S09",
    namaSampah: "EMBER MINYAK A",
    klasifikasi: "Plastik Emberan",
    jenis: "Jerigen Minyak Goreng Putih gading/tulang",
    kategori: "HDPE (2)",
    contohProduk:
      "Bimoli, Sunco, Fortune, Majuan, Rose Brand, Sania, Tropical, Sovia, Filma, dll",
    hargaPerBank: {
      MATAK_Baling: 700,
      MATAK_BankSampah: 1000,
      Jemaja_Baling: 900,
      Kuala_Maras_PDU: 1200,
      Landak_BankSampah: 1200,
      Kiabu_PDU: 1000,
      Telaga_Besar_BankSampah: 500,
      Telaga_Kecil_BankSampah: 500,
      Piasan_BankSampah: null,
    },
  },
  {
    idSampah: "S10",
    namaSampah: "EMBER MINYAK B",
    klasifikasi: "Plastik Emberan",
    jenis: "Jerigen Minyak Goreng Kuning",
    kategori: "HDPE (2)",
    contohProduk: "Minyak Kita dan sejenisnya",
    hargaPerBank: {
      MATAK_Baling: 500,
      MATAK_BankSampah: 700,
      Jemaja_Baling: 500,
      Kuala_Maras_PDU: 1200,
      Landak_BankSampah: 1000,
      Kiabu_PDU: 1000,
      Telaga_Besar_BankSampah: 500,
      Telaga_Kecil_BankSampah: 500,
      Piasan_BankSampah: null,
    },
  },
];

const seedSampahBatch1 = async () => {
  try {
    for (const item of sampahBatch1) {
      await db.collection("sampah").doc(item.idSampah).set(item);
      console.log(`✅ Sampah ${item.namaSampah} berhasil dimasukkan`);
    }
    console.log("=== Batch 1 selesai dimasukkan ke Firestore ===");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding Batch 1:", err);
    process.exit(1);
  }
};

seedSampahBatch1();
