
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { servicesData, categories } from '@/data/mockServices';

interface Service {
  id: string;
  image: string;
  providerName: string;
  title: string;
  price: string;
  rating: number;
  category: string;
  distance: string;
}

interface UseHomePageDataReturn {
  services: Service[];
  activeCategory: string;
  hasNotifications: boolean;
  userLocation: { latitude: number; longitude: number } | null;
  handleSearch: (query: string) => void;
  handleServiceClick: (id: string) => void;
  handleCategoryChange: (category: string) => void;
  handleNotificationClick: () => void;
}

export const useHomePageData = (): UseHomePageDataReturn => {
  const [services, setServices] = useState(servicesData);
  const [activeCategory, setActiveCategory] = useState('Semua');
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

  return {
    services,
    activeCategory,
    hasNotifications,
    userLocation,
    handleSearch,
    handleServiceClick,
    handleCategoryChange,
    handleNotificationClick
  };
};

export type { Service };
