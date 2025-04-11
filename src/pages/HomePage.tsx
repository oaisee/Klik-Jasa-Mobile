
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Bell, Filter, Wallet } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import ServiceCard from '../components/ServiceCard';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Map from '@/components/Map';
import { Link } from 'react-router-dom';

// Mock data for services
const servicesData = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    providerName: 'Budi Santoso',
    title: 'Jasa Perbaikan AC',
    price: 'Rp 150.000',
    rating: 4.8,
    category: 'Perbaikan Elektronik',
    distance: '1.2 km',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    providerName: 'Siti Rahayu',
    title: 'Desain Website Profesional',
    price: 'Rp 2.500.000',
    rating: 4.9,
    category: 'Desain & Kreatif',
    distance: '3.5 km',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    providerName: 'Ahmad Hidayat',
    title: 'Jasa Pengajaran Matematika',
    price: 'Rp 100.000/jam',
    rating: 4.7,
    category: 'Pendidikan & Pelatihan',
    distance: '2.8 km',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    providerName: 'Linda Wijaya',
    title: 'Konsultasi Bisnis Online',
    price: 'Rp 500.000',
    rating: 4.5,
    category: 'Bantuan Pribadi',
    distance: '5.0 km',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    providerName: 'Dian Permata',
    title: 'Jasa Pembersihan Rumah',
    price: 'Rp 200.000',
    rating: 4.6,
    category: 'Kebersihan',
    distance: '0.8 km',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    providerName: 'Rudi Hartono',
    title: 'Konsultasi Hukum',
    price: 'Rp 350.000/jam',
    rating: 4.9,
    category: 'Bantuan Pribadi',
    distance: '4.2 km',
  },
];

// Complete categories
const categories = [
  'Semua',
  'Kebersihan',
  'Perbaikan Rumah',
  'Kecantikan & Kesehatan',
  'Transportasi',
  'Pendidikan & Pelatihan',
  'Acara',
  'Perawatan Hewan',
  'Bantuan Pribadi',
  'Desain & Kreatif',
  'Perbaikan Elektronik',
  'Otomotif',
  'Lain-lain',
];

const HomePage: React.FC = () => {
  const { user, userType } = useAuth();
  const [services, setServices] = useState(servicesData);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [accountBalance, setAccountBalance] = useState(500000); // Mock account balance
  const [hasNotifications, setHasNotifications] = useState(true);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Get user's location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Gagal mendapatkan lokasi Anda");
        }
      );
    }
  }, []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery) {
      toast.info(`Mencari: ${searchQuery}`);
      // In a real app, we would filter services based on the search query
    }
  };

  const handleServiceClick = (id: string) => {
    const service = services.find(s => s.id === id);
    if (service) {
      toast.info(`Melihat detail layanan: ${service.title}`);
      // In a real app, this would navigate to the service detail page
    }
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
    
    if (category === 'Semua') {
      setServices(servicesData);
    } else {
      const filtered = servicesData.filter(s => s.category === category);
      setServices(filtered.length ? filtered : servicesData);
    }
    
    toast.info(`Kategori: ${category}`);
  };

  const handleNotificationClick = () => {
    setHasNotifications(false);
    toast.info("Melihat notifikasi");
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
            <button 
              className="p-2 bg-gray-100 rounded-full relative"
              onClick={handleNotificationClick}
            >
              <Bell size={20} className="text-gray-600" />
              {hasNotifications && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>
        
        {/* Balance Card */}
        <div className="px-4 py-2">
          <Card className="bg-klikjasa-purple text-white p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Wallet className="mr-2" size={20} />
                <div>
                  <p className="text-sm opacity-90">Saldo Anda</p>
                  <p className="text-xl font-bold">Rp {accountBalance.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white text-klikjasa-purple border-none"
                asChild
              >
                <Link to="/topup">Top Up</Link>
              </Button>
            </div>
          </Card>
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
      
      {/* Map Section */}
      <div className="px-4 py-3">
        <h2 className="text-lg font-bold mb-2">Layanan di Sekitar Anda</h2>
        <Map height="150px" initialLocation={userLocation || undefined} />
      </div>
      
      {/* Service Cards */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-bold mb-3">Rekomendasi Layanan</h2>
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
              extraInfo={
                <Badge variant="outline" className="mt-1 text-xs">
                  {service.distance}
                </Badge>
              }
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
