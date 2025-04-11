
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, Briefcase, LogIn } from 'lucide-react';
import OnboardingSlide from '../components/OnboardingSlide';

const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slides = [
    {
      title: "Ribuan penyedia jasa telah bergabung disini",
      description: "Silahkan hubungi penyedia jasa yang tepat untuk menangani masalah anda.",
      illustration: <Users size={120} className="text-klikjasa-purple" />,
    },
    {
      title: "Punya skill dan kemampuan?",
      description: "Tawarkan jasa anda pada jutaan pengguna dan dapatkan penghasilan.",
      illustration: <Briefcase size={120} className="text-klikjasa-purple" />,
    },
    {
      title: "Silahkan login untuk mengeksplorasi KlikJasa",
      description: "",
      illustration: <LogIn size={120} className="text-klikjasa-purple" />,
    },
  ];

  return (
    <div className="mobile-container flex flex-col h-screen">
      <div className="flex-1 flex flex-col">
        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 my-6">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-klikjasa-purple'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div 
                key={index} 
                className="min-w-full h-full"
              >
                <OnboardingSlide
                  title={slide.title}
                  description={slide.description}
                  illustration={slide.illustration}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation and buttons */}
        <div className="p-6">
          {currentSlide === 2 ? (
            <div className="space-y-4">
              <button 
                className="btn-primary w-full py-3"
                onClick={() => navigate('/login/user')}
              >
                Login sebagai Pengguna Jasa
              </button>
              <button 
                className="btn-secondary w-full py-3"
                onClick={() => navigate('/login/provider')}
              >
                Login sebagai Penyedia Jasa
              </button>
              <p className="text-xs text-center text-gray-500 mt-4">
                Anda bisa beralih dari pengguna jasa ke penyedia jasa kapanpun di halaman profil setelah login.
              </p>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <button 
                onClick={handlePrev}
                className={`p-2 rounded-full ${
                  currentSlide === 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-klikjasa-purple'
                }`}
                disabled={currentSlide === 0}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="p-2 rounded-full text-klikjasa-purple"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
