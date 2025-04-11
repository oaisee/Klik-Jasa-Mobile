
import React, { useState, useEffect } from 'react';
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
import { 
  provinces, 
  getRegenciesByProvince, 
  getDistrictsByRegency, 
  getVillagesByDistrict 
} from '@/data/indonesianRegions';

const ProfileSettingsPage = () => {
  const { user } = useAuth();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedRegency, setSelectedRegency] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  
  // Filtered regions based on selections
  const [availableRegencies, setAvailableRegencies] = useState<Array<{ id: string; name: string }>>([]);
  const [availableDistricts, setAvailableDistricts] = useState<Array<{ id: string; name: string }>>([]);
  const [availableVillages, setAvailableVillages] = useState<Array<{ id: string; name: string }>>([]);
  
  // Update available regions when selections change
  useEffect(() => {
    if (selectedProvince) {
      setAvailableRegencies(getRegenciesByProvince(selectedProvince));
      setSelectedRegency('');
      setSelectedDistrict('');
      setSelectedVillage('');
    } else {
      setAvailableRegencies([]);
    }
  }, [selectedProvince]);
  
  useEffect(() => {
    if (selectedRegency) {
      setAvailableDistricts(getDistrictsByRegency(selectedRegency));
      setSelectedDistrict('');
      setSelectedVillage('');
    } else {
      setAvailableDistricts([]);
    }
  }, [selectedRegency]);
  
  useEffect(() => {
    if (selectedDistrict) {
      setAvailableVillages(getVillagesByDistrict(selectedDistrict));
      setSelectedVillage('');
    } else {
      setAvailableVillages([]);
    }
  }, [selectedDistrict]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct complete address from selections
    const address = {
      province: provinces.find(p => p.id === selectedProvince)?.name || '',
      regency: availableRegencies.find(r => r.id === selectedRegency)?.name || '',
      district: availableDistricts.find(d => d.id === selectedDistrict)?.name || '',
      village: availableVillages.find(v => v.id === selectedVillage)?.name || '',
      detail: addressDetail
    };
    
    console.log("Profile data to save:", {
      fullName,
      phone,
      email: user?.email,
      address,
      bio
    });
    
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
              <Input 
                id="fullName" 
                placeholder="Masukkan nama lengkap" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input 
                id="phone" 
                placeholder="Masukkan nomor telepon" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
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
                        <SelectItem key={province.id} value={province.id}>{province.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="regency">Kabupaten/Kota</Label>
                  <Select 
                    value={selectedRegency} 
                    onValueChange={setSelectedRegency}
                    disabled={!selectedProvince || availableRegencies.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kabupaten/kota" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRegencies.map((regency) => (
                        <SelectItem key={regency.id} value={regency.id}>{regency.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="district">Kecamatan</Label>
                  <Select 
                    value={selectedDistrict} 
                    onValueChange={setSelectedDistrict}
                    disabled={!selectedRegency || availableDistricts.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kecamatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDistricts.map((district) => (
                        <SelectItem key={district.id} value={district.id}>{district.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="village">Kelurahan/Desa</Label>
                  <Select 
                    value={selectedVillage} 
                    onValueChange={setSelectedVillage}
                    disabled={!selectedDistrict || availableVillages.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelurahan/desa" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVillages.map((village) => (
                        <SelectItem key={village.id} value={village.id}>{village.name}</SelectItem>
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
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
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
                value={bio}
                onChange={(e) => setBio(e.target.value)}
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
