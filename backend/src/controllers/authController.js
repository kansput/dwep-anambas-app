import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/firebase.js";
import { logEvent } from "../utils/auditLogger.js";

// ============================
// Utility: Generate JWT
// ============================
const generateToken = (uid, role, email) => {
  return jwt.sign(
    { uid, role, email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
      issuer: "dwep-backend",
      audience: "dwep-app",
    }
  );
};

// ============================
// REGISTER USER
// ============================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, noTelp, bankSampah } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await db.collection("users").where("email", "==", email).get();
    if (!existingUser.empty) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRef = db.collection("users").doc();
    const newUser = {
      uid: userRef.id,
      name,
      email,
      password: hashedPassword, // ✅ Konsisten menggunakan 'password'
      role: role.toLowerCase(),
      noTelp: noTelp || null,
      bankSampah: bankSampah || null,
      status: role.toLowerCase() === "nasabah" ? "pending" : "active",
      createdAt: new Date().toISOString(),
    };

    await userRef.set(newUser);

    logEvent("REGISTER", { uid: userRef.id, email, role });

    return res.status(201).json({ message: "Registrasi berhasil, silakan login" });
  } catch (error) {
    console.error("❌ Register failed:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// ============================
// LOGIN USER
// ============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (snapshot.empty) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();

    // ✅ Support both 'password' and 'passwordHash' fields
    const passwordField = user.password || user.passwordHash || "";
    const isMatch = await bcrypt.compare(password, passwordField);
    if (!isMatch) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Akun belum aktif, hubungi admin" });
    }

    const accessToken = generateToken(userDoc.id, user.role, user.email);

    logEvent("LOGIN", { uid: userDoc.id, email: user.email, role: user.role });

    return res.json({
      message: "Login berhasil",
      accessToken,
      user: {
        id: userDoc.id,
        uid: user.uid, // ✅ Include uid in response
        name: user.name,
        email: user.email,
        role: user.role,
        bankSampah: user.bankSampah || null,
        noTelp: user.noTelp || null,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("❌ Login failed:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// ============================
// LOGIN GOOGLE
// ============================
export const loginWithGoogle = async (req, res) => {
  try {
    const { uid, email, name } = req.body;
    if (!uid || !email || !name) {
      return res.status(400).json({ message: "Data Google tidak lengkap" });
    }

    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    let role = "nasabah";
    let status = "pending";

    if (!userDoc.exists) {
      await userRef.set({
        uid,
        name,
        email,
        role,
        status,
        createdAt: new Date().toISOString(),
        emailVerified: true,
      });
      logEvent("REGISTER_GOOGLE", { uid, email });
    } else {
      const userData = userDoc.data();
      role = userData.role;
      status = userData.status;
    }

    if (status !== "active") {
      return res.status(403).json({ message: "Akun belum aktif, hubungi admin" });
    }

    const accessToken = generateToken(uid, role, email);

    return res.json({
      message: "Login Google berhasil",
      accessToken,
      user: { uid, name, email, role, status },
    });
  } catch (error) {
    console.error("❌ Login with Google failed:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// ============================
// LOGOUT
// ============================
export const logoutUser = async (req, res) => {
  try {
    logEvent("LOGOUT", { uid: req.user?.uid || req.user?.id });
    return res.json({ message: "Logout berhasil" });
  } catch (error) {
    console.error("❌ Logout failed:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// ============================
// GET PENDING NASABAH
// ============================
export const getPendingNasabah = async (req, res) => {
  try {
    const snapshot = await db
      .collection("users")
      .where("role", "==", "nasabah")
      .where("status", "==", "pending")
      .get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({ users });
  } catch (error) {
    console.error("❌ getPendingNasabah failed:", error);
    return res.status(500).json({ message: "Gagal mengambil data nasabah pending" });
  }
};

// ============================
// APPROVE NASABAH
// ============================
export const approveNasabah = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Approving nasabah with ID:", id); // Debug log
    console.log("🔍 Request user:", req.user); // Debug log for req.user structure
    
    if (!id) {
      return res.status(400).json({ message: "ID nasabah diperlukan" });
    }

    const userRef = db.collection("users").doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      console.log("❌ User not found:", id);
      return res.status(404).json({ message: "Nasabah tidak ditemukan" });
    }

    const userData = doc.data();
    console.log("📄 User data:", { role: userData.role, status: userData.status, email: userData.email });

    if (userData.role !== "nasabah") {
      return res.status(400).json({ message: "User ini bukan nasabah" });
    }

    if (userData.status === "active") {
      return res.status(400).json({ message: "Nasabah sudah aktif" });
    }

    // ✅ Update user status - req.user.id is set by middleware
    const approvedBy = req.user?.id || "admin";
    await userRef.update({
      status: "active",
      approvedAt: new Date().toISOString(),
      approvedBy: approvedBy,
    });

    console.log("✅ Successfully approved user:", id);

    logEvent("APPROVE_NASABAH", { 
      uid: id, 
      email: userData.email,
      approvedBy: approvedBy
    });

    return res.json({ 
      message: "Nasabah berhasil di-approve",
      data: {
        uid: id,
        status: "active",
        approvedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("❌ Approve nasabah failed:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      params: req.params,
      user: req.user
    });
    return res.status(500).json({ 
      message: "Gagal approve nasabah",
      error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error"
    });
  }
};

// ============================
// REJECT NASABAH
// ============================
export const rejectNasabah = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Rejecting nasabah with ID:", id); // Debug log
    console.log("🔍 Request user:", req.user); // Debug log for req.user structure
    
    if (!id) {
      return res.status(400).json({ message: "ID nasabah diperlukan" });
    }

    const userRef = db.collection("users").doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      console.log("❌ User not found:", id);
      return res.status(404).json({ message: "Nasabah tidak ditemukan" });
    }

    const userData = doc.data();
    console.log("📄 User data:", { role: userData.role, status: userData.status, email: userData.email });

    if (userData.role !== "nasabah") {
      return res.status(400).json({ message: "User ini bukan nasabah" });
    }

    // ✅ Update user status to rejected - req.user.id is set by middleware
    const rejectedBy = req.user?.id || "admin";
    await userRef.update({
      status: "rejected",
      rejectedAt: new Date().toISOString(),
      rejectedBy: rejectedBy,
    });

    console.log("✅ Successfully rejected user:", id);

    logEvent("REJECT_NASABAH", { 
      uid: id, 
      email: userData.email,
      rejectedBy: rejectedBy
    });

    return res.json({ 
      message: "Nasabah berhasil ditolak",
      data: {
        uid: id,
        status: "rejected",
        rejectedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("❌ Reject nasabah failed:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      params: req.params,
      user: req.user
    });
    return res.status(500).json({ 
      message: "Gagal menolak nasabah",
      error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error"
    });
  }
};