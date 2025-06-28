import React from 'react';
import { useAppContext } from '../../AppContext';
import { navItems, bottomNavItems } from './navItems';

const Sidebar = () => {
    const { currentPage, navigateTo, logout } = useAppContext();

    return (
        <aside className="w-64 bg-white p-6 hidden md:flex flex-col justify-between border-r border-slate-200">
            <div>
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-teal-500 p-2 rounded-lg">
                        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C21.9992 9.15545 20.9103 6.47926 18.9921 4.54533M12 2V6M12 22V18M12 2C14.75 2 17.1 3.24 18.75 5M12 2C9.25 2 6.9 3.24 5.25 5M18.75 5C19.75 6.41 20.4 8.2 20.5 10M18.75 5C18.75 5 15 8 12 8S5.25 5 5.25 5M5.25 5C4.25 6.41 3.6 8.2 3.5 10M3.5 10H7.5M20.5 10H16.5M7.5 10C7.5 10 9 12 12 12S16.5 10 16.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">DWEP Anambas</h1>
                </div>
                <nav>
                    <ul>
                        {navItems.map(item => (
                             <li key={item.id} className="mb-2">
                                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(item.id); }} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${currentPage === item.id ? 'active-nav' : 'text-slate-600 hover:bg-slate-100'}`}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="border-t border-slate-200 pt-4">
                 {bottomNavItems.map(item => (
                     <a key={item.id} href="#" onClick={(e) => { e.preventDefault(); item.id === 'keluar' ? logout() : navigateTo(item.id); }} className={`flex items-center gap-3 p-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-all`}>
                        {item.icon}
                        <span>{item.label}</span>
                    </a>
                 ))}
            </div>
        </aside>
    );
};

export default Sidebar;