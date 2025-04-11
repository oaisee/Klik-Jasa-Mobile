
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Filter } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import ServiceCard from '../components/ServiceCard';
import { toast } from 'sonner';

// Mock data for services
const servicesData = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    providerName: 'Budi Santoso',
    title: 'Jasa Perbaikan AC',
    price: 'Rp 150.000',
    rating: 4.8,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    providerName: 'Siti Rahayu',
    title: 'Desain Website Profesional',
    price: 'Rp 2.500.000',
    rating: 4.9,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    providerName: 'Ahmad Hidayat',
    title: 'Jasa Pengajaran Matematika',
    price: 'Rp 100.000/jam',
    rating: 4.7,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    providerName: 'Linda Wijaya',
    title: 'Konsultasi Bisnis Online',
    price: 'Rp 500.000',
    rating: 4.5,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    providerName: 'Dian Permata',
    title: 'Jasa Pembersihan Rumah',
    price: 'Rp 200.000',
    rating: 4.6,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    providerName: 'Rudi Hartono',
    title: 'Konsultasi Hukum',
    price: 'Rp 350.000/jam',
    rating: 4.9,
  },
];

// Mock categories
const categories = [
  'Semua',
  'Pendidikan',
  'IT & Komputer',
  'Rumah Tangga',
  'Konsultasi',
  'Keuangan',
  'Kesehatan',
];

const HomePage: React.FC = () => {
  const location = useLocation();
  const userType = location.state?.userType || 'user';
  const [services, setServices] = useState(servicesData);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, we would filter services based on the search query
    if (searchQuery) {
      toast.info(`Mencari: ${searchQuery}`);
    }
  };

  const handleServiceClick = (id: string) => {
    // In a real app, this would navigate to the service detail page
    toast.info(`Melihat detail layanan: ${services.find(s => s.id === id)?.title}`);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    );
    
    const isAdding = !favorites.includes(id);
    const serviceName = services.find(s => s.id === id)?.title;
    
    toast.success(
      isAdding 
        ? `${serviceName} ditambahkan ke wishlist` 
        : `${serviceName} dihapus dari wishlist`
    );
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // In a real app, we would filter services based on the category
    toast.info(`Kategori: ${category}`);
  };

  return (
    <div className="mobile-container pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex justify-between items-center p-4">
          <div>
            <h1 className="text-xl font-bold text-klikjasa-purple">KlikJasa</h1>
            <p className="text-xs text-gray-500">
              Selamat datang, {userType === 'provider' ? 'Penyedia Jasa' : 'Pengguna'}
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-100 rounded-full relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 pb-2">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Cari layanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-klikjasa-purple"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-gray-400" />
            </div>
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Filter size={20} className="text-gray-400" />
            </button>
          </form>
        </div>
        
        {/* Categories */}
        <div className="pb-2 px-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          <div className="flex space-x-2 pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-klikjasa-purple text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Service Cards */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-bold mb-4">Rekomendasi Layanan</h2>
        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              image={service.image}
              providerName={service.providerName}
              title={service.title}
              price={service.price}
              rating={service.rating}
              isFavorite={favorites.includes(service.id)}
              onToggleFavorite={handleToggleFavorite}
              onClick={handleServiceClick}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation userType={userType as 'provider' | 'user'} />
    </div>
  );
};

export default HomePage;
