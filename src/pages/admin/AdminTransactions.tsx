
import React, { useState } from 'react';
import { Search, MoreVertical, Eye, Download, ReceiptText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

const AdminTransactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([
    { 
      id: 'TX-1234', 
      user: 'Budi Santoso', 
      type: 'Top Up',
      method: 'Bank Transfer (BCA)',
      amount: 'Rp 150.000', 
      status: 'Sukses', 
      date: '15 Apr 2025 10:30' 
    },
    { 
      id: 'TX-1235', 
      user: 'Dewi Anggraini', 
      type: 'Pembayaran Jasa',
      method: 'Saldo',
      amount: 'Rp 250.000', 
      status: 'Sukses', 
      date: '14 Apr 2025 15:45' 
    },
    { 
      id: 'TX-1236', 
      user: 'Joko Widodo', 
      type: 'Top Up',
      method: 'GoPay',
      amount: 'Rp 100.000', 
      status: 'Pending', 
      date: '14 Apr 2025 08:22' 
    },
    { 
      id: 'TX-1237', 
      user: 'Siti Nurhaliza', 
      type: 'Pembayaran Jasa',
      method: 'Saldo',
      amount: 'Rp 350.000', 
      status: 'Sukses', 
      date: '13 Apr 2025 19:15' 
    },
    { 
      id: 'TX-1238', 
      user: 'Ahmad Dhani', 
      type: 'Top Up',
      method: 'OVO',
      amount: 'Rp 200.000', 
      status: 'Gagal', 
      date: '12 Apr 2025 11:05' 
    },
  ]);

  const handleViewReceipt = (txId: string) => {
    toast.info(`Melihat bukti transaksi ${txId}`);
  };

  const handleDownloadReceipt = (txId: string) => {
    toast.success(`Bukti transaksi ${txId} telah diunduh`);
  };

  const filteredTransactions = transactions.filter(tx => 
    tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Kelola Transaksi</h1>
          <Button className="bg-klikjasa-purple">
            <Download className="mr-2 h-4 w-4" />
            Ekspor Data
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Cari transaksi..."
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
                <TableHead>ID Transaksi</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.id}</TableCell>
                    <TableCell>{tx.user}</TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{tx.method}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tx.status === 'Sukses' ? 'bg-green-100 text-green-800' : 
                        tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {tx.status}
                      </span>
                    </TableCell>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Buka menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewReceipt(tx.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Lihat Bukti</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadReceipt(tx.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Unduh Bukti</span>
                          </DropdownMenuItem>
                          {tx.status === 'Pending' && (
                            <DropdownMenuItem>
                              <ReceiptText className="mr-2 h-4 w-4" />
                              <span>Verifikasi Pembayaran</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    Tidak ada transaksi yang ditemukan
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

export default AdminTransactions;
