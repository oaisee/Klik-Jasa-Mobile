
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '../components/BottomNavigation';
import { useWishlist } from '@/contexts/WishlistContext';

import HomeHeader from '@/components/HomePage/HomeHeader';
import HomeSearch from '@/components/HomePage/HomeSearch';
import CategorySelector from '@/components/HomePage/CategorySelector';
import MapSection from '@/components/HomePage/MapSection';
import ServiceList from '@/components/HomePage/ServiceList';
import { categories } from '@/data/mockServices';
import { useHomePageData } from '@/hooks/useHomePageData';

const HomePage: React.FC = () => {
  const { user, userType } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
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
