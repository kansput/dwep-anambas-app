// src/config/api.js
import axios from "axios";

// Pakai ENV kalau ada, fallback ke localhost
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Axios instance untuk pemanggilan API (pakai named export)
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Default export tetap string untuk kompatibilitas file yang pakai fetch
export default API_BASE_URL;
