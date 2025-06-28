import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-slate-100 text-slate-700">
            <Sidebar />
            <main className="flex-1 main-content overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;