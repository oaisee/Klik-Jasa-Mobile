
import React, { useState } from 'react';
import { Search, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

const AdminRequests: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState([
    { 
      id: 1, 
      title: 'Butuh Jasa Bersih Rumah', 
      user: 'Budi Santoso',
      category: 'Kebersihan',
      subcategory: 'Kebersihan Rumah',
      budget: 'Rp 150.000',
      status: 'Terbuka', 
      date: '10 Apr 2025',
      location: 'Jakarta Selatan'
    },
    { 
      id: 2, 
      title: 'Perbaikan AC rusak', 
      user: 'Dewi Anggraini',
      category: 'Perbaikan Rumah',
      subcategory: 'Perbaikan AC',
      budget: 'Rp 200.000 - 300.000',
      status: 'Dalam Proses', 
      date: '12 Apr 2025',
      location: 'Jakarta Barat'
    },
    { 
      id: 3, 
      title: 'Guru Les Matematika', 
      user: 'Joko Widodo',
      category: 'Pendidikan & Pelatihan',
      subcategory: 'Guru Privat',
      budget: 'Rp 100.000/jam',
      status: 'Terbuka', 
      date: '15 Mar 2025',
      location: 'Jakarta Pusat'
    },
    { 
      id: 4, 
      title: 'Antar Jemput Anak Sekolah', 
      user: 'Siti Nurhaliza',
      category: 'Bantuan Pribadi',
      subcategory: 'Jasa Antar Jemput Anak Sekolah',
      budget: 'Rp 500.000/bulan',
      status: 'Selesai', 
      date: '05 Feb 2025',
      location: 'Jakarta Timur'
    },
    { 
      id: 5, 
      title: 'Desain Logo Perusahaan', 
      user: 'Ahmad Dhani',
      category: 'Desain & Kreatif',
      subcategory: 'Desain Grafis',
      budget: 'Rp 300.000 - 500.000',
      status: 'Dibatalkan', 
      date: '20 Jan 2025',
      location: 'Jakarta Utara'
    },
  ]);

  const handleDeleteRequest = (requestId: number) => {
    const request = requests.find(r => r.id === requestId);
    setRequests(requests.filter(request => request.id !== requestId));
    toast.success(`Permintaan ${request?.title} berhasil dihapus`);
  };

  const filteredRequests = requests.filter(request => 
    request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Kelola Permintaan</h1>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Cari permintaan..."
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
                <TableHead>Permintaan</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.title}</TableCell>
                    <TableCell>{request.user}</TableCell>
                    <TableCell>
                      <div>{request.category}</div>
                      <div className="text-xs text-gray-500">{request.subcategory}</div>
                    </TableCell>
                    <TableCell>{request.budget}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.status === 'Terbuka' 
                          ? 'bg-blue-100 text-blue-800' 
                          : request.status === 'Dalam Proses'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'Selesai'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>{request.location}</TableCell>
                    <TableCell>{request.date}</TableCell>
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
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Lihat Detail</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDeleteRequest(request.id)}
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
                    Tidak ada permintaan yang ditemukan
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

export default AdminRequests;
