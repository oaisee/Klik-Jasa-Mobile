
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { LogOut, ChevronRight, Edit2, Wallet, CreditCard, Settings, Info, Star, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, userType, setUserType, signOut } = useAuth();
  const [accountType, setAccountType] = useState<'user' | 'provider'>(userType || 'user');

  const handleUserTypeChange = (value: 'user' | 'provider') => {
    setAccountType(value);
    setUserType(value);
    toast.success(`Beralih ke akun ${value === 'user' ? 'Pengguna Jasa' : 'Penyedia Jasa'}`);
  };

  const handleLogout = async () => {
    await signOut();
  };

  // Saldo akun demo
  const balance = 500000;

  return (
    <div className="pb-24 px-4">
      <h1 className="text-2xl font-bold text-klikjasa-purple my-4">Profil</h1>
      
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4 flex-1">
              <h2 className="font-bold text-lg">{user?.email?.split('@')[0] || 'Pengguna'}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <Link to="/profile/settings">
              <Button variant="outline" size="icon">
                <Edit2 size={18} />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Saldo Akun</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Saldo Tersedia</p>
              <p className="text-2xl font-bold">Rp {balance.toLocaleString('id-ID')}</p>
            </div>
            <Button className="bg-klikjasa-purple">
              <CreditCard className="mr-2" size={18} />
              Top Up
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Tipe Akun</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={accountType} onValueChange={(value) => handleUserTypeChange(value as 'user' | 'provider')}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="user" id="user" />
              <Label htmlFor="user">Pengguna Jasa</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="provider" id="provider" />
              <Label htmlFor="provider">Penyedia Jasa</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      <div className="space-y-2">
        <Link to="/profile/favorites">
          <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
            <div className="flex items-center">
              <Heart size={20} className="text-red-500 mr-3" />
              <span>Favorit Saya</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </Link>
        
        <Link to="/profile/ratings">
          <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
            <div className="flex items-center">
              <Star size={20} className="text-yellow-500 mr-3" />
              <span>Penilaian Saya</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </Link>
        
        <Link to="/profile/settings">
          <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
            <div className="flex items-center">
              <Settings size={20} className="text-gray-500 mr-3" />
              <span>Pengaturan</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </Link>
        
        <Link to="/profile/about">
          <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
            <div className="flex items-center">
              <Info size={20} className="text-gray-500 mr-3" />
              <span>Tentang KlikJasa</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </Link>
        
        <Button 
          variant="destructive" 
          className="w-full mt-4" 
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
