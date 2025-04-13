
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import BottomNavigation from '../components/BottomNavigation';
import { useWishlist } from '@/contexts/WishlistContext';

import HomeHeader from '@/components/HomePage/HomeHeader';
import HomeSearch from '@/components/HomePage/HomeSearch';
import CategorySelector from '@/components/HomePage/CategorySelector';
import MapSection from '@/components/HomePage/MapSection';
import ServiceList from '@/components/HomePage/ServiceList';

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
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [services, setServices] = useState(servicesData);
  const [activeCategory, setActiveCategory] = useState('Semua');
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

  const handleSearch = (query: string) => {
    toast.info(`Mencari: ${query}`);
    // In a real app, we would filter services based on the search query
  };

  const handleServiceClick = (id: string) => {
    const service = services.find(s => s.id === id);
    if (service) {
      toast.info(`Melihat detail layanan: ${service.title}`);
      // In a real app, this would navigate to the service detail page
    }
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
      <HomeHeader 
        userType={userType as string}
        accountBalance={accountBalance}
        hasNotifications={hasNotifications}
        onNotificationClick={handleNotificationClick}
      />
      
      <HomeSearch onSearch={handleSearch} />
      
      <CategorySelector 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <MapSection userLocation={userLocation} />
      
      <ServiceList 
        services={services}
        onServiceClick={handleServiceClick}
      />
      
      <BottomNavigation userType={userType as 'provider' | 'user'} />
    </div>
  );
};

export default HomePage;
