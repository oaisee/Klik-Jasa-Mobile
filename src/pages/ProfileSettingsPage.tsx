
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

// Simplified list of Indonesian provinces for demo purposes
const provinces = [
  'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Jambi', 'Sumatera Selatan', 
  'Bengkulu', 'Lampung', 'Kepulauan Bangka Belitung', 'Kepulauan Riau', 'DKI Jakarta', 
  'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Banten', 'Bali', 
  'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat', 'Kalimantan Tengah', 
  'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara', 
  'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 
  'Sulawesi Barat', 'Maluku', 'Maluku Utara', 'Papua', 'Papua Barat'
];

const ProfileSettingsPage = () => {
  const { user } = useAuth();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedRegency, setSelectedRegency] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  
  // These would normally be fetched from API based on the parent selection
  const regencies = ['Kabupaten A', 'Kabupaten B', 'Kota C'];
  const districts = ['Kecamatan X', 'Kecamatan Y', 'Kecamatan Z'];
  const villages = ['Desa 1', 'Kelurahan 2', 'Desa 3'];
  
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
              <Label>Alamat</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="province">Provinsi</Label>
                  <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih provinsi" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province} value={province}>{province}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="regency">Kabupaten/Kota</Label>
                  <Select 
                    value={selectedRegency} 
                    onValueChange={setSelectedRegency}
                    disabled={!selectedProvince}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kabupaten/kota" />
                    </SelectTrigger>
                    <SelectContent>
                      {regencies.map((regency) => (
                        <SelectItem key={regency} value={regency}>{regency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="district">Kecamatan</Label>
                  <Select 
                    value={selectedDistrict} 
                    onValueChange={setSelectedDistrict}
                    disabled={!selectedRegency}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kecamatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="village">Kelurahan/Desa</Label>
                  <Select 
                    value={selectedVillage} 
                    onValueChange={setSelectedVillage}
                    disabled={!selectedDistrict}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelurahan/desa" />
                    </SelectTrigger>
                    <SelectContent>
                      {villages.map((village) => (
                        <SelectItem key={village} value={village}>{village}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="addressDetail">Detail Alamat</Label>
                  <Textarea 
                    id="addressDetail" 
                    placeholder="Masukkan detail alamat (nama jalan, nomor rumah, RT/RW, dll.)" 
                    rows={2}
                  />
                </div>
              </div>
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
