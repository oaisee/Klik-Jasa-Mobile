
import React from 'react';
import { 
  Users, ShoppingBag, MessageSquare, DollarSign, 
  TrendingUp, ArrowUpRight, ArrowDownRight, Activity 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';

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

  const recentTransactions = [
    { id: 'TX-1234', user: 'Budi Santoso', amount: 'Rp 150.000', date: '15 Apr 2025', status: 'Sukses' },
    { id: 'TX-1235', user: 'Dewi Anggraini', amount: 'Rp 250.000', date: '14 Apr 2025', status: 'Sukses' },
    { id: 'TX-1236', user: 'Joko Widodo', amount: 'Rp 100.000', date: '14 Apr 2025', status: 'Pending' },
    { id: 'TX-1237', user: 'Siti Nurhaliza', amount: 'Rp 350.000', date: '13 Apr 2025', status: 'Sukses' },
    { id: 'TX-1238', user: 'Ahmad Dhani', amount: 'Rp 200.000', date: '12 Apr 2025', status: 'Gagal' },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <span className="text-sm text-gray-500">Terakhir diperbarui: 15 Apr 2025, 10:30</span>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
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

        {/* Grafik */}
        <Card>
          <CardHeader>
            <CardTitle>Statistik Bulanan</CardTitle>
            <CardDescription>Tren pengguna, layanan, dan transaksi dalam 6 bulan terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pengguna" fill="#3b82f6" name="Pengguna" />
                  <Bar dataKey="layanan" fill="#8b5cf6" name="Layanan" />
                  <Bar dataKey="transaksi" fill="#f59e0b" name="Transaksi" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Transaksi Terbaru */}
        <Card>
          <CardHeader>
            <CardTitle>Transaksi Terbaru</CardTitle>
            <CardDescription>5 transaksi terakhir di platform</CardDescription>
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
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tx.status === 'Sukses' ? 'bg-green-100 text-green-800' : 
                        tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {tx.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
