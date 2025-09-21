// src/models/auditLogModel.js
import { db } from "../config/firebase.js";

export const createAuditLog = async (logData) => {
  const newDoc = db.collection("auditLogs").doc();

  const data = {
    idLog: newDoc.id,
    action: logData.action,
    actorId: logData.actorId,
    actorName: logData.actorName,
    actorRole: logData.actorRole,
    targetId: logData.targetId || null,
    bankSampah: logData.bankSampah || null,
    timestamp: new Date().toISOString(),
    details: logData.details || {},
  };

  await newDoc.set(data);
  return data;
};

export const getLogsByBank = async (bankSampah) => {
  const snapshot = await db.collection("auditLogs").where("bankSampah", "==", bankSampah).get();
  return snapshot.docs.map((doc) => doc.data());
};

export const getLogsByUser = async (userId) => {
  const snapshot = await db.collection("auditLogs").where("actorId", "==", userId).get();
  return snapshot.docs.map((doc) => doc.data());
};
