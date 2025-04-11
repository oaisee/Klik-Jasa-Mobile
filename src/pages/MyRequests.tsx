
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MapPin, Edit, Trash2 } from 'lucide-react';
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

interface RequestItem {
  id: number;
  title: string;
  description: string;
  budget: string;
  category: string;
  subcategory: string;
  status: 'Mencari' | 'Diproses' | 'Selesai' | 'Dibatalkan';
  location?: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
}

const MyRequests = () => {
  const { userType } = useAuth();
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data load
  useEffect(() => {
    // Simulate API call to fetch user's requests
    setTimeout(() => {
      const mockRequests = [
        {
          id: 1,
          title: 'Butuh Jasa Perbaikan AC',
          description: 'AC tidak dingin, perlu teknisi segera',
          budget: 'Rp 200.000 - 300.000',
          category: 'Perbaikan Elektronik',
          subcategory: 'Perbaikan AC',
          status: 'Mencari' as const,
          location: {
            latitude: -6.2088,
            longitude: 106.8456
          },
          createdAt: '2023-04-10T08:30:00Z'
        },
        {
          id: 2,
          title: 'Jasa Design Logo',
          description: 'Butuh design logo untuk coffee shop dengan konsep minimalis',
          budget: 'Rp 300.000 - 500.000',
          category: 'Desain & Kreatif',
          subcategory: 'Desain Grafis',
          status: 'Mencari' as const,
          location: {
            latitude: -6.2156,
            longitude: 106.8386
          },
          createdAt: '2023-04-09T14:15:00Z'
        },
        {
          id: 3,
          title: 'Guru Les Matematika',
          description: 'Mencari guru les matematika untuk anak SMP kelas 2',
          budget: 'Rp 100.000 - 150.000 per pertemuan',
          category: 'Pendidikan & Pelatihan',
          subcategory: 'Tutor Privat',
          status: 'Diproses' as const,
          createdAt: '2023-04-05T09:45:00Z'
        }
      ];
      
      setRequests(mockRequests);
      setLoading(false);
    }, 800);
  }, []);
  
  const handleDeleteRequest = (id: number) => {
    setRequests(prevRequests => prevRequests.filter(req => req.id !== id));
    toast.success("Permintaan berhasil dihapus");
  };
  
  const handleCancelRequest = (id: number) => {
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === id ? { ...req, status: 'Dibatalkan' as const } : req
      )
    );
    toast.success("Permintaan berhasil dibatalkan");
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Mencari':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{status}</Badge>;
      case 'Diproses':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">{status}</Badge>;
      case 'Selesai':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{status}</Badge>;
      case 'Dibatalkan':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">{status}</Badge>;
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
        <h1 className="text-2xl font-bold text-klikjasa-purple">Permintaan Saya</h1>
        <Button asChild className="bg-klikjasa-purple">
          <Link to="/add-request">
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
      ) : requests.length > 0 ? (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{request.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <span className="mr-2">{request.category} &gt; {request.subcategory}</span>
                      {getStatusBadge(request.status)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {request.status === 'Mencari' && (
                      <>
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/edit-request/${request.id}`}>
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
                              <AlertDialogTitle>Hapus Permintaan</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus permintaan ini? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleDeleteRequest(request.id)}
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{request.description}</p>
                <p className="font-bold mt-2">{request.budget}</p>
                {request.location && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    <span>
                      {request.location.latitude.toFixed(4)}, {request.location.longitude.toFixed(4)}
                    </span>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Dibuat pada: {formatDate(request.createdAt)}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                {request.status === 'Mencari' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => handleCancelRequest(request.id)}
                  >
                    Batalkan
                  </Button>
                )}
                <div className="flex-grow"></div>
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-klikjasa-purple"
                >
                  Lihat Penawaran
                </Button>
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
