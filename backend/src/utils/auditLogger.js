// src/utils/auditLogger.js
import { createAuditLog } from "../models/auditLogModel.js";

export const logEvent = async ({ action, actor, targetId, bankSampah, details }) => {
  try {
    await createAuditLog({
      action,
      actorId: actor?.uid || "Unknown",
      actorName: actor?.name || "Unknown",   // ✅ fallback biar nggak undefined
      actorRole: actor?.role || "Unknown",
      targetId: targetId || null,
      bankSampah: bankSampah || null,
      details: details || {},
    });
  } catch (error) {
    console.error("Audit log error:", error.message);
  }
};
