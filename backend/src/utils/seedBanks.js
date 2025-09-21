import { db } from "../config/firebase.js";

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

async function seedBanks() {
  try {
    for (const bank of banks) {
      await db.collection("bankSampah").doc(bank.idBank).set(bank);
      console.log(`✅ Inserted: ${bank.nama}`);
    }
    console.log("🎉 Semua bank sampah berhasil dimasukkan!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding bank sampah:", err);
    process.exit(1);
  }
}

seedBanks();
