
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("SplashScreen mounted, setting timeout to navigate to onboarding");
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="mobile-container flex flex-col items-center justify-center h-screen">
      <div className="animate-fade-in flex flex-col items-center">
        <Logo />
        <h1 className="text-2xl font-bold mt-6 text-klikjasa-purple">Selamat datang di KlikJasa</h1>
        <p className="text-sm text-gray-600 mt-2">Platform Marketplace Jasa Nomor 1 di Indonesia.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
