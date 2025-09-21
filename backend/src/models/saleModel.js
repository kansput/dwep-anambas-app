// src/models/saleModel.js
import { db } from "../config/firebase.js";

export const createSale = async (data) => {
  const newDoc = db.collection("sales").doc();

  const saleData = {
    idSale: newDoc.id,
    bankSampah: data.bankSampah,
    petugasId: data.petugasId,
    pengepul: data.pengepul,
    detailSampah: data.detailSampah, // array sampah yg dijual
    grandTotal: data.grandTotal,
    createdAt: new Date().toISOString(),
  };

  await newDoc.set(saleData);
  return saleData;
};

export const getSalesByBank = async (bankSampah) => {
  const snapshot = await db.collection("sales").where("bankSampah", "==", bankSampah).get();
  return snapshot.docs.map((doc) => doc.data());
};
