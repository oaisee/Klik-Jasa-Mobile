
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (serviceId: string, serviceName: string) => void;
  removeFromWishlist: (serviceId: string, serviceName: string) => void;
  isInWishlist: (serviceId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize wishlist from localStorage if available
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const savedWishlist = localStorage.getItem('klikjasa_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('klikjasa_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (serviceId: string, serviceName: string) => {
    if (!isInWishlist(serviceId)) {
      setWishlist(prev => [...prev, serviceId]);
      toast.success(`${serviceName} ditambahkan ke wishlist`);
    }
  };

  const removeFromWishlist = (serviceId: string, serviceName: string) => {
    if (isInWishlist(serviceId)) {
      setWishlist(prev => prev.filter(id => id !== serviceId));
      toast.success(`${serviceName} dihapus dari wishlist`);
    }
  };

  const isInWishlist = (serviceId: string) => {
    return wishlist.includes(serviceId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success('Wishlist telah dikosongkan');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
