// src/controllers/userController.js
import { db } from "../config/firebase.js";
import { logEvent } from "../utils/auditLogger.js";

// 🔹 Ambil semua Nasabah
export const getAllNasabah = async (req, res) => {
  try {
    const snapshot = await db
      .collection("users")
      .where("role", "==", "nasabah")
      .get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({ users });
  } catch (error) {
    console.error("❌ getAllNasabah error:", error);
    return res.status(500).json({ message: "Gagal mengambil data nasabah" });
  }
};

// 🔹 Approve user (sudah ada dari kamu, aku biarkan utuh)
export const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const approver = req.user;

    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const userData = userDoc.data();

    if (userData.status === "active") {
      return res.status(400).json({ message: "User sudah aktif" });
    }

    if (approver.role.toLowerCase() === "admin") {
      await userDoc.ref.update({
        status: "active",
        approvedBy: approver.uid,
        approvedAt: new Date().toISOString(),
      });
    } else if (approver.role.toLowerCase() === "petugas") {
      if (userData.role.toLowerCase() !== "nasabah") {
        return res
          .status(403)
          .json({ message: "Petugas hanya bisa approve Nasabah" });
      }
      if (userData.bankSampah !== approver.bankSampah) {
        return res
          .status(403)
          .json({ message: "Nasabah bukan dari bank sampah Anda" });
      }

      await userDoc.ref.update({
        status: "active",
        approvedBy: approver.uid,
        approvedAt: new Date().toISOString(),
      });
    } else {
      return res
        .status(403)
        .json({ message: "Role Anda tidak berhak melakukan approval" });
    }

    await logEvent({
      action: "Approve User",
      actor: { uid: approver.uid, name: approver.name, role: approver.role },
      targetId: userId,
      bankSampah: approver.bankSampah,
      details: { approvedRole: userData.role },
    });

    res.json({ message: "User berhasil di-approve" });
  } catch (err) {
    console.error("Approve error:", err.message);
    res
      .status(500)
      .json({ message: "Gagal approve user", error: err.message });
  }
};
