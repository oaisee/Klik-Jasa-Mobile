
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container flex flex-col items-center justify-center p-6 min-h-screen">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-5xl font-bold text-klikjasa-purple">404</span>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Halaman Tidak Ditemukan</h1>
      <p className="text-gray-600 text-center mb-8">
        Maaf, halaman yang Anda cari tidak dapat ditemukan.
      </p>
      
      <button 
        onClick={() => navigate('/')}
        className="btn-primary flex items-center gap-2"
      >
        <Home size={20} />
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default NotFound;
