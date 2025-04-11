
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from "@/components/ui/switch";
import { Label } from '@/components/ui/label';
import { 
  Settings, LogOut, Wallet, History, 
  CreditCard, HeartHandshake 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user, userType, setUserType, logout } = useAuth();
  const [accountBalance, setAccountBalance] = useState(0); // Replace with actual balance from API
  
  const handleAccountTypeChange = (checked: boolean) => {
    const newType = checked ? 'provider' : 'user';
    setUserType(newType);
    toast.success(`Akun berhasil dialihkan ke ${checked ? 'Penyedia Jasa' : 'Pengguna Jasa'}`);
  };
  
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="pb-24 px-4">
      <h1 className="text-2xl font-bold text-klikjasa-purple my-4">Profil</h1>
      
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">{user?.email}</h2>
              <div className="flex items-center mt-1">
                <Switch 
                  id="account-type" 
                  checked={userType === 'provider'}
                  onCheckedChange={handleAccountTypeChange}
                  className="mr-2"
                />
                <Label htmlFor="account-type" className="text-sm text-gray-600">
                  {userType === 'provider' ? 'Penyedia Jasa' : 'Pengguna Jasa'}
                </Label>
              </div>
            </div>
          </div>
          
          <div className="bg-klikjasa-purple text-white p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">Saldo Anda</p>
                <p className="text-2xl font-bold">Rp {accountBalance.toLocaleString('id-ID')}</p>
              </div>
              <Button 
                variant="outline" 
                className="bg-white text-klikjasa-purple border-none"
                asChild
              >
                <Link to="/topup">Top Up</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4">
        <Link to="/profile/settings">
          <Card className="hover:bg-gray-50">
            <CardContent className="p-4 flex items-center">
              <Settings className="mr-3 text-klikjasa-purple" size={20} />
              <span>Pengaturan Profil</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/transaction-history">
          <Card className="hover:bg-gray-50">
            <CardContent className="p-4 flex items-center">
              <History className="mr-3 text-klikjasa-purple" size={20} />
              <span>Riwayat Transaksi</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/topup">
          <Card className="hover:bg-gray-50">
            <CardContent className="p-4 flex items-center">
              <Wallet className="mr-3 text-klikjasa-purple" size={20} />
              <span>Top Up Saldo</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/payment-methods">
          <Card className="hover:bg-gray-50">
            <CardContent className="p-4 flex items-center">
              <CreditCard className="mr-3 text-klikjasa-purple" size={20} />
              <span>Metode Pembayaran</span>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/help-center">
          <Card className="hover:bg-gray-50">
            <CardContent className="p-4 flex items-center">
              <HeartHandshake className="mr-3 text-klikjasa-purple" size={20} />
              <span>Pusat Bantuan</span>
            </CardContent>
          </Card>
        </Link>
        
        <Button 
          variant="outline" 
          className="border-red-300 text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2" size={18} />
          Keluar
        </Button>
      </div>

      <BottomNavigation userType={userType || 'user'} />
    </div>
  );
};

export default ProfilePage;
