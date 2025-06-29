import React, { useState } from 'react';
import { useAppContext } from '../../AppContext';

const TarikSaldo = () => {
    const { navigateTo } = useAppContext();
    const [amount, setAmount] = useState('');
    const currentBalance = 125500; // Saldo saat ini untuk contoh

    const handleWithdraw = (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) {
            alert('Silakan masukkan jumlah penarikan yang valid.');
            return;
        }
        if (amount > currentBalance) {
            alert('Saldo Anda tidak mencukupi untuk melakukan penarikan ini.');
            return;
        }
        console.log(`Pengajuan penarikan sebesar Rp ${amount}`);
        alert('Pengajuan penarikan berhasil! Petugas akan segera menghubungi Anda untuk konfirmasi pengambilan tunai.');
        navigateTo('saldoNasabah');
    };

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
            <header className="p-6 flex items-center gap-4 bg-emerald-600 text-white sticky top-0 z-10">
                <button onClick={() => navigateTo('saldoNasabah')} className="p-2 -ml-2 rounded-full hover:bg-white/20 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold">Tarik Saldo Tabungan</h1>
            </header>

            <main className="p-6 bg-slate-50 min-h-screen">
                <form onSubmit={handleWithdraw}>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <div className="text-center mb-6">
                            <p className="text-sm text-slate-500">Saldo Anda Saat Ini</p>
                            <p className="text-3xl font-bold text-teal-600">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(currentBalance)}
                            </p>
                        </div>

                        <div>
                            <label htmlFor="withdraw-amount" className="block text-sm font-medium text-slate-600 mb-2">Jumlah Penarikan (Rp)</label>
                            <input 
                                type="number" 
                                id="withdraw-amount" 
                                value={amount}
                                onChange={(e) => setAmount(parseInt(e.target.value) || '')}
                                placeholder="0" 
                                className="w-full text-center text-3xl font-bold px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" 
                                required 
                            />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            <button type="button" onClick={() => setAmount(50000)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg transition-colors">Rp 50rb</button>
                            <button type="button" onClick={() => setAmount(100000)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg transition-colors">Rp 100rb</button>
                            <button type="button" onClick={() => setAmount(currentBalance)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg transition-colors">Semua</button>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-sky-50 border border-sky-200 text-sky-800 rounded-lg text-sm">
                        <p><strong>Info:</strong> Pengajuan penarikan akan diverifikasi oleh petugas. Anda akan dihubungi via WhatsApp untuk konfirmasi dan pengambilan tunai di lokasi Bank Sampah.</p>
                    </div>

                    <div className="mt-8">
                        <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg shadow-emerald-500/20">
                            Ajukan Penarikan
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default TarikSaldo;