
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  subcategories: { id: string; name: string }[];
}

// Comprehensive list of service categories and subcategories
const serviceCategories: Category[] = [
  {
    id: "cleaning",
    name: "Kebersihan",
    subcategories: [
      { id: "home-cleaning", name: "Pembersihan Rumah" },
      { id: "car-wash", name: "Cuci Mobil" },
      { id: "laundry", name: "Laundry & Dry Cleaning" },
      { id: "office-cleaning", name: "Pembersihan Kantor" },
      { id: "ac-cleaning", name: "Pembersihan AC" },
      { id: "disinfection", name: "Desinfeksi & Sanitasi" },
      { id: "housemaid", name: "Jasa Pembantu Rumah Tangga (PRT)" },
      { id: "gardener", name: "Tukang Kebun" }
    ]
  },
  {
    id: "home-repair",
    name: "Perbaikan Rumah",
    subcategories: [
      { id: "electrician", name: "Tukang Listrik" },
      { id: "plumber", name: "Tukang Ledeng" },
      { id: "carpenter", name: "Tukang Kayu" },
      { id: "welder", name: "Tukang Las" },
      { id: "painter", name: "Tukang Cat" },
      { id: "roof-repair", name: "Perbaikan Atap" },
      { id: "door-window", name: "Perbaikan Pintu & Jendela" },
      { id: "appliance-install", name: "Instalasi Peralatan Rumah Tangga" }
    ]
  },
  {
    id: "beauty-health",
    name: "Kecantikan & Kesehatan",
    subcategories: [
      { id: "haircut", name: "Potong Rambut & Styling" },
      { id: "facial", name: "Perawatan Wajah" },
      { id: "massage-spa", name: "Pijat & Spa" },
      { id: "makeup", name: "Make Up Artist (MUA)" },
      { id: "nail-art", name: "Nail Art" },
      { id: "personal-trainer", name: "Personal Trainer" },
      { id: "yoga-pilates", name: "Yoga & Pilates" },
      { id: "nutrition", name: "Konsultasi Gizi" }
    ]
  },
  {
    id: "transportation",
    name: "Transportasi",
    subcategories: [
      { id: "online-ojek", name: "Ojek Online" },
      { id: "online-taxi", name: "Taksi Online" },
      { id: "car-rental", name: "Sewa Mobil" },
      { id: "moving-service", name: "Jasa Pindahan" },
      { id: "courier", name: "Kurir & Pengiriman" },
      { id: "private-driver", name: "Sopir Pribadi" }
    ]
  },
  {
    id: "education",
    name: "Pendidikan & Pelatihan",
    subcategories: [
      { id: "private-tutor", name: "Tutor Privat" },
      { id: "music-course", name: "Kursus Musik" },
      { id: "language-course", name: "Kursus Bahasa" },
      { id: "computer-training", name: "Pelatihan Komputer" },
      { id: "skill-training", name: "Pelatihan Keterampilan" }
    ]
  },
  {
    id: "events",
    name: "Acara",
    subcategories: [
      { id: "photography", name: "Fotografer & Videografer Acara" },
      { id: "catering", name: "Catering" },
      { id: "decoration", name: "Dekorasi Acara" },
      { id: "entertainment", name: "Hiburan (Musik, MC, dll.)" },
      { id: "event-planning", name: "Perencanaan Acara" },
      { id: "equipment-rental", name: "Sewa Peralatan Acara" }
    ]
  },
  {
    id: "pet-care",
    name: "Perawatan Hewan Peliharaan",
    subcategories: [
      { id: "pet-grooming", name: "Grooming Hewan Peliharaan" },
      { id: "pet-boarding", name: "Penitipan Hewan Peliharaan" },
      { id: "pet-training", name: "Pelatihan Hewan Peliharaan" },
      { id: "vet-consult", name: "Dokter Hewan (Konsultasi)" },
      { id: "pet-walking", name: "Jasa Jalan-jalan Hewan Peliharaan" }
    ]
  },
  {
    id: "personal-assistance",
    name: "Bantuan Pribadi",
    subcategories: [
      { id: "virtual-assistant", name: "Asisten Virtual" },
      { id: "writer-translator", name: "Jasa Penulis & Penerjemah" },
      { id: "personal-courier", name: "Jasa Kurir Pribadi" },
      { id: "personal-shopper", name: "Jasa Belanja Pribadi" },
      { id: "babysitter", name: "Pengasuh Anak (Baby Sitter)" },
      { id: "elder-care", name: "Perawatan Lansia" }
    ]
  },
  {
    id: "design-creative",
    name: "Desain & Kreatif",
    subcategories: [
      { id: "graphic-design", name: "Desain Grafis" },
      { id: "web-design", name: "Desain Web" },
      { id: "interior-design", name: "Desain Interior" },
      { id: "product-photography", name: "Fotografi Produk" },
      { id: "videography", name: "Videografi" },
      { id: "illustration", name: "Ilustrasi" }
    ]
  },
  {
    id: "electronic-repair",
    name: "Perbaikan Elektronik",
    subcategories: [
      { id: "phone-repair", name: "Perbaikan Handphone" },
      { id: "computer-repair", name: "Perbaikan Laptop & Komputer" },
      { id: "tv-repair", name: "Perbaikan TV" },
      { id: "appliance-repair", name: "Perbaikan Kulkas & Mesin Cuci" },
      { id: "ac-repair", name: "Perbaikan AC" }
    ]
  },
  {
    id: "automotive",
    name: "Otomotif",
    subcategories: [
      { id: "car-repair", name: "Perbaikan Mobil" },
      { id: "motorcycle-repair", name: "Perbaikan Motor" },
      { id: "mobile-wash", name: "Cuci Mobil & Motor (Panggilan)" },
      { id: "towing", name: "Derek Mobil" },
      { id: "emergency-service", name: "Layanan Darurat Kendaraan" }
    ]
  },
  {
    id: "others",
    name: "Lain-lain",
    subcategories: [
      { id: "painting-service", name: "Jasa Pengecatan" },
      { id: "installation-service", name: "Jasa Instalasi" },
      { id: "sewing-service", name: "Jasa Jahit" },
      { id: "reflexology", name: "Jasa Pijat Refleksi" },
      { id: "other-services", name: "Layanan Lainnya" }
    ]
  }
];

// Simulate AI suggestion functionality
const suggestCategoryFromDescription = (description: string): { categoryId: string, subcategoryId: string } | null => {
  description = description.toLowerCase();
  
  // Simple keyword matching for demo purposes
  if (description.includes('bersih') || description.includes('cuci') || description.includes('pel')) {
    return { categoryId: 'cleaning', subcategoryId: 'home-cleaning' };
  } else if (description.includes('listrik') || description.includes('lampu') || description.includes('stop kontak')) {
    return { categoryId: 'home-repair', subcategoryId: 'electrician' };
  } else if (description.includes('rambut') || description.includes('potong') || description.includes('salon')) {
    return { categoryId: 'beauty-health', subcategoryId: 'haircut' };
  } else if (description.includes('antar') || description.includes('jemput') || description.includes('kendaraan')) {
    return { categoryId: 'transportation', subcategoryId: 'online-taxi' };
  } else if (description.includes('les') || description.includes('tutor') || description.includes('belajar')) {
    return { categoryId: 'education', subcategoryId: 'private-tutor' };
  }
  
  return null;
};

const AddRequest = () => {
  const { userType } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [currentSubcategories, setCurrentSubcategories] = useState<{ id: string; name: string }[]>([]);
  
  useEffect(() => {
    // Update subcategories when category changes
    if (categoryId) {
      const category = serviceCategories.find(cat => cat.id === categoryId);
      if (category) {
        setCurrentSubcategories(category.subcategories);
        // Reset subcategory selection
        setSubcategoryId('');
      }
    } else {
      setCurrentSubcategories([]);
    }
  }, [categoryId]);
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    
    // Only suggest if description is at least 10 characters
    if (value.length > 10) {
      const suggestion = suggestCategoryFromDescription(value);
      if (suggestion) {
        setCategoryId(suggestion.categoryId);
        // Wait for subcategories to update
        setTimeout(() => {
          setSubcategoryId(suggestion.subcategoryId);
        }, 100);
        
        toast.success('AI telah menyarankan kategori berdasarkan deskripsi Anda!', {
          duration: 3000,
          icon: <Sparkles className="w-4 h-4 text-yellow-400" />
        });
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !categoryId || !subcategoryId || !budgetMin || !budgetMax) {
      toast.error('Silakan lengkapi semua field yang wajib diisi');
      return;
    }
    
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
              <Input 
                id="title" 
                placeholder="Masukkan judul permintaan" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                Deskripsi Permintaan
                <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI enabled
                </div>
              </Label>
              <Textarea 
                id="description" 
                placeholder="Jelaskan detail jasa yang Anda butuhkan" 
                value={description}
                onChange={handleDescriptionChange}
                rows={4}
                required
              />
              <p className="text-xs text-gray-500">
                Tip: Jelaskan kebutuhan Anda secara detail, AI akan otomatis menyarankan kategori yang sesuai
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subcategory">Sub Kategori</Label>
              <Select 
                value={subcategoryId} 
                onValueChange={setSubcategoryId}
                disabled={!categoryId || currentSubcategories.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih sub kategori" />
                </SelectTrigger>
                <SelectContent>
                  {currentSubcategories.map((subcat) => (
                    <SelectItem key={subcat.id} value={subcat.id}>
                      {subcat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (Rp)</Label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input 
                    id="budgetMin" 
                    type="number" 
                    placeholder="Minimum" 
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                    required 
                  />
                </div>
                <div className="flex-1">
                  <Input 
                    id="budgetMax" 
                    type="number" 
                    placeholder="Maximum" 
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                    required 
                  />
                </div>
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
