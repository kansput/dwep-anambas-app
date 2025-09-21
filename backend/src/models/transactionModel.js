// src/models/transactionModel.js
import { db } from "../config/firebase.js";

export const createTransaction = async (data) => {
  const newDoc = db.collection("transactions").doc();

  const transactionData = {
    idTransaksi: newDoc.id,
    nasabahId: data.nasabahId,
    petugasId: data.petugasId,
    bankSampah: data.bankSampah,
    detailSampah: data.detailSampah,   // array sampah
    grandTotal: data.grandTotal,
    status: "success",
    createdAt: new Date().toISOString(),
  };

  await newDoc.set(transactionData);
  return transactionData;
};

export const getTransactionsByNasabah = async (nasabahId) => {
  const snapshot = await db
    .collection("transactions")
    .where("nasabahId", "==", nasabahId)
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

export const getTransactionsByBank = async (bankSampah) => {
  const snapshot = await db
    .collection("transactions")
    .where("bankSampah", "==", bankSampah)
    .get();

  return snapshot.docs.map((doc) => doc.data());
};
