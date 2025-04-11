
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

const AddRequest = () => {
  const { userType } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Permintaan berhasil ditambahkan!");
  };

  return (
    <div className="pb-24 px-4">
      <h1 className="text-2xl font-bold text-klikjasa-purple my-4">Tambah Permintaan</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detail Permintaan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Permintaan</Label>
              <Input id="title" placeholder="Masukkan judul permintaan" required />
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
              <Label htmlFor="description">Deskripsi Permintaan</Label>
              <Textarea 
                id="description" 
                placeholder="Jelaskan detail jasa yang Anda butuhkan" 
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (Rp)</Label>
              <div className="flex gap-4">
                <Input 
                  id="budgetMin" 
                  type="number" 
                  placeholder="Minimum" 
                  required 
                />
                <Input 
                  id="budgetMax" 
                  type="number" 
                  placeholder="Maximum" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Gambar Pendukung (Opsional)</Label>
              <Input id="image" type="file" className="cursor-pointer" />
            </div>
            
            <Button type="submit" className="w-full bg-klikjasa-purple">Simpan Permintaan</Button>
          </form>
        </CardContent>
      </Card>

      <BottomNavigation userType={userType || 'user'} />
    </div>
  );
};

export default AddRequest;
