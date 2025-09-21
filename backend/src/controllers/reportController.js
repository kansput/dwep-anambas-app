// src/controllers/reportController.js
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { db } from "../config/firebase.js";
import { logEvent } from "../utils/auditLogger.js"; // ✅ tambahin

// ================= HELPER ================= //
const filterByMonth = (data, month, year) => {
  return data.filter((item) => {
    const date = new Date(item.createdAt);
    return date.getMonth() + 1 === month && date.getFullYear() === year;
  });
};

const filterByDateRange = (data, start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return data.filter((item) => {
    const date = new Date(item.createdAt);
    return date >= startDate && date <= endDate;
  });
};

// ================= NASABAH ================= //
export const exportNasabahExcel = async (req, res) => {
  try {
    const { id } = req.params;
    const { month, year } = req.query;

    const snapshot = await db
      .collection("transactions")
      .where("nasabahId", "==", id)
      .get();

    let data = snapshot.docs.map((doc) => doc.data());
    if (month && year) data = filterByMonth(data, parseInt(month), parseInt(year));

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Transaksi Nasabah");

    sheet.columns = [
      { header: "Tanggal", key: "createdAt", width: 20 },
      { header: "Bank Sampah", key: "bankSampah", width: 25 },
      { header: "Total", key: "grandTotal", width: 15 },
    ];

    data.forEach((trx) => {
      sheet.addRow({
        createdAt: trx.createdAt,
        bankSampah: trx.bankSampah,
        grandTotal: trx.grandTotal,
      });
    });

    // ✅ Audit log
    await logEvent({
      action: "Export Nasabah Report",
      actor: { uid: req.user.uid, name: req.user.name, role: req.user.role },
      bankSampah: req.user.bankSampah,
      targetId: id,
      details: { format: "Excel", month, year },
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=laporan-nasabah.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exportNasabahExcel:", error.message);
    res.status(500).json({ message: "Gagal export Excel" });
  }
};

export const exportNasabahPDF = async (req, res) => {
  try {
    const { id } = req.params;
    const { month, year } = req.query;

    const snapshot = await db
      .collection("transactions")
      .where("nasabahId", "==", id)
      .get();

    let data = snapshot.docs.map((doc) => doc.data());
    if (month && year) data = filterByMonth(data, parseInt(month), parseInt(year));

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=laporan-nasabah.pdf");

    doc.pipe(res);

    doc.fontSize(16).text("Laporan Transaksi Nasabah", { align: "center" });
    doc.moveDown();

    data.forEach((trx) => {
      doc
        .fontSize(12)
        .text(
          `Tanggal: ${trx.createdAt} | Bank: ${trx.bankSampah} | Total: Rp ${trx.grandTotal}`
        );
      doc.moveDown(0.5);
    });

    doc.end();

    // ✅ Audit log
    await logEvent({
      action: "Export Nasabah Report",
      actor: { uid: req.user.uid, name: req.user.name, role: req.user.role },
      bankSampah: req.user.bankSampah,
      targetId: id,
      details: { format: "PDF", month, year },
    });
  } catch (error) {
    console.error("Error exportNasabahPDF:", error.message);
    res.status(500).json({ message: "Gagal export PDF" });
  }
};

// ================= TRANSAKSI BANK ================= //
export const exportBankTransactionsExcel = async (req, res) => {
  try {
    const { name } = req.params;
    const { start, end } = req.query;

    const snapshot = await db
      .collection("transactions")
      .where("bankSampah", "==", name)
      .get();

    let data = snapshot.docs.map((doc) => doc.data());
    if (start && end) data = filterByDateRange(data, start, end);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Transaksi Bank");

    sheet.columns = [
      { header: "Tanggal", key: "createdAt", width: 20 },
      { header: "Nasabah", key: "nasabahId", width: 25 },
      { header: "Total", key: "grandTotal", width: 15 },
    ];

    data.forEach((trx) => {
      sheet.addRow({
        createdAt: trx.createdAt,
        nasabahId: trx.nasabahId,
        grandTotal: trx.grandTotal,
      });
    });

    // ✅ Audit log
    await logEvent({
      action: "Export Bank Report",
      actor: { uid: req.user.uid, name: req.user.name, role: req.user.role },
      bankSampah: req.user.bankSampah,
      targetId: name,
      details: { format: "Excel", start, end },
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=laporan-bank.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exportBankTransactionsExcel:", error.message);
    res.status(500).json({ message: "Gagal export Excel" });
  }
};

export const exportBankTransactionsPDF = async (req, res) => {
  try {
    const { name } = req.params;
    const { start, end } = req.query;

    const snapshot = await db
      .collection("transactions")
      .where("bankSampah", "==", name)
      .get();

    let data = snapshot.docs.map((doc) => doc.data());
    if (start && end) data = filterByDateRange(data, start, end);

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=laporan-bank.pdf");

    doc.pipe(res);

    doc.fontSize(16).text(`Laporan Transaksi Bank: ${name}`, { align: "center" });
    doc.moveDown();

    data.forEach((trx) => {
      doc
        .fontSize(12)
        .text(
          `Tanggal: ${trx.createdAt} | Nasabah: ${trx.nasabahId} | Total: Rp ${trx.grandTotal}`
        );
      doc.moveDown(0.5);
    });

    doc.end();

    // ✅ Audit log
    await logEvent({
      action: "Export Bank Report",
      actor: { uid: req.user.uid, name: req.user.name, role: req.user.role },
      bankSampah: req.user.bankSampah,
      targetId: name,
      details: { format: "PDF", start, end },
    });
  } catch (error) {
    console.error("Error exportBankTransactionsPDF:", error.message);
    res.status(500).json({ message: "Gagal export PDF" });
  }
};

// ================= WITHDRAW ================= //
export const exportWithdrawExcel = async (req, res) => {
  try {
    const { bank } = req.params;
    const { start, end } = req.query;

    const snapshot = await db
      .collection("withdraws")
      .where("bankSampah", "==", bank)
      .get();

    let data = snapshot.docs.map((doc) => doc.data());
    if (start && end) data = filterByDateRange(data, start, end);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Withdraw Bank");

    sheet.columns = [
      { header: "Tanggal", key: "createdAt", width: 20 },
      { header: "Nasabah", key: "nasabahId", width: 25 },
      { header: "Jumlah", key: "amount", width: 15 },
      { header: "Status", key: "status", width: 15 },
    ];

    data.forEach((w) => {
      sheet.addRow({
        createdAt: w.createdAt,
        nasabahId: w.nasabahId,
        amount: w.amount,
        status: w.status,
      });
    });

    // ✅ Audit log
    await logEvent({
      action: "Export Withdraw Report",
      actor: { uid: req.user.uid, name: req.user.name, role: req.user.role },
      bankSampah: req.user.bankSampah,
      targetId: bank,
      details: { format: "Excel", start, end },
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=withdraw-bank.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exportWithdrawExcel:", error.message);
    res.status(500).json({ message: "Gagal export Excel" });
  }
};

export const exportWithdrawPDF = async (req, res) => {
  try {
    const { bank } = req.params;
    const { start, end } = req.query;

    const snapshot = await db
      .collection("withdraws")
      .where("bankSampah", "==", bank)
      .get();

    let data = snapshot.docs.map((doc) => doc.data());
    if (start && end) data = filterByDateRange(data, start, end);

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=withdraw-bank.pdf");

    doc.pipe(res);

    doc.fontSize(16).text(`Laporan Withdraw Bank: ${bank}`, { align: "center" });
    doc.moveDown();

    data.forEach((w) => {
      doc
        .fontSize(12)
        .text(
          `Tanggal: ${w.createdAt} | Nasabah: ${w.nasabahId} | Jumlah: Rp ${w.amount} | Status: ${w.status}`
        );
      doc.moveDown(0.5);
    });

    doc.end();

    // ✅ Audit log
    await logEvent({
      action: "Export Withdraw Report",
      actor: { uid: req.user.uid, name: req.user.name, role: req.user.role },
      bankSampah: req.user.bankSampah,
      targetId: bank,
      details: { format: "PDF", start, end },
    });
  } catch (error) {
    console.error("Error exportWithdrawPDF:", error.message);
    res.status(500).json({ message: "Gagal export PDF" });
  }
};

// ================= PENJUALAN PENGEPUL ================= //
export const exportSalesExcel = async (req, res) => {
  try {
    const { bank } = req.params;
    const { start, end } = req.query;

    const snapshot = await db
      .collection("sales")
      .where("bankSampah", "==", bank)
      .get();

    let data = snapshot.docs.map((doc) => doc.data());
    if (start && end) data = filterByDateRange(data, start, end);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Penjualan Pengepul");

    sheet.columns = [
      { header: "Tanggal", key: "createdAt", width: 20 },
      { header: "Pengepul", key: "pengepul", width: 25 },
      { header: "Total", key: "grandTotal", width: 15 },
    ];

    data.forEach((s) => {
      sheet.addRow({
        createdAt: s.createdAt,
        pengepul: s.pengepul,
        grandTotal: s.grandTotal,
      });
    });

    // ✅ Audit log
    await logEvent({
      action: "Export Sales Report",
      actor: { uid: req.user.uid, name: req.user.name, role: req.user.role },
      bankSampah: req.user.bankSampah,
      targetId: bank,
      details: { format: "Excel", start, end },
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=sales-bank.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exportSalesExcel:", error.message);
    res.status(500).json({ message: "Gagal export Excel" });
  }
};

export const exportSalesPDF = async (req, res) => {
  try {
    const { bank } = req.params;
    const { start, end } = req.query;

    const snapshot = await db
      .collection("sales")
      .where("bankSampah", "==", bank)
      .get();

    let data = snapshot.docs.map((doc) => doc.data());
    if (start && end) data = filterByDateRange(data, start, end);

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=sales-bank.pdf");

    doc.pipe(res);

    doc.fontSize(16).text(`Laporan Penjualan ke Pengepul: ${bank}`, { align: "center" });
    doc.moveDown();

    data.forEach((s) => {
      doc
        .fontSize(12)
        .text(
          `Tanggal: ${s.createdAt} | Pengepul: ${s.pengepul} | Total: Rp ${s.grandTotal}`
        );
      doc.moveDown(0.5);
    });

    doc.end();

    // ✅ Audit log
    await logEvent({
      action: "Export Sales Report",
      actor: { uid: req.user.uid, name: req.user.name, role: req.user.role },
      bankSampah: req.user.bankSampah,
      targetId: bank,
      details: { format: "PDF", start, end },
    });
  } catch (error) {
    console.error("Error exportSalesPDF:", error.message);
    res.status(500).json({ message: "Gagal export PDF" });
  }
};
