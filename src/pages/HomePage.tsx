
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '../components/BottomNavigation';
import { useWishlist } from '@/contexts/WishlistContext';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

import HomeHeader from '@/components/HomePage/HomeHeader';
import HomeSearch from '@/components/HomePage/HomeSearch';
import CategorySelector from '@/components/HomePage/CategorySelector';
import MapSection from '@/components/HomePage/MapSection';
import ServiceList from '@/components/HomePage/ServiceList';
import { categories } from '@/data/mockServices';
import { useHomePageData } from '@/hooks/useHomePageData';

const HomePage: React.FC = () => {
  const { user, userType } = useAuth();
  const { wishlist } = useWishlist();
  const [accountBalance, setAccountBalance] = useState(500000); // Mock account balance
  
  const {
    services,
    activeCategory,
    hasNotifications,
    userLocation,
    handleSearch,
    handleServiceClick,
    handleCategoryChange,
    handleNotificationClick
  } = useHomePageData();

  return (
    <div className="mobile-container pb-20">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-klikjasa-purple">KlikJasa</h1>
            <p className="text-xs text-gray-500">
              Selamat datang, {userType === 'provider' ? 'Penyedia Jasa' : 'Pengguna'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link 
              to="/wishlist" 
              className="relative flex items-center justify-center"
            >
              <Heart size={24} className="text-klikjasa-purple" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
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
