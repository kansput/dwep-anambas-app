// src/config/firebase.js
import admin from "firebase-admin";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get current directory untuk ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db, adminAuth;

try {
  // Path ke serviceAccountKey.json
  const serviceAccountPath = join(__dirname, "../../serviceAccountKey.json");
  console.log("Looking for service account at:", serviceAccountPath);

  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
  console.log("Service account loaded for project:", serviceAccount.project_id);

  // Init Firebase Admin SDK
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("🔥 Firebase Admin SDK initialized");
  }

  db = admin.firestore();
  adminAuth = admin.auth();

  console.log("✅ Firebase Admin SDK ready to use");
} catch (error) {
  console.error("❌ Firebase initialization error:");
  console.error("Error type:", error.constructor.name);
  console.error("Error code:", error.code);
  console.error("Error message:", error.message);

  if (error.code === "ENOENT") {
    console.error(
      "⚠️ File not found. Make sure serviceAccountKey.json exists in backend root folder"
    );
  }

  process.exit(1);
}

export { db, adminAuth };
