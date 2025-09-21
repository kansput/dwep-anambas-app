// src/models/sampahModel.js
import { db } from "../config/firebase.js";

// Tambah data sampah baru
export const createSampah = async (sampahData) => {
  const newDoc = db.collection("sampah").doc();

const data = {
  idSampah: newDoc.id,
  namaSampah: sampahData.namaSampah,   // Botol Aqua 600ml
  jenisSampah: sampahData.jenisSampah, // Plastik
  kategori: sampahData.kategori,       // Anorganik
  satuan: sampahData.satuan || "kg",   // default kg
  hargaBeli: sampahData.hargaBeli,
  status: sampahData.status || "aktif",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};


  await newDoc.set(data);
  return data;
};

// Ambil semua data sampah
export const getAllSampah = async () => {
  const snapshot = await db.collection("sampah").get();
  return snapshot.docs.map((doc) => doc.data());
};

// Ambil satu data sampah berdasarkan ID
export const getSampahById = async (id) => {
  const doc = await db.collection("sampah").doc(id).get();
  if (!doc.exists) return null;
  return doc.data();
};

// Update data sampah
export const updateSampah = async (id, updateData) => {
  const docRef = db.collection("sampah").doc(id);

  await docRef.update({
    ...updateData,
    updatedAt: new Date().toISOString(),
  });

  const updatedDoc = await docRef.get();
  return updatedDoc.data();
};

// Hapus data sampah
export const deleteSampah = async (id) => {
  const docRef = db.collection("sampah").doc(id);
  await docRef.delete();
  return { message: "Sampah berhasil dihapus" };
};
