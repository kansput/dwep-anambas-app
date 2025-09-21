// src/controllers/transactionController.js
import { db } from "../config/firebase.js";
import {
  createTransaction,
  getTransactionsByNasabah,
  getTransactionsByBank,
} from "../models/transactionModel.js";
import { getSampahById } from "../models/sampahModel.js";
import { logEvent } from "../utils/auditLogger.js";

// @desc    Setor sampah (Petugas/Admin input)
// @route   POST /api/transactions/setor
export const setorSampah = async (req, res) => {
  try {
    const { nasabahId, detailSampah } = req.body;
    const petugasId = req.user.uid;

    // ✅ Tentukan bankSampah
    let bankSampah = req.user.bankSampah;
    if (req.user.role.toLowerCase() === "admin") {
      bankSampah = req.body.bankSampah;
      if (!bankSampah) {
        return res.status(400).json({
          message: "Admin wajib memilih bank sampah untuk transaksi",
        });
      }
    }

    if (!nasabahId || !detailSampah || detailSampah.length === 0) {
      return res.status(400).json({ message: "Data transaksi tidak lengkap" });
    }

    // Hitung total
    let grandTotal = 0;
    const detail = [];

    for (let item of detailSampah) {
      const sampah = await getSampahById(item.idSampah);
      if (!sampah) {
        return res.status(404).json({
          message: `Sampah dengan ID ${item.idSampah} tidak ditemukan`,
        });
      }

      // ✅ Ambil harga sesuai bank sampah (ignore case)
      const hargaPerKg = Object.entries(sampah.hargaPerBank || {}).find(
        ([key]) => key.toLowerCase() === bankSampah.toLowerCase()
      )?.[1];

      if (!hargaPerKg) {
        return res.status(400).json({
          message: `Harga untuk sampah ${sampah.namaSampah} belum ditetapkan di bank ${bankSampah}`,
        });
      }

      const total = item.berat * hargaPerKg;
      grandTotal += total;

      detail.push({
        idSampah: sampah.idSampah,
        namaSampah: sampah.namaSampah,
        berat: item.berat,
        hargaPerKg,
        total,
      });
    }

    // Simpan transaksi
    const newTransaction = await createTransaction({
      nasabahId,
      petugasId,
      bankSampah,
      detailSampah: detail,
      grandTotal,
    });

    // Update saldo nasabah
    const userRef = db.collection("users").doc(nasabahId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "Nasabah tidak ditemukan" });
    }

    const currentBalance = userDoc.data().balance || 0;
    await userRef.update({
      balance: currentBalance + grandTotal,
      updatedAt: new Date().toISOString(),
    });

    // Audit log
    await logEvent({
      action: "Setor Sampah",
      actor: { uid: req.user.uid, name: req.user.name, role: req.user.role },
      targetId: nasabahId,
      bankSampah,
      details: { grandTotal, detailSampah: detail },
    });

    return res.status(201).json({
      message: "Transaksi setor berhasil",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("❌ Error setorSampah:", error.message);
    return res.status(500).json({ message: "Gagal melakukan transaksi" });
  }
};

// @desc    Riwayat transaksi nasabah
// @route   GET /api/transactions/nasabah/:id
export const getNasabahTransactions = async (req, res) => {
  try {
    const nasabahId = req.params.id;
    const transactions = await getTransactionsByNasabah(nasabahId);
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("❌ Error getNasabahTransactions:", error.message);
    return res.status(500).json({ message: "Gagal mengambil transaksi nasabah" });
  }
};

// @desc    Riwayat transaksi bank sampah (Petugas/Admin)
// @route   GET /api/transactions/bank/:name
export const getBankTransactions = async (req, res) => {
  try {
    const bankSampah = req.params.name;
    const transactions = await getTransactionsByBank(bankSampah);
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("❌ Error getBankTransactions:", error.message);
    return res.status(500).json({ message: "Gagal mengambil transaksi bank" });
  }
};
