// src/models/userModel.js
import { db } from "../config/firebase.js";

// Create user
export const createUser = async (userData) => {
  const userRef = db.collection("users").doc(userData.uid);
  await userRef.set({
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const doc = await userRef.get();
  return doc.data();
};

// Get user by ID
export const getUserById = async (uid) => {
  const doc = await db.collection("users").doc(uid).get();
  if (!doc.exists) return null;
  return doc.data();
};

// Get user by email
export const getUserByEmail = async (email) => {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return snapshot.docs[0].data();
};

// Update user
export const updateUser = async (uid, updateData) => {
  const userRef = db.collection("users").doc(uid);
  await userRef.update({
    ...updateData,
    updatedAt: new Date().toISOString(),
  });
  const updatedDoc = await userRef.get();
  return updatedDoc.data();
};

// Delete user
export const deleteUser = async (uid) => {
  const userRef = db.collection("users").doc(uid);
  await userRef.delete();
  return { message: "User berhasil dihapus" };
};

// Get all users (optional, bisa dibatasi role)
export const getAllUsers = async () => {
  const snapshot = await db.collection("users").get();
  return snapshot.docs.map((doc) => doc.data());
};
