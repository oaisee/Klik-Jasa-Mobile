
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyServices = () => {
  const { userType } = useAuth();
  
  // Contoh data layanan untuk provider
  const mockServices = [
    {
      id: 1,
      title: 'Jasa Perbaikan AC',
      description: 'Perbaikan, pembersihan, dan perawatan AC berbagai merk',
      price: 'Rp 250.000',
      category: 'Elektronik',
      status: 'Aktif'
    },
    {
      id: 2,
      title: 'Jasa Desain Grafis',
      description: 'Desain logo, banner, dan kebutuhan grafis lainnya',
      price: 'Rp 500.000',
      category: 'Desain',
      status: 'Aktif'
    }
  ];

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

      {mockServices.length > 0 ? (
        <div className="grid gap-4">
          {mockServices.map((service) => (
            <Card key={service.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription>{service.category}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{service.description}</p>
                <p className="font-bold mt-2">{service.price}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className={`px-2 py-1 rounded-full text-xs ${service.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {service.status}
                </span>
                <Button variant="outline" size="sm">Edit</Button>
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

      <BottomNavigation userType={userType || 'user'} />
    </div>
  );
};

export default MyServices;
