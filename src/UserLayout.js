// src/UserLayout.js
import React, { useState, useEffect, useRef } from 'react';
import { Home, Send, BarChart3, Menu, X } from 'lucide-react';

// Impor Komponen
import Footer from './components/Footer';
// Impor Halaman
import HomePage from './pages/HomePage';
import LaporanPage from './pages/Laporan';
import TransparansiPage from './pages/Transparansi';
import LaporanSukses from './pages/LaporanSukses'; 

// --- (SidebarHeader & SidebarContent tidak berubah) ---
const SidebarHeader = ({ isExpanded = true, onCloseMobile }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-700 h-[81px]">
    <div className="flex items-center space-x-3 min-w-0">
      <img 
        src="/Logo Lampung selatan.png" 
        alt="Logo Lampung Selatan" 
        className="h-10 w-10 object-contain flex-shrink-0"
      />
      <div className={`transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <h1 className="text-lg font-semibold text-white truncate">Kritik & Saran Desa</h1>
        <p className="text-xs text-gray-400">Portal Aspirasi Warga WayHui</p>
      </div>
    </div>
    {onCloseMobile && (
      <button 
        onClick={onCloseMobile} 
        className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg"
      >
        <X size={20} />
      </button>
    )}
  </div>
);
const SidebarContent = ({ currentPage, setCurrentPage, isExpanded, onToggleDesktop }) => {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'laporan', label: 'Buat Laporan', icon: Send },
    { id: 'transparansi', label: 'Transparansi', icon: BarChart3 }
  ];

  return (
    <>
      <nav className="px-3 py-4 space-y-2">
        
        <button 
          onClick={onToggleDesktop} 
          className={`
            hidden md:flex items-center space-x-3 w-full px-4 py-3 
            font-medium rounded-lg
            transition-all duration-200 ease-in-out
            bg-gray-800 text-gray-300 shadow-md hover:shadow-lg hover:bg-gray-700 hover:text-white
            ${!isExpanded ? 'justify-center' : ''}
          `}
        >
          <Menu size={20} className="flex-shrink-0" />
          <span 
            className={`
              transition-opacity duration-100 whitespace-nowrap
              ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0 w-0 hidden'}
            `}
          >
            Menu
          </span>
        </button>

        <div className={`border-b border-gray-700 pt-2 ${!onToggleDesktop ? 'hidden' : 'hidden md:block'}`}></div>

        {navItems.map(nav => {
          const isActive = currentPage === nav.id;
          return (
            <button
              key={nav.id}
              onClick={() => setCurrentPage(nav.id)}
              className={`
                flex items-center space-x-3 w-full px-4 py-3 
                font-medium rounded-lg
                transition-all duration-200 ease-in-out
                ${isActive 
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 shadow-md hover:shadow-lg hover:bg-gray-700 hover:text-white'
                }
                ${!isExpanded ? 'justify-center' : ''}
              `}
              title={!isExpanded ? nav.label : ''} 
            >
              <nav.icon size={20} className="flex-shrink-0" />
              <span 
                className={`
                  transition-opacity duration-100 whitespace-nowrap
                  ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0 w-0 hidden'}
                `}
              >
                {nav.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
// ----------------------------------------------------


// --- PERUBAHAN: Header dimodifikasi untuk center title di mobile ---
const MainHeader = ({ onToggleMobileSidebar }) => (
  <header className="
    md:bg-white bg-gray-900 
    shadow-sm z-10 p-4 flex items-center sticky top-0
    md:justify-between relative 
  ">
    {/* Tombol Kiri (Absolute di mobile, tersembunyi di desktop) */}
    <button 
      onClick={onToggleMobileSidebar} 
      className="p-2 text-gray-300 rounded-lg hover:bg-gray-700 
                 md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10"
    >
      <Menu size={24} />
    </button>
    
    {/* Judul (Flex-1 dan center di mobile, tersembunyi di desktop) */}
    <h1 className="text-lg font-semibold text-white md:hidden flex-1 text-center">
      Kritik & Saran
    </h1>
    
    {/* Spacer (Hanya tampil di desktop) */}
    <div className="hidden md:block flex-1"></div>
  </header>
);
// ---------------------------------------------------------------


// --- (Layout Utama tidak berubah) ---
export default function UserLayout({ 
  onAddLaporan, laporanPublik, allPengumuman
}) {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage laporan={laporanPublik} pengumuman={allPengumuman} />;
      case 'laporan':
        return <LaporanPage setCurrentPage={setCurrentPage} onAddLaporan={onAddLaporan} />;
      case 'transparansi':
        return <TransparansiPage laporan={laporanPublik} />;
      case 'laporan_sukses':
        return <LaporanSukses setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage laporan={laporanPublik} pengumuman={allPengumuman} />;
    }
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMobileSidebarOpen(false); 
  };

  if (currentPage === 'laporan_sukses') {
    return (
      <main className="container mx-auto px-4 py-8">
        {renderCurrentPage()}
      </main>
    );
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <div 
        className={`
          hidden md:flex flex-col bg-gray-900 text-white shadow-lg sticky top-0 h-screen
          transition-all duration-300
          ${isDesktopSidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        <SidebarHeader isExpanded={isDesktopSidebarOpen} />
        
        <div className="overflow-y-auto overflow-x-hidden flex-1">
          <SidebarContent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isExpanded={isDesktopSidebarOpen}
            onToggleDesktop={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
          />
        </div>
      </div>

      <div 
        className={`
          fixed top-0 left-0 z-50 w-64 h-full bg-gray-900 text-white shadow-lg 
          transition-transform duration-300 ease-in-out md:hidden
          overflow-y-auto flex flex-col
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarHeader isExpanded={true} onCloseMobile={() => setIsMobileSidebarOpen(false)} />
        
        <div className="overflow-y-auto flex-1">
          <SidebarContent
            currentPage={currentPage}
            setCurrentPage={handleNavClick}
            isExpanded={true} 
          />
        </div>
      </div>

      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}
      
      <div className="flex-1 flex flex-col max-w-full overflow-x-hidden h-screen overflow-y-auto">
        
        <MainHeader
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />
        
        <main className="container mx-auto px-4 py-8">
          {renderCurrentPage()}
        </main>
        
        <div className="mt-auto">
          <Footer /> 
        </div>
      </div>
    </div>
  );
}
