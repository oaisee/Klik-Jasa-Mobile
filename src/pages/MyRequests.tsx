
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyRequests = () => {
  const { userType } = useAuth();
  
  // Contoh data permintaan untuk user
  const mockRequests = [
    {
      id: 1,
      title: 'Butuh Jasa Perbaikan AC',
      description: 'AC tidak dingin, perlu teknisi segera',
      budget: 'Rp 200.000 - 300.000',
      category: 'Elektronik',
      status: 'Mencari'
    },
    {
      id: 2,
      title: 'Jasa Design Logo',
      description: 'Butuh design logo untuk coffee shop dengan konsep minimalis',
      budget: 'Rp 300.000 - 500.000',
      category: 'Desain',
      status: 'Mencari'
    }
  ];

  return (
    <div className="pb-24 px-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold text-klikjasa-purple">Permintaan Saya</h1>
        <Button asChild className="bg-klikjasa-purple">
          <Link to="/add-request">
            <PlusCircle className="mr-2" size={18} />
            Tambah
          </Link>
        </Button>
      </div>

      {mockRequests.length > 0 ? (
        <div className="grid gap-4">
          {mockRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{request.title}</CardTitle>
                <CardDescription>{request.category}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{request.description}</p>
                <p className="font-bold mt-2">{request.budget}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                  {request.status}
                </span>
                <Button variant="outline" size="sm">Edit</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 mb-4">Belum ada permintaan yang ditambahkan</p>
          <Button asChild className="bg-klikjasa-purple">
            <Link to="/add-request">
              <PlusCircle className="mr-2" size={18} />
              Tambah Permintaan
            </Link>
          </Button>
        </div>
      )}

      <BottomNavigation userType={userType || 'user'} />
    </div>
  );
};

export default MyRequests;
