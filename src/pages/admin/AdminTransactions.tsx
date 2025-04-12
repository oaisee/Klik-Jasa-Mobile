
import React, { useState } from 'react';
import { 
  Search, MoreVertical, Eye, Download, ReceiptText, Filter,
  Calendar, ChevronDown, ArrowUpDown, Info, CheckCircle, XCircle, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const AdminTransactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [viewReceiptDialog, setViewReceiptDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [dateRange, setDateRange] = useState('all');

  const transactions = [
    { 
      id: 'TX-1234', 
      user: 'Budi Santoso', 
      type: 'Top Up',
      method: 'Bank Transfer (BCA)',
      amount: 'Rp 150.000', 
      status: 'Sukses', 
      date: '15 Apr 2025 10:30',
      details: {
        accountNumber: '1234567890',
        bankName: 'BCA',
        senderName: 'Budi Santoso',
        paymentProof: 'https://example.com/proof.jpg',
        notes: 'Top up untuk pembelian layanan'
      }
    },
    { 
      id: 'TX-1235', 
      user: 'Dewi Anggraini', 
      type: 'Pembayaran Jasa',
      method: 'Saldo',
      amount: 'Rp 250.000', 
      status: 'Sukses', 
      date: '14 Apr 2025 15:45',
      details: {
        service: 'Jasa Pembersihan Rumah',
        provider: 'Ahmad Cleaning Service',
        duration: '3 jam',
        notes: 'Termasuk pembersihan kamar mandi'
      }
    },
    { 
      id: 'TX-1236', 
      user: 'Joko Widodo', 
      type: 'Top Up',
      method: 'GoPay',
      amount: 'Rp 100.000', 
      status: 'Pending', 
      date: '14 Apr 2025 08:22',
      details: {
        paymentId: 'GP78901234',
        phoneNumber: '081234567890',
        notes: 'Menunggu konfirmasi dari payment gateway'
      }
    },
    { 
      id: 'TX-1237', 
      user: 'Siti Nurhaliza', 
      type: 'Pembayaran Jasa',
      method: 'Saldo',
      amount: 'Rp 350.000', 
      status: 'Sukses', 
      date: '13 Apr 2025 19:15',
      details: {
        service: 'Jasa Tukang Ledeng',
        provider: 'Budi Plumbing',
        duration: '2 jam',
        notes: 'Perbaikan pipa bocor'
      }
    },
    { 
      id: 'TX-1238', 
      user: 'Ahmad Dhani', 
      type: 'Top Up',
      method: 'OVO',
      amount: 'Rp 200.000', 
      status: 'Gagal', 
      date: '12 Apr 2025 11:05',
      details: {
        paymentId: 'OV12345678',
        phoneNumber: '087654321098',
        errorCode: 'ERR-3456',
        errorMessage: 'Insufficient balance',
        notes: 'Pembayaran gagal - saldo tidak cukup'
      }
    },
    { 
      id: 'TX-1239', 
      user: 'Risa Saraswati', 
      type: 'Penarikan',
      method: 'Bank Transfer (BNI)',
      amount: 'Rp 500.000', 
      status: 'Sukses', 
      date: '11 Apr 2025 14:20',
      details: {
        accountNumber: '0987654321',
        bankName: 'BNI',
        accountHolder: 'Risa Saraswati',
        notes: 'Penarikan saldo dari hasil layanan'
      }
    },
    { 
      id: 'TX-1240', 
      user: 'Raditya Dika', 
      type: 'Top Up',
      method: 'DANA',
      amount: 'Rp 75.000', 
      status: 'Pending', 
      date: '11 Apr 2025 09:10',
      details: {
        paymentId: 'DN56789012',
        phoneNumber: '081234509876',
        notes: 'Menunggu konfirmasi pembayaran'
      }
    },
  ];

  const handleViewReceipt = (tx: any) => {
    setSelectedTransaction(tx);
    setViewReceiptDialog(true);
  };

  const handleVerifyPayment = (txId: string) => {
    toast.success(`Pembayaran dengan ID ${txId} telah diverifikasi`);
  };

  const handleDownloadReceipt = (txId: string) => {
    toast.success(`Bukti transaksi ${txId} telah diunduh`);
  };

  const filteredTransactions = transactions.filter(tx => {
    // Apply search query filter
    const matchesSearch = 
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.status.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = !statusFilter || tx.status === statusFilter;
    
    // Apply date range filter (simplified)
    let matchesDateRange = true;
    if (dateRange === 'today') {
      matchesDateRange = tx.date.includes('15 Apr 2025');
    } else if (dateRange === 'week') {
      matchesDateRange = true; // Just for demo, would need actual date parsing
    } else if (dateRange === 'month') {
      matchesDateRange = true; // Just for demo, would need actual date parsing
    }
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Summary statistics
  const totalTransactions = transactions.length;
  const successfulTransactions = transactions.filter(tx => tx.status === 'Sukses').length;
  const pendingTransactions = transactions.filter(tx => tx.status === 'Pending').length;
  const failedTransactions = transactions.filter(tx => tx.status === 'Gagal').length;
  
  const totalAmount = 'Rp 1.625.000'; // Would normally be calculated from actual transaction data

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Kelola Transaksi</h1>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter Lanjutan
            </Button>
            <Button className="bg-klikjasa-purple">
              <Download className="mr-2 h-4 w-4" />
              Ekspor Data
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Transaksi</p>
                  <p className="text-2xl font-bold">{totalTransactions}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Transaksi Sukses</p>
                  <p className="text-2xl font-bold">{successfulTransactions}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Transaksi Pending</p>
                  <p className="text-2xl font-bold">{pendingTransactions}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Nilai</p>
                  <p className="text-2xl font-bold">{totalAmount}</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <ReceiptText className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Cari transaksi..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {dateRange === 'all' && 'Semua Waktu'}
                  {dateRange === 'today' && 'Hari Ini'}
                  {dateRange === 'week' && 'Minggu Ini'}
                  {dateRange === 'month' && 'Bulan Ini'}
                </span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setDateRange('all')}>
                Semua Waktu
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange('today')}>
                Hari Ini
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange('week')}>
                Minggu Ini
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange('month')}>
                Bulan Ini
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>
                  {statusFilter ? statusFilter : 'Semua Status'}
                </span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                Semua Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Sukses')}>
                Sukses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Gagal')}>
                Gagal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">
                  <div className="flex items-center">
                    ID Transaksi
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="font-medium">Pengguna</TableHead>
                <TableHead className="font-medium">Tipe</TableHead>
                <TableHead className="font-medium">Metode</TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center">
                    Jumlah
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center">
                    Tanggal
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right font-medium">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-klikjasa-purple">{tx.id}</TableCell>
                    <TableCell>{tx.user}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        tx.type === 'Top Up' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        tx.type === 'Penarikan' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-green-50 text-green-700 border-green-200'
                      }>
                        {tx.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{tx.method}</TableCell>
                    <TableCell className="font-medium">{tx.amount}</TableCell>
                    <TableCell>
                      <Badge className={`${
                        tx.status === 'Sukses' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                        tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : 
                        'bg-red-100 text-red-800 hover:bg-red-100'
                      }`}>
                        {tx.status}
                      </Badge>
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
                          <DropdownMenuItem onClick={() => handleViewReceipt(tx)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Lihat Detail</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadReceipt(tx.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Unduh Bukti</span>
                          </DropdownMenuItem>
                          {tx.status === 'Pending' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleVerifyPayment(tx.id)}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                <span className="text-green-600">Verifikasi</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4 text-red-600" />
                                <span className="text-red-600">Tolak</span>
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    Tidak ada transaksi yang ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination placeholder - would normally be functional */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Menampilkan {filteredTransactions.length} dari {totalTransactions} transaksi
          </div>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled>
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm" className="bg-klikjasa-purple text-white">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>

      {/* View Transaction Details Dialog */}
      {selectedTransaction && (
        <Dialog open={viewReceiptDialog} onOpenChange={setViewReceiptDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detail Transaksi {selectedTransaction.id}</DialogTitle>
              <DialogDescription>
                {selectedTransaction.date}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Informasi Transaksi</TabsTrigger>
                <TabsTrigger value="user">Informasi Pengguna</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">ID Transaksi</Label>
                    <div className="font-medium">{selectedTransaction.id}</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Tanggal</Label>
                    <div className="font-medium">{selectedTransaction.date}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Jenis Transaksi</Label>
                    <div>
                      <Badge variant="outline" className={
                        selectedTransaction.type === 'Top Up' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        selectedTransaction.type === 'Penarikan' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-green-50 text-green-700 border-green-200'
                      }>
                        {selectedTransaction.type}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Status</Label>
                    <div>
                      <Badge className={`${
                        selectedTransaction.status === 'Sukses' ? 'bg-green-100 text-green-800' : 
                        selectedTransaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedTransaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Metode Pembayaran</Label>
                    <div className="font-medium">{selectedTransaction.method}</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Jumlah</Label>
                    <div className="font-bold text-lg">{selectedTransaction.amount}</div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Conditional details based on transaction type */}
                {selectedTransaction.type === 'Top Up' && selectedTransaction.details && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedTransaction.details.bankName && (
                        <>
                          <div>
                            <Label className="text-gray-500">Bank</Label>
                            <div>{selectedTransaction.details.bankName}</div>
                          </div>
                          <div>
                            <Label className="text-gray-500">Nomor Rekening</Label>
                            <div>{selectedTransaction.details.accountNumber}</div>
                          </div>
                        </>
                      )}
                      
                      {selectedTransaction.details.phoneNumber && (
                        <div>
                          <Label className="text-gray-500">Nomor Telepon</Label>
                          <div>{selectedTransaction.details.phoneNumber}</div>
                        </div>
                      )}
                      
                      {selectedTransaction.details.paymentId && (
                        <div>
                          <Label className="text-gray-500">ID Pembayaran</Label>
                          <div>{selectedTransaction.details.paymentId}</div>
                        </div>
                      )}
                    </div>
                    
                    {selectedTransaction.details.notes && (
                      <div>
                        <Label className="text-gray-500">Catatan</Label>
                        <div className="text-sm">{selectedTransaction.details.notes}</div>
                      </div>
                    )}
                  </>
                )}
                
                {selectedTransaction.type === 'Pembayaran Jasa' && selectedTransaction.details && (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label className="text-gray-500">Layanan</Label>
                        <div className="font-medium">{selectedTransaction.details.service}</div>
                      </div>
                      <div>
                        <Label className="text-gray-500">Penyedia Jasa</Label>
                        <div>{selectedTransaction.details.provider}</div>
                      </div>
                      <div>
                        <Label className="text-gray-500">Durasi</Label>
                        <div>{selectedTransaction.details.duration}</div>
                      </div>
                      {selectedTransaction.details.notes && (
                        <div>
                          <Label className="text-gray-500">Catatan</Label>
                          <div className="text-sm">{selectedTransaction.details.notes}</div>
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {selectedTransaction.type === 'Penarikan' && selectedTransaction.details && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-500">Bank</Label>
                        <div>{selectedTransaction.details.bankName}</div>
                      </div>
                      <div>
                        <Label className="text-gray-500">Nomor Rekening</Label>
                        <div>{selectedTransaction.details.accountNumber}</div>
                      </div>
                      <div>
                        <Label className="text-gray-500">Nama Pemilik Rekening</Label>
                        <div>{selectedTransaction.details.accountHolder}</div>
                      </div>
                    </div>
                    
                    {selectedTransaction.details.notes && (
                      <div>
                        <Label className="text-gray-500">Catatan</Label>
                        <div className="text-sm">{selectedTransaction.details.notes}</div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="user" className="space-y-4 pt-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                    {selectedTransaction.user.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{selectedTransaction.user}</h3>
                    <p className="text-gray-500">ID: USR-{Math.floor(Math.random() * 10000)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">Email</Label>
                    <div>user@example.com</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Telepon</Label>
                    <div>+62 812-3456-7890</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Terdaftar Sejak</Label>
                    <div>10 Jan 2025</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Status</Label>
                    <div>
                      <Badge className="bg-green-100 text-green-800">
                        Aktif
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="text-gray-500">Riwayat Transaksi Terbaru</Label>
                  <div className="mt-2 space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div className="text-sm">
                          <div className="font-medium">TX-{Math.floor(Math.random() * 10000)}</div>
                          <div className="text-gray-500 text-xs">12 Apr 2025</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">Rp {Math.floor(Math.random() * 100) * 1000}</div>
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Sukses
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              {selectedTransaction.status === 'Pending' && (
                <div className="flex space-x-2 w-full">
                  <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                    Tolak
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleVerifyPayment(selectedTransaction.id);
                      setViewReceiptDialog(false);
                    }}
                  >
                    Verifikasi
                  </Button>
                </div>
              )}
              {selectedTransaction.status !== 'Pending' && (
                <Button 
                  className="w-full bg-klikjasa-purple"
                  onClick={() => handleDownloadReceipt(selectedTransaction.id)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Bukti Transaksi
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default AdminTransactions;
