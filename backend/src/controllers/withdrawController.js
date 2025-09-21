// src/controllers/withdrawController.js
import { db } from "../config/firebase.js";
import { getWithdrawByBank } from "../models/withdrawModel.js";
import { logEvent } from "../utils/auditLogger.js";

// @desc    Nasabah ajukan tarik saldo
// @route   POST /api/withdraw
export const requestWithdraw = async (req, res) => {
  try {
    const nasabahId = req.user.uid;
    const { amount } = req.body;
    const bankSampah = req.user.bankSampah;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Jumlah penarikan tidak valid" });
    }

    // cek saldo nasabah
    const userRef = db.collection("users").doc(nasabahId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "Nasabah tidak ditemukan" });
    }

    const balance = userDoc.data().balance || 0;
    if (balance < amount) {
      return res.status(400).json({ message: "Saldo tidak mencukupi" });
    }

    // buat dokumen withdraw dengan ID custom
    const withdrawRef = db.collection("withdraws").doc();
    const newWithdraw = {
      idWithdraw: withdrawRef.id,
      nasabahId,
      bankSampah,
      amount,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    await withdrawRef.set(newWithdraw);

    // Audit log
    await logEvent({
      action: "Request Withdraw",
      actor: { uid: req.user.uid, name: req.user.name, role: req.user.role },
      targetId: nasabahId,
      bankSampah,
      details: { amount, withdrawId: newWithdraw.idWithdraw },
    });

    res.status(201).json({
      message: "Permintaan tarik saldo berhasil diajukan",
      withdraw: newWithdraw,
    });
  } catch (error) {
    console.error("Error requestWithdraw:", error.message);
    res.status(500).json({ message: "Gagal mengajukan tarik saldo" });
  }
};

// @desc    Petugas/Admin lihat semua withdraw banknya
// @route   GET /api/withdraw/bank/:name
export const getBankWithdraws = async (req, res) => {
  try {
    const bankSampah = req.params.name;
    const withdraws = await getWithdrawByBank(bankSampah);
    res.status(200).json(withdraws);
  } catch (error) {
    console.error("Error getBankWithdraws:", error.message);
    res.status(500).json({ message: "Gagal mengambil data withdraw" });
  }
};

// @desc    Approve / Reject withdraw
// @route   PUT /api/withdraw/:id
export const approveWithdraw = async (req, res) => {
  try {
    const { status } = req.body; // "approved" atau "rejected"
    const withdrawId = req.params.id;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Status tidak valid" });
    }

    const withdrawRef = db.collection("withdraws").doc(withdrawId);
    const withdrawDoc = await withdrawRef.get();
    if (!withdrawDoc.exists) {
      return res.status(404).json({ message: "Withdraw tidak ditemukan" });
    }

    const withdraw = withdrawDoc.data();

    // hanya bisa approve/reject kalau dari bank sampah yang sama
    if (withdraw.bankSampah !== req.user.bankSampah && req.user.role !== "Admin") {
      return res.status(403).json({ message: "Anda tidak berhak memproses withdraw ini" });
    }

    // update status + waktu
    await withdrawRef.update({
      status,
      updatedAt: new Date().toISOString(),
    });

    if (status === "approved") {
      // kurangi saldo nasabah
      const userRef = db.collection("users").doc(withdraw.nasabahId);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res.status(404).json({ message: "Nasabah tidak ditemukan" });
      }

      const balance = userDoc.data().balance || 0;
      await userRef.update({
        balance: balance - withdraw.amount,
        updatedAt: new Date().toISOString(),
      });
    }

    // Audit log
    await logEvent({
      action: `Withdraw ${status}`,
      actor: { uid: req.user.uid, name: req.user.name, role: req.user.role },
      targetId: withdraw.nasabahId,
      bankSampah: withdraw.bankSampah,
      details: { amount: withdraw.amount, status, withdrawId },
    });

    res.status(200).json({
      message: `Withdraw ${status} berhasil`,
      withdraw: { ...withdraw, idWithdraw: withdrawId, status },
    });
  } catch (error) {
    console.error("Error approveWithdraw:", error.message);
    res.status(500).json({ message: "Gagal memproses withdraw" });
  }
};
