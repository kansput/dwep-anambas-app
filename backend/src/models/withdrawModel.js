// src/models/withdrawModel.js
import { db } from "../config/firebase.js";

export const createWithdrawRequest = async (data) => {
  const newDoc = db.collection("withdraws").doc();

  const withdrawData = {
    idWithdraw: newDoc.id,
    nasabahId: data.nasabahId,
    bankSampah: data.bankSampah,
    amount: data.amount,
    status: "pending", // default
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await newDoc.set(withdrawData);
  return withdrawData;
};

export const getWithdrawByBank = async (bankSampah) => {
  const snapshot = await db.collection("withdraws").where("bankSampah", "==", bankSampah).get();
  return snapshot.docs.map((doc) => doc.data());
};

export const updateWithdrawStatus = async (id, updateData) => {
  const docRef = db.collection("withdraws").doc(id);
  await docRef.update({
    ...updateData,
    updatedAt: new Date().toISOString(),
  });

  const updatedDoc = await docRef.get();
  return updatedDoc.data();
};
