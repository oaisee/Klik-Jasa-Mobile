
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const ProfileSettingsPage = () => {
  const { user } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil berhasil diperbarui!");
  };

  return (
    <div className="pb-6 px-4">
      <div className="flex items-center my-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-klikjasa-purple ml-2">Pengaturan Profil</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informasi Pribadi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center mb-6">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-bold mb-2">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Upload size={16} />
                Unggah Foto
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input id="fullName" placeholder="Masukkan nama lengkap" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input id="phone" placeholder="Masukkan nomor telepon" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user?.email || ''} disabled />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Textarea id="address" placeholder="Masukkan alamat lengkap" rows={3} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Ceritakan sedikit tentang diri Anda" 
                rows={3}
              />
            </div>
            
            <Button type="submit" className="w-full bg-klikjasa-purple">Simpan Perubahan</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettingsPage;
