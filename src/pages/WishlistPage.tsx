
import React, { useState } from 'react';
import { useWishlist } from '@/contexts/WishlistContext';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import ServiceCard from '@/components/ServiceCard';
import BottomNavigation from '@/components/BottomNavigation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

// Mock service data (in a real app, you would fetch this from an API)
const mockServicesData = [
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

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  // Filter services to only show ones in the wishlist
  const wishlistedServices = mockServicesData.filter(service => 
    wishlist.includes(service.id)
  );

  const handleServiceClick = (id: string) => {
    toast.info(`Melihat detail layanan dengan ID: ${id}`);
    // In a real app, navigate to service detail page
  };

  const handleToggleFavorite = (id: string) => {
    const service = mockServicesData.find(s => s.id === id);
    if (service) {
      removeFromWishlist(id, service.title);
    }
  };

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between px-4 my-4">
        <div className="flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-klikjasa-purple ml-2">Wishlist Saya</h1>
        </div>
        
        {wishlist.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-red-500">
                <Trash2 size={20} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus Semua Wishlist</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin menghapus semua layanan dari wishlist?
                  Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600"
                  onClick={clearWishlist}
                >
                  Hapus Semua
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div className="px-4">
        {wishlist.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Wishlist Anda kosong</h3>
            <p className="text-gray-500 mb-4">
              Anda belum menambahkan layanan apapun ke wishlist
            </p>
            <Link to="/">
              <Button className="bg-klikjasa-purple">
                Jelajahi Layanan
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {wishlistedServices.map((service) => (
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
                onClick={handleServiceClick}
                distance={service.distance}
              />
            ))}
          </div>
        )}
      </div>
      
      <BottomNavigation userType="user" />
    </div>
  );
};

export default WishlistPage;
