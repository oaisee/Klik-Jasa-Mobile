
import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

const AdminServices: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState([
    { 
      id: 1, 
      title: 'Jasa Bersih Rumah', 
      provider: 'Dewi Anggraini',
      category: 'Kebersihan',
      subcategory: 'Kebersihan Rumah',
      price: 'Rp 150.000',
      status: 'Aktif', 
      date: '10 Apr 2025',
      verified: true
    },
    { 
      id: 2, 
      title: 'Perbaikan AC', 
      provider: 'Ahmad Rizki',
      category: 'Perbaikan Rumah',
      subcategory: 'Perbaikan AC',
      price: 'Rp 250.000',
      status: 'Aktif', 
      date: '12 Apr 2025',
      verified: true
    },
    { 
      id: 3, 
      title: 'Potong Rambut Pria', 
      provider: 'Budi Santoso',
      category: 'Kecantikan & Kesehatan',
      subcategory: 'Perawatan Rambut',
      price: 'Rp 50.000',
      status: 'Menunggu Verifikasi', 
      date: '15 Mar 2025',
      verified: false
    },
    { 
      id: 4, 
      title: 'Ojek Online', 
      provider: 'Siti Nurhaliza',
      category: 'Transportasi',
      subcategory: 'Ojek Online',
      price: 'Rp 10.000/km',
      status: 'Tidak Aktif', 
      date: '05 Feb 2025',
      verified: true
    },
    { 
      id: 5, 
      title: 'Les Privat Matematika', 
      provider: 'Joko Widodo',
      category: 'Pendidikan & Pelatihan',
      subcategory: 'Guru Privat',
      price: 'Rp 100.000/jam',
      status: 'Aktif', 
      date: '20 Jan 2025',
      verified: true
    },
  ]);

  const handleToggleStatus = (serviceId: number) => {
    setServices(services.map(service => {
      if (service.id === serviceId) {
        const newStatus = service.status === 'Aktif' ? 'Tidak Aktif' : 'Aktif';
        toast.success(`Status layanan berhasil diubah menjadi ${newStatus}`);
        return { ...service, status: newStatus };
      }
      return service;
    }));
  };

  const handleVerify = (serviceId: number) => {
    setServices(services.map(service => {
      if (service.id === serviceId) {
        toast.success(`Layanan berhasil diverifikasi`);
        return { ...service, verified: true, status: 'Aktif' };
      }
      return service;
    }));
  };

  const handleDeleteService = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    setServices(services.filter(service => service.id !== serviceId));
    toast.success(`Layanan ${service?.title} berhasil dihapus`);
  };

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Kelola Layanan</h1>
          <Button className="bg-klikjasa-purple">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Layanan
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Cari layanan..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Layanan</TableHead>
                <TableHead>Penyedia</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verifikasi</TableHead>
                <TableHead>Terdaftar</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>{service.provider}</TableCell>
                    <TableCell>
                      <div>{service.category}</div>
                      <div className="text-xs text-gray-500">{service.subcategory}</div>
                    </TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        service.status === 'Aktif' 
                          ? 'bg-green-100 text-green-800' 
                          : service.status === 'Menunggu Verifikasi'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {service.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {service.verified ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>{service.date}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Buka menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          {!service.verified && (
                            <DropdownMenuItem onClick={() => handleVerify(service.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Verifikasi</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleToggleStatus(service.id)}>
                            {service.status === 'Aktif' ? (
                              <>
                                <XCircle className="mr-2 h-4 w-4" />
                                <span>Nonaktifkan</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Aktifkan</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Hapus</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    Tidak ada layanan yang ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
