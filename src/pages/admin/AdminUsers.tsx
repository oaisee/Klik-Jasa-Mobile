
import React, { useState } from 'react';
import { Search, UserPlus, MoreVertical, Edit, Trash2, UserCheck, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

const AdminUsers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'Budi Santoso', 
      email: 'budi@example.com', 
      phone: '081234567890', 
      role: 'Pengguna Jasa', 
      status: 'Aktif', 
      date: '10 Apr 2025' 
    },
    { 
      id: 2, 
      name: 'Dewi Anggraini', 
      email: 'dewi@example.com', 
      phone: '081234567891', 
      role: 'Penyedia Jasa', 
      status: 'Aktif', 
      date: '12 Apr 2025' 
    },
    { 
      id: 3, 
      name: 'Joko Widodo', 
      email: 'joko@example.com', 
      phone: '081234567892', 
      role: 'Pengguna Jasa', 
      status: 'Aktif', 
      date: '15 Mar 2025' 
    },
    { 
      id: 4, 
      name: 'Siti Nurhaliza', 
      email: 'siti@example.com', 
      phone: '081234567893', 
      role: 'Penyedia Jasa', 
      status: 'Tidak Aktif', 
      date: '05 Feb 2025' 
    },
    { 
      id: 5, 
      name: 'Ahmad Dhani', 
      email: 'ahmad@example.com', 
      phone: '081234567894', 
      role: 'Pengguna Jasa', 
      status: 'Aktif', 
      date: '20 Jan 2025' 
    },
  ]);

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'Aktif' ? 'Tidak Aktif' : 'Aktif';
        toast.success(`Status ${user.name} berhasil diubah menjadi ${newStatus}`);
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const handleDeleteUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    setUsers(users.filter(user => user.id !== userId));
    toast.success(`Pengguna ${user?.name} berhasil dihapus`);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Kelola Pengguna</h1>
          <Button className="bg-klikjasa-purple">
            <UserPlus className="mr-2 h-4 w-4" />
            Tambah Pengguna
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Cari pengguna..."
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
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>No. Telepon</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terdaftar</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.date}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                            {user.status === 'Aktif' ? (
                              <>
                                <Ban className="mr-2 h-4 w-4" />
                                <span>Nonaktifkan</span>
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-2 h-4 w-4" />
                                <span>Aktifkan</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDeleteUser(user.id)}
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
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    Tidak ada pengguna yang ditemukan
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

export default AdminUsers;
