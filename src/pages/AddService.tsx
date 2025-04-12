
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import FormField from '@/components/forms/FormField';
import CategorySelector from '@/components/forms/CategorySelector';
import { SinglePriceInput } from '@/components/forms/PriceInput';
import { serviceCategories } from '@/utils/serviceCategories';

const AddService = () => {
  const { userType } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [price, setPrice] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !categoryId || !subcategoryId || !price) {
      toast.error('Silakan lengkapi semua field yang wajib diisi');
      return;
    }
    
    const category = serviceCategories.find(cat => cat.id === categoryId);
    const subcategory = category?.subcategories.find(sub => sub.id === subcategoryId);
    
    // Create new service
    const newService = {
      id: Date.now().toString(),
      title,
      description,
      category: category?.name,
      subcategory: subcategory?.name,
      price: `Rp ${Number(price).toLocaleString('id-ID')}`,
      createdAt: new Date().toISOString()
    };
    
    console.log("New service:", newService);
    
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
            <FormField
              id="title"
              label="Judul Layanan"
              placeholder="Masukkan judul layanan"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            
            <CategorySelector
              categoryId={categoryId}
              subcategoryId={subcategoryId}
              setCategoryId={setCategoryId}
              setSubcategoryId={setSubcategoryId}
            />
            
            <FormField
              id="description"
              label="Deskripsi Layanan"
              type="textarea"
              placeholder="Jelaskan detail layanan yang Anda tawarkan"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
            
            <SinglePriceInput
              label="Harga (Rp)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Masukkan harga layanan"
              required
            />
            
            <div className="space-y-2">
              <FormField
                id="image"
                label="Gambar Layanan"
                type="file"
                value=""
                onChange={() => {}}
                className="cursor-pointer"
              />
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
