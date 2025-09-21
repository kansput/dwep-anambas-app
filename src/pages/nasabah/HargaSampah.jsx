import React, { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";

const HargaSampah = () => {
  const { token, nasabahUser, navigateTo } = useAppContext();
  const [sampahList, setSampahList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSampah = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/sampah", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Gagal memuat data sampah");
        }

        const data = await res.json();

        if (data.sampah && nasabahUser?.bankSampah) {
          // Filter harga sesuai bank sampah user
          const filtered = data.sampah.map((item) => {
            const harga = Object.entries(item.hargaPerBank || {}).find(
              ([key]) =>
                key.toLowerCase() === nasabahUser.bankSampah.toLowerCase()
            )?.[1];

            return {
              ...item,
              harga: harga || null,
            };
          });

          setSampahList(filtered.filter((item) => item.harga !== null));
        } else {
          setSampahList([]);
        }
      } catch (err) {
        console.error("❌ Error fetch sampah:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSampah();
  }, [token, nasabahUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Memuat data harga sampah...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600">
        <p>Terjadi kesalahan: {error}</p>
        <button
          onClick={() => navigateTo("homeNasabah")}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Harga Sampah - {nasabahUser?.bankSampah}
      </h1>

      {sampahList.length === 0 ? (
        <p className="text-gray-500">Belum ada data harga untuk bank ini.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {sampahList.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {item.nama}
              </h2>
              <p className="text-sm text-gray-600">{item.jenis}</p>
              <p className="mt-2 font-bold text-green-700">
                Rp {item.harga.toLocaleString("id-ID")} / kg
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => navigateTo("homeNasabah")}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Kembali ke Menu
        </button>
      </div>
    </div>
  );
};

export default HargaSampah;
