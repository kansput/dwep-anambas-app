import { createSale, getSalesByBank } from "../models/saleModel.js";
import { getSampahById } from "../models/sampahModel.js";
import { logEvent } from "../utils/auditLogger.js";

// POST /api/sales
export const jualKePengepul = async (req, res) => {
  try {
    const { pengepul, detailSampah, totalPayment } = req.body;
    const petugasId = req.user?.uid;
    const bankSampah = req.user?.bankSampah;

    if (!pengepul || !Array.isArray(detailSampah) || detailSampah.length === 0) {
      return res.status(400).json({ message: "Data penjualan tidak lengkap (pengepul / detailSampah)." });
    }
    if (totalPayment === undefined || totalPayment === null || isNaN(Number(totalPayment))) {
      return res.status(400).json({ message: "totalPayment harus diberikan dan berupa angka." });
    }

    const detail = [];
    for (const item of detailSampah) {
      if (!item?.idSampah) return res.status(400).json({ message: "Setiap item wajib punya idSampah." });
      const sampah = await getSampahById(item.idSampah);
      if (!sampah) {
        return res.status(404).json({ message: `Sampah dengan ID ${item.idSampah} tidak ditemukan` });
      }
      detail.push({
        idSampah: sampah.idSampah,
        namaSampah: sampah.namaSampah,
        berat: Number(item.berat) || 0,
      });
    }

    const newSale = await createSale({
      bankSampah,
      petugasId,
      pengepul,
      detailSampah: detail,
      grandTotal: Number(totalPayment),
      tanggal: new Date().toISOString(),
    });

    await logEvent?.({
      action: "Jual ke Pengepul",
      actor: { uid: req.user?.uid, name: req.user?.name, role: req.user?.role },
      bankSampah,
      details: { pengepul, grandTotal: Number(totalPayment), detailSampah: detail },
    });

    return res.status(201).json({ message: "Penjualan ke pengepul berhasil dicatat", sale: newSale });
  } catch (error) {
    console.error("❌ Error jualKePengepul:", error);
    return res.status(500).json({ message: "Gagal mencatat penjualan", error: error?.message });
  }
};

// GET /api/sales/bank/:name
export const getBankSales = async (req, res) => {
  try {
    const bankSampah = req.params.name;
    const sales = await getSalesByBank(bankSampah);
    return res.status(200).json(sales);
  } catch (error) {
    console.error("❌ Error getBankSales:", error);
    return res.status(500).json({ message: "Gagal mengambil data penjualan" });
  }
};
