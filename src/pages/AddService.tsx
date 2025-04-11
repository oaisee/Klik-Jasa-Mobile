
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AddService = () => {
  const { userType } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Layanan berhasil ditambahkan!");
  };

  return (
    <div className="pb-24 px-4">
      <h1 className="text-2xl font-bold text-klikjasa-purple my-4">Tambah Layanan</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detail Layanan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Layanan</Label>
              <Input id="title" placeholder="Masukkan judul layanan" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elektronik">Elektronik</SelectItem>
                  <SelectItem value="desain">Desain</SelectItem>
                  <SelectItem value="kebersihan">Kebersihan</SelectItem>
                  <SelectItem value="edukasi">Edukasi</SelectItem>
                  <SelectItem value="transportasi">Transportasi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Layanan</Label>
              <Textarea 
                id="description" 
                placeholder="Jelaskan detail layanan yang Anda tawarkan" 
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Harga (Rp)</Label>
              <Input 
                id="price" 
                type="number" 
                placeholder="Masukkan harga layanan" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Gambar Layanan</Label>
              <Input id="image" type="file" className="cursor-pointer" />
            </div>
            
            <Button type="submit" className="w-full bg-klikjasa-purple">Simpan Layanan</Button>
          </form>
        </CardContent>
      </Card>

      <BottomNavigation userType={userType || 'provider'} />
    </div>
  );
};

export default AddService;
