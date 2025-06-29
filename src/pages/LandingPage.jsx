import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

// PERBAIKAN: Mengimpor semua gambar dari folder assets
import heroBgImage from '../assets/anambas-bg4.jpg';
import benefitImage1 from '../assets/anambas-bg1.jpg';
import benefitImage2 from '../assets/anambas-bg2.jpg';
import benefitImage3 from '../assets/anambas-bg3.jpg';

// Komponen LandingPage.jsx (Versi Lengkap & Profesional)
const LandingPage = () => {
    const { navigateTo } = useAppContext();

    // --- LOGIKA SLIDER GAMBAR UNTUK BAGIAN MANFAAT ---
    const benefitImages = [benefitImage1, benefitImage2, benefitImage3];
    const [currentBenefitImageIndex, setCurrentBenefitImageIndex] = useState(0);

    const nextBenefitImage = () => {
        setCurrentBenefitImageIndex((prevIndex) => (prevIndex + 1) % benefitImages.length);
    };

    const prevBenefitImage = () => {
        setCurrentBenefitImageIndex((prevIndex) => (prevIndex - 1 + benefitImages.length) % benefitImages.length);
    };
    // ----------------------------------------------------

    return (
        <div className="bg-white text-slate-700">

            {/* Header / Navbar */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-50 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('landingPage')}>
                         <div className="bg-teal-500 p-2 rounded-lg">
                            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C21.9992 9.15545 20.9103 6.47926 18.9921 4.54533M12 2V6M12 22V18M12 2C14.75 2 17.1 3.24 18.75 5M12 2C9.25 2 6.9 3.24 5.25 5M18.75 5C19.75 6.41 20.4 8.2 20.5 10M18.75 5C18.75 5 15 8 12 8S5.25 5 5.25 5M5.25 5C4.25 6.41 3.6 8.2 3.5 10M3.5 10H7.5M20.5 10H16.5M7.5 10C7.5 10 9 12 12 12S16.5 10 16.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">DWEP Anambas</h1>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <button onClick={() => navigateTo('registerNasabah')} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-5 rounded-full transition-all">
                            Daftar Nasabah
                        </button>
                        <button onClick={() => navigateTo('loginAdmin')} className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 px-5 rounded-full transition-all">
                            Login Petugas
                        </button>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section 
                    className="relative bg-cover bg-center" 
                    style={{ backgroundImage: `url(${heroBgImage})` }}
                >
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative max-w-6xl mx-auto px-6 py-32 md:py-48 text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                            Ubah Sampah Jadi Berkah
                        </h1>
                        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
                            Bergabunglah dengan gerakan kami untuk menjaga keindahan laut Anambas, sekaligus mendapatkan keuntungan ekonomi dari sampah yang Anda pilah.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => navigateTo('registerNasabah')} className="bg-teal-500 hover:bg-teal-600 font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                Gabung Sekarang
                            </button>
                            <a href="#cara-kerja" className="bg-white/20 backdrop-blur-sm border-2 border-white/50 hover:bg-white/30 font-semibold py-3 px-8 rounded-full transition-all text-center">
                                Pelajari Caranya
                            </a>
                        </div>
                    </div>
                </section>

                {/* Cara Kerja Section */}
                <section id="cara-kerja" className="py-20">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-slate-800">Sangat Mudah, Hanya 3 Langkah</h2>
                            <p className="mt-3 text-slate-600">Menabung sampah di DWEP Anambas itu praktis dan menguntungkan. Ikuti langkah-langkah sederhana ini:</p>
                        </div>
                        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                                <div className="bg-teal-100 h-20 w-20 mx-auto rounded-full flex items-center justify-center">
                                    <img src="https://img.icons8.com/bubbles/100/recycle-sign.png" alt="Pilah Sampah" className="h-16 w-16"/>
                                </div>
                                <h3 className="mt-6 text-xl font-bold">1. Pilah Sampah</h3>
                                <p className="mt-2 text-slate-500">Pisahkan sampah Anda di rumah sesuai jenisnya, seperti plastik, kertas, dan logam.</p>
                            </div>
                             <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 transform md:scale-105">
                                <div className="bg-orange-100 h-20 w-20 mx-auto rounded-full flex items-center justify-center">
                                   <img src="https://img.icons8.com/plasticine/100/scales.png" alt="Setor & Timbang" className="h-16 w-16"/>
                                </div>
                                <h3 className="mt-6 text-xl font-bold">2. Setor & Timbang</h3>
                                <p className="mt-2 text-slate-500">Bawa sampah yang sudah dipilah ke lokasi Bank Sampah terdekat sesuai jadwal.</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                                <div className="bg-sky-100 h-20 w-20 mx-auto rounded-full flex items-center justify-center">
                                    <img src="https://img.icons8.com/plasticine/100/stack-of-money.png" alt="Dapatkan Saldo" className="h-16 w-16"/>
                                </div>
                                <h3 className="mt-6 text-xl font-bold">3. Dapatkan Saldo</h3>
                                <p className="mt-2 text-slate-500">Sampah Anda akan ditimbang dan nilainya langsung masuk ke dalam tabungan digital Anda.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Manfaat Section */}
                <section id="manfaat" className="py-20 bg-slate-50">
                    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative w-full h-96 rounded-2xl shadow-xl overflow-hidden">
                            <img 
                                src={benefitImages[currentBenefitImageIndex]} 
                                alt="Manfaat bagi nasabah dan lingkungan" 
                                className="w-full h-full object-cover transition-opacity duration-500"
                                key={currentBenefitImageIndex}
                            />
                            <div className="absolute inset-0 flex justify-between items-center px-2">
                                <button onClick={prevBenefitImage} className="bg-black/20 hover:bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors">
                                    &#x276E;
                                </button>
                                <button onClick={nextBenefitImage} className="bg-black/20 hover:bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors">
                                    &#x276F;
                                </button>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800">Dua Manfaat Sekaligus</h2>
                            <p className="mt-3 text-slate-600 mb-8">Dengan bergabung, Anda tidak hanya mendapatkan keuntungan ekonomi, tetapi juga menjadi pahlawan bagi lingkungan Anambas.</p>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="bg-teal-100 p-2 rounded-full mt-1"><svg className="w-5 h-5 text-teal-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Keuntungan Ekonomi</h4>
                                        <p className="text-slate-500">Dapatkan penghasilan tambahan dari sampah yang selama ini terbuang. Tabungan bisa ditarik tunai.</p>
                                    </div>
                                </li>
                                 <li className="flex items-start gap-4">
                                    <div className="bg-teal-100 p-2 rounded-full mt-1"><svg className="w-5 h-5 text-teal-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Menjaga Lingkungan</h4>
                                        <p className="text-slate-500">Mengurangi jumlah sampah yang berakhir di laut dan menjaga keindahan terumbu karang kita.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
             <footer className="bg-slate-800 text-white relative pt-20 pb-12">
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px]">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-100"></path>
                    </svg>
                </div>
                <div className="max-w-6xl mx-auto px-6 relative">
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                       <div className="md:col-span-1">
                           <div className="flex items-center gap-3 mb-4">
                               <div className="bg-white p-2 rounded-lg">
                                   <svg className="h-6 w-6 text-teal-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C21.9992 9.15545 20.9103 6.47926 18.9921 4.54533M12 2V6M12 22V18M12 2C14.75 2 17.1 3.24 18.75 5M12 2C9.25 2 6.9 3.24 5.25 5M18.75 5C19.75 6.41 20.4 8.2 20.5 10M18.75 5C18.75 5 15 8 12 8S5.25 5 5.25 5M5.25 5C4.25 6.41 3.6 8.2 3.5 10M3.5 10H7.5M20.5 10H16.5M7.5 10C7.5 10 9 12 12 12S16.5 10 16.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                   </svg>
                               </div>
                               <h1 className="text-xl font-extrabold tracking-tight">DWEP Anambas</h1>
                           </div>
                           <p className="text-sm text-slate-400">Gerakan bersama untuk Anambas yang lebih bersih, sehat, dan sejahtera melalui teknologi dan pemberdayaan komunitas.</p>
                       </div>
                       <div>
                           <h4 className="font-bold text-lg mb-4">Navigasi</h4>
                           <ul className="space-y-2 text-sm text-slate-300">
                               <li><a href="#cara-kerja" className="hover:text-teal-400">Cara Kerja</a></li>
                               <li><a href="#manfaat" className="hover:text-teal-400">Manfaat</a></li>
                               <li><a href="#" onClick={() => navigateTo('loginNasabah')} className="hover:text-teal-400">Login Nasabah</a></li>
                               <li><a href="#" onClick={() => navigateTo('loginAdmin')} className="hover:text-teal-400">Login Petugas</a></li>
                           </ul>
                       </div>
                        <div>
                           <h4 className="font-bold text-lg mb-4">Kontak</h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                               <li><a href="mailto:info@dwep.id" className="hover:text-teal-400">info@dwep.id</a></li>
                               <li><p>Desa Kuala Maras, Anambas</p></li>
                           </ul>
                       </div>
                        <div>
                           <h4 className="font-bold text-lg mb-4">Ikuti Kami</h4>
                           <div className="flex gap-4">
                               <a href="#" className="text-slate-400 hover:text-white" title="Facebook">
                                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                               </a>
                               <a href="#" className="text-slate-400 hover:text-white" title="Instagram">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                               </a>
                           </div>
                       </div>
                   </div>
                    <div className="mt-12 border-t border-slate-700 pt-8 text-sm text-slate-400 text-center">
                        &copy; 2025 DWEP Anambas. Didukung oleh Anambas Foundation & Parongpong.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
