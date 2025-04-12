
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Map from '@/components/Map';
import FormField from '@/components/forms/FormField';
import CategorySelector from '@/components/forms/CategorySelector';
import { RangePriceInput } from '@/components/forms/PriceInput';
import { serviceCategories } from '@/utils/serviceCategories';
import { usePredictCategory } from '@/utils/aiPrediction';

const AddRequest = () => {
  const { userType } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [aiSuggesting, setAiSuggesting] = useState(false);
  
  // AI prediction based on description
  useEffect(() => {
    if (description.length > 10 && !categoryId) {
      setAiSuggesting(true);
      
      // Simulate AI processing delay
      const timer = setTimeout(() => {
        usePredictCategory(description, categoryId, setCategoryId, setSubcategoryId);
        setAiSuggesting(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [description, categoryId]);
  
  const handleLocationSelect = (coords: { latitude: number; longitude: number }) => {
    setLocation(coords);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !categoryId || !subcategoryId || !minBudget || !maxBudget) {
      toast.error('Silakan lengkapi semua field yang wajib diisi');
      return;
    }
    
    if (Number(minBudget) > Number(maxBudget)) {
      toast.error('Budget minimum tidak boleh lebih besar dari budget maksimum');
      return;
    }
    
    const category = serviceCategories.find(cat => cat.id === categoryId);
    const subcategory = category?.subcategories.find(sub => sub.id === subcategoryId);
    
    // Create new request
    const newRequest = {
      id: Date.now().toString(),
      title,
      description,
      category: category?.name,
      subcategory: subcategory?.name,
      budget: `Rp ${Number(minBudget).toLocaleString('id-ID')} - Rp ${Number(maxBudget).toLocaleString('id-ID')}`,
      location,
      status: 'Mencari',
      createdAt: new Date().toISOString()
    };
    
    console.log("New request:", newRequest);
    
    toast.success("Permintaan berhasil ditambahkan!");
    
    // Navigate to the My Requests page
    navigate('/my-requests');
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
            <FormField
              id="title"
              label="Judul Permintaan"
              placeholder="Masukkan judul permintaan"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Deskripsi Kebutuhan
                </label>
                {aiSuggesting && (
                  <span className="text-xs text-blue-500 animate-pulse">
                    AI menganalisis...
                  </span>
                )}
              </div>
              <FormField
                id="description"
                label=""
                type="textarea"
                placeholder="Jelaskan detail kebutuhan Anda"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />
              <p className="text-xs text-gray-500">
                Semakin detail deskripsi Anda, AI akan lebih mudah mengenali kategori yang tepat
              </p>
            </div>
            
            <CategorySelector
              categoryId={categoryId}
              subcategoryId={subcategoryId}
              setCategoryId={setCategoryId}
              setSubcategoryId={setSubcategoryId}
            />
            
            <RangePriceInput
              label="Anggaran (Rp)"
              minValue={minBudget}
              maxValue={maxBudget}
              onMinChange={(e) => setMinBudget(e.target.value)}
              onMaxChange={(e) => setMaxBudget(e.target.value)}
              required
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Lokasi Anda</label>
              <Map onLocationSelect={handleLocationSelect} height="150px" />
              <p className="text-xs text-gray-500">
                Berbagi lokasi membantu menemukan penyedia jasa terdekat
              </p>
            </div>
            
            <Button type="submit" className="w-full bg-klikjasa-purple">Kirim Permintaan</Button>
          </form>
        </CardContent>
      </Card>

      <BottomNavigation userType={userType || 'user'} />
    </div>
  );
};

export default AddRequest;
