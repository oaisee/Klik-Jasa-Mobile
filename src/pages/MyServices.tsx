
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  status: 'Aktif' | 'Nonaktif';
  image?: string;
  createdAt: string;
}

const MyServices = () => {
  const { userType } = useAuth();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data load
  useEffect(() => {
    // Simulate API call to fetch user's services
    setTimeout(() => {
      const mockServices = [
        {
          id: 1,
          title: 'Jasa Perbaikan AC',
          description: 'Perbaikan, pembersihan, dan perawatan AC berbagai merk',
          price: 'Rp 250.000',
          category: 'Perbaikan Elektronik',
          subcategory: 'Perbaikan AC',
          status: 'Aktif' as const,
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format',
          createdAt: '2023-04-10T08:30:00Z'
        },
        {
          id: 2,
          title: 'Jasa Desain Grafis',
          description: 'Desain logo, banner, dan kebutuhan grafis lainnya',
          price: 'Rp 500.000',
          category: 'Desain & Kreatif',
          subcategory: 'Desain Grafis',
          status: 'Aktif' as const,
          image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format',
          createdAt: '2023-04-05T14:15:00Z'
        },
        {
          id: 3,
          title: 'Les Bahasa Inggris',
          description: 'Kursus bahasa Inggris untuk pemula hingga mahir',
          price: 'Rp 150.000/jam',
          category: 'Pendidikan & Pelatihan',
          subcategory: 'Kursus Bahasa',
          status: 'Nonaktif' as const,
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format',
          createdAt: '2023-03-28T09:45:00Z'
        }
      ];
      
      setServices(mockServices);
      setLoading(false);
    }, 800);
  }, []);
  
  const handleDeleteService = (id: number) => {
    setServices(prevServices => prevServices.filter(service => service.id !== id));
    toast.success("Layanan berhasil dihapus");
  };
  
  const toggleServiceStatus = (id: number) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === id 
          ? { 
              ...service, 
              status: service.status === 'Aktif' ? 'Nonaktif' : 'Aktif' 
            } 
          : service
      )
    );
    
    const service = services.find(s => s.id === id);
    const newStatus = service?.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    
    toast.success(`Layanan berhasil di${newStatus === 'Aktif' ? 'aktifkan' : 'nonaktifkan'}`);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aktif':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{status}</Badge>;
      case 'Nonaktif':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="pb-24 px-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold text-klikjasa-purple">Layanan Saya</h1>
        <Button asChild className="bg-klikjasa-purple">
          <Link to="/add-service">
            <PlusCircle className="mr-2" size={18} />
            Tambah
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-pulse space-y-4 w-full">
            {[1, 2].map(i => (
              <div key={i} className="h-40 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
      ) : services.length > 0 ? (
        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <span className="mr-2">{service.category} &gt; {service.subcategory}</span>
                      {getStatusBadge(service.status)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/edit-service/${service.id}`}>
                        <Edit size={16} />
                      </Link>
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Layanan</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus layanan ini? Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex space-x-4">
                  {service.image && (
                    <div className="flex-shrink-0">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm">{service.description}</p>
                    <p className="font-bold mt-2">{service.price}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Dibuat pada: {formatDate(service.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={service.status === 'Aktif' ? "text-red-500" : "text-green-500"}
                  onClick={() => toggleServiceStatus(service.id)}
                >
                  {service.status === 'Aktif' ? (
                    <>
                      <ToggleLeft size={16} className="mr-1" />
                      Nonaktifkan
                    </>
                  ) : (
                    <>
                      <ToggleRight size={16} className="mr-1" />
                      Aktifkan
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-klikjasa-purple"
                  asChild
                >
                  <Link to={`/service/${service.id}`}>
                    <Eye size={16} className="mr-1" />
                    Lihat
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 mb-4">Belum ada layanan yang ditambahkan</p>
          <Button asChild className="bg-klikjasa-purple">
            <Link to="/add-service">
              <PlusCircle className="mr-2" size={18} />
              Tambah Layanan
            </Link>
          </Button>
        </div>
      )}

      <BottomNavigation userType={userType || 'provider'} />
    </div>
  );
};

export default MyServices;
