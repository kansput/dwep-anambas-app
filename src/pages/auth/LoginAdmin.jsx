import React from 'react';
import { useAppContext } from '../../AppContext';

const LoginAdmin = () => { 
    const { loginAdmin, loginNasabah } = useAppContext();
    return (
        <div className="p-8 flex flex-col items-center justify-center h-screen bg-slate-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold mb-6">Halaman Login</h1>
                <div className="space-y-4">
                    <button 
                        onClick={() => loginAdmin({ name: 'Petugas 01', role: 'admin' })} 
                        className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
                    >
                        Masuk sebagai Admin
                    </button>
                    <button 
                        onClick={() => loginNasabah({ name: 'Ibu Siti', id: 'N-001' })} 
                        className="w-full bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
                    >
                        Masuk sebagai Nasabah
                    </button>
                </div>
            </div>
        </div>
    );
};
export default LoginAdmin;
