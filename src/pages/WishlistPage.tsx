
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ServiceCard from '@/components/ServiceCard';
import BottomNavigation from '@/components/BottomNavigation';
import { toast } from 'sonner';
import { servicesData } from '@/data/mockServices';

const WishlistPage: React.FC = () => {
  const { user, userType } = useAuth();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Fetch wishlist items based on IDs from the wishlist context
    const items = servicesData.filter(service => wishlist.includes(service.id));
    setWishlistItems(items);
  }, [wishlist]);

  const handleRemoveFromWishlist = (id: string, title: string) => {
    removeFromWishlist(id, title);
  };

  // Create a wrapper function that matches the expected signature
  const handleToggleFavorite = (id: string) => {
    // Find the service title from the wishlist items
    const service = wishlistItems.find(item => item.id === id);
    if (service) {
      removeFromWishlist(id, service.title);
    }
  };

  const handleClearWishlist = () => {
    clearWishlist();
  };

  return (
    <div className="mobile-container pb-20">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2 text-gray-600">
            <ArrowLeft size={20} />
            <span>Wishlist</span>
          </Link>
          <Button 
            variant="ghost"
            size="sm"
            onClick={handleClearWishlist}
            className="gap-1"
            disabled={wishlist.length === 0}
          >
            <Trash2 size={16} />
            Clear
          </Button>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="p-4">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {wishlistItems.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                image={service.image}
                providerName={service.providerName}
                title={service.title}
                price={service.price}
                rating={service.rating}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
                onClick={() => toast.info(`Melihat detail layanan: ${service.title}`)}
                distance={service.distance}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center p-6">
            <Heart size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Wishlist Anda kosong.</p>
          </Card>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation userType={userType as 'provider' | 'user'} />
    </div>
  );
};

export default WishlistPage;
