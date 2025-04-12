
import React from 'react';
import { 
  Users, ShoppingBag, MessageSquare, DollarSign, 
  TrendingUp, ArrowUpRight, ArrowDownRight, Activity,
  Calendar, Clock, CreditCard, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const AdminDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      title: 'Total Pengguna',
      value: '2,850',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Layanan',
      value: '1,250',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-purple-500'
    },
    {
      title: 'Permintaan',
      value: '720',
      change: '+5.1%',
      trend: 'up',
      icon: MessageSquare,
      color: 'bg-green-500'
    },
    {
      title: 'Transaksi',
      value: 'Rp 15.8jt',
      change: '-2.5%',
      trend: 'down',
      icon: DollarSign,
      color: 'bg-amber-500'
    }
  ];

  const chartData = [
    { name: 'Jan', pengguna: 150, layanan: 80, transaksi: 120 },
    { name: 'Feb', pengguna: 180, layanan: 90, transaksi: 150 },
    { name: 'Mar', pengguna: 250, layanan: 140, transaksi: 180 },
    { name: 'Apr', pengguna: 270, layanan: 160, transaksi: 200 },
    { name: 'Mei', pengguna: 300, layanan: 180, transaksi: 220 },
    { name: 'Jun', pengguna: 350, layanan: 200, transaksi: 250 },
  ];

  const pieChartData = [
    { name: 'Kebersihan', value: 35 },
    { name: 'Perbaikan Rumah', value: 25 },
    { name: 'Kecantikan', value: 15 },
    { name: 'Transportasi', value: 10 },
    { name: 'Lainnya', value: 15 },
  ];

  const COLORS = ['#8b5cf6', '#3b82f6', '#22c55e', '#f59e0b', '#94a3b8'];

  const recentTransactions = [
    { id: 'TX-1234', user: 'Budi Santoso', amount: 'Rp 150.000', date: '15 Apr 2025', status: 'Sukses' },
    { id: 'TX-1235', user: 'Dewi Anggraini', amount: 'Rp 250.000', date: '14 Apr 2025', status: 'Sukses' },
    { id: 'TX-1236', user: 'Joko Widodo', amount: 'Rp 100.000', date: '14 Apr 2025', status: 'Pending' },
    { id: 'TX-1237', user: 'Siti Nurhaliza', amount: 'Rp 350.000', date: '13 Apr 2025', status: 'Sukses' },
    { id: 'TX-1238', user: 'Ahmad Dhani', amount: 'Rp 200.000', date: '12 Apr 2025', status: 'Gagal' },
  ];

  const activeUsers = [
    { name: 'Budi Santoso', role: 'Penyedia Jasa', lastActive: '5 menit yang lalu', services: 12 },
    { name: 'Dewi Anggraini', role: 'Pengguna Jasa', lastActive: '10 menit yang lalu', requests: 5 },
    { name: 'Ahmad Dhani', role: 'Penyedia Jasa', lastActive: '15 menit yang lalu', services: 8 },
    { name: 'Siti Nurhaliza', role: 'Penyedia Jasa', lastActive: '25 menit yang lalu', services: 15 },
  ];

  const pendingApprovals = [
    { type: 'Layanan', name: 'Jasa Tukang Ledeng 24 Jam', requestedBy: 'Ahmad Dhani', date: '15 Apr 2025' },
    { type: 'Permintaan', name: 'Renovasi Kamar Mandi', requestedBy: 'Dewi Anggraini', date: '14 Apr 2025' },
    { type: 'Layanan', name: 'Service AC & Kulkas', requestedBy: 'Budi Santoso', date: '14 Apr 2025' },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>15 Apr 2025</span>
            </Button>
            <Badge variant="outline" className="flex items-center bg-blue-50 text-blue-700 border-blue-200">
              <Clock className="mr-1 h-3 w-3" />
              <span>Terakhir diperbarui: 10:30 WIB</span>
            </Badge>
          </div>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="text-white" size={20} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="text-green-500" size={16} />
                  ) : (
                    <ArrowDownRight className="text-red-500" size={16} />
                  )}
                  <span 
                    className={`text-sm ml-1 ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">dari bulan lalu</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bar Chart */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Statistik Bulanan</CardTitle>
                    <CardDescription>Tren pengguna, layanan, dan transaksi</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Ekspor Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #f0f0f0',
                          borderRadius: '6px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }} 
                      />
                      <Legend 
                        align="right" 
                        verticalAlign="top"
                        wrapperStyle={{ paddingBottom: '10px' }}
                      />
                      <Bar dataKey="pengguna" fill="#3b82f6" name="Pengguna" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="layanan" fill="#8b5cf6" name="Layanan" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="transaksi" fill="#f59e0b" name="Transaksi" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Transaksi Terbaru</CardTitle>
                    <CardDescription>5 transaksi terakhir di platform</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <span>Lihat Semua</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Transaksi</TableHead>
                      <TableHead>Pengguna</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-medium">{tx.id}</TableCell>
                        <TableCell>{tx.user}</TableCell>
                        <TableCell>{tx.amount}</TableCell>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>
                          <Badge className={`${
                            tx.status === 'Sukses' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                            tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : 
                            'bg-red-100 text-red-800 hover:bg-red-100'
                          }`}>
                            {tx.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pie Chart */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Kategori Layanan</CardTitle>
                <CardDescription>Distribusi layanan berdasarkan kategori</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #f0f0f0',
                          borderRadius: '6px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value: number) => [`${value}%`, 'Persentase']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-center flex-wrap gap-2">
                  {pieChartData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center space-x-1">
                      <div className="w-3 h-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-xs">{entry.name} ({entry.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pengguna Aktif */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pengguna Aktif</CardTitle>
                <CardDescription>Pengguna yang baru saja aktif</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeUsers.map((user, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <Badge variant="outline" className="text-[10px] h-4 mr-1">
                              {user.role}
                            </Badge>
                            {user.lastActive}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {user.services ? `${user.services} Layanan` : `${user.requests} Permintaan`}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full text-klikjasa-purple">
                  Lihat Semua Pengguna
                </Button>
              </CardFooter>
            </Card>

            {/* Persetujuan Tertunda */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Persetujuan Tertunda</CardTitle>
                <CardDescription>Layanan & permintaan yang perlu persetujuan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`${
                            item.type === 'Layanan' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                            'bg-purple-50 text-purple-700 border-purple-200'
                          }`}>
                            {item.type}
                          </Badge>
                          <p className="text-sm font-medium">{item.name}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Oleh: {item.requestedBy} • {item.date}
                        </p>
                      </div>
                      <Button size="sm" className="bg-klikjasa-purple">
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full text-klikjasa-purple">
                  Lihat Semua Persetujuan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
