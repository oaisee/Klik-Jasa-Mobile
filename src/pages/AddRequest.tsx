
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Map from '@/components/Map';

interface Category {
  id: string;
  name: string;
  subcategories: { id: string; name: string }[];
}

// Updated categories list based on the complete list provided
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

// Simple AI prediction function
const predictCategory = (description: string): { categoryId: string; subcategoryId: string } | null => {
  description = description.toLowerCase();
  
  // Simple keyword matching for AI prediction
  const keywordMap: Record<string, { categoryId: string; subcategoryId: string }> = {
    // Cleaning
    "bersih rumah": { categoryId: "cleaning", subcategoryId: "home-cleaning" },
    "bersihkan rumah": { categoryId: "cleaning", subcategoryId: "home-cleaning" },
    "cuci mobil": { categoryId: "cleaning", subcategoryId: "car-wash" },
    "laundry": { categoryId: "cleaning", subcategoryId: "laundry" },
    "bersih kantor": { categoryId: "cleaning", subcategoryId: "office-cleaning" },
    "bersih ac": { categoryId: "cleaning", subcategoryId: "ac-cleaning" },
    "pembantu": { categoryId: "cleaning", subcategoryId: "housemaid" },
    
    // Home repair
    "listrik": { categoryId: "home-repair", subcategoryId: "electrician" },
    "ledeng": { categoryId: "home-repair", subcategoryId: "plumber" },
    "pipa air": { categoryId: "home-repair", subcategoryId: "plumber" },
    "kayu": { categoryId: "home-repair", subcategoryId: "carpenter" },
    "las": { categoryId: "home-repair", subcategoryId: "welder" },
    "cat rumah": { categoryId: "home-repair", subcategoryId: "painter" },
    "atap": { categoryId: "home-repair", subcategoryId: "roof-repair" },
    "pintu": { categoryId: "home-repair", subcategoryId: "door-window" },
    "jendela": { categoryId: "home-repair", subcategoryId: "door-window" },
    
    // Beauty & Health
    "potong rambut": { categoryId: "beauty-health", subcategoryId: "haircut" },
    "facial": { categoryId: "beauty-health", subcategoryId: "facial" },
    "pijat": { categoryId: "beauty-health", subcategoryId: "massage-spa" },
    "makeup": { categoryId: "beauty-health", subcategoryId: "makeup" },
    "kuku": { categoryId: "beauty-health", subcategoryId: "nail-art" },
    "personal trainer": { categoryId: "beauty-health", subcategoryId: "personal-trainer" },
    "yoga": { categoryId: "beauty-health", subcategoryId: "yoga-pilates" },
    "diet": { categoryId: "beauty-health", subcategoryId: "nutrition" },
    
    // More keywords can be added for other categories
    "ojek": { categoryId: "transportation", subcategoryId: "online-ojek" },
    "taksi": { categoryId: "transportation", subcategoryId: "online-taxi" },
    "sewa mobil": { categoryId: "transportation", subcategoryId: "car-rental" },
    "pindahan": { categoryId: "transportation", subcategoryId: "moving-service" },
    "kirim barang": { categoryId: "transportation", subcategoryId: "courier" },
    
    "les": { categoryId: "education", subcategoryId: "private-tutor" },
    "kursus": { categoryId: "education", subcategoryId: "skill-training" },
    "belajar": { categoryId: "education", subcategoryId: "private-tutor" },
    
    "foto": { categoryId: "events", subcategoryId: "photography" },
    "acara": { categoryId: "events", subcategoryId: "event-planning" },
    "dekorasi": { categoryId: "events", subcategoryId: "decoration" },
    
    "hewan": { categoryId: "pet-care", subcategoryId: "pet-grooming" },
    "grooming": { categoryId: "pet-care", subcategoryId: "pet-grooming" },
    "dokter hewan": { categoryId: "pet-care", subcategoryId: "vet-consult" },
    
    "asisten": { categoryId: "personal-assistance", subcategoryId: "virtual-assistant" },
    "tulis": { categoryId: "personal-assistance", subcategoryId: "writer-translator" },
    "terjemah": { categoryId: "personal-assistance", subcategoryId: "writer-translator" },
    "belanja": { categoryId: "personal-assistance", subcategoryId: "personal-shopper" },
    "baby sitter": { categoryId: "personal-assistance", subcategoryId: "babysitter" },
    "jaga anak": { categoryId: "personal-assistance", subcategoryId: "babysitter" },
    "lansia": { categoryId: "personal-assistance", subcategoryId: "elder-care" },
    
    "desain": { categoryId: "design-creative", subcategoryId: "graphic-design" },
    "logo": { categoryId: "design-creative", subcategoryId: "graphic-design" },
    "website": { categoryId: "design-creative", subcategoryId: "web-design" },
    "interior": { categoryId: "design-creative", subcategoryId: "interior-design" },
    "fotografi": { categoryId: "design-creative", subcategoryId: "product-photography" },
    "video": { categoryId: "design-creative", subcategoryId: "videography" },
    
    "hp": { categoryId: "electronic-repair", subcategoryId: "phone-repair" },
    "handphone": { categoryId: "electronic-repair", subcategoryId: "phone-repair" },
    "laptop": { categoryId: "electronic-repair", subcategoryId: "computer-repair" },
    "komputer": { categoryId: "electronic-repair", subcategoryId: "computer-repair" },
    "tv": { categoryId: "electronic-repair", subcategoryId: "tv-repair" },
    "televisi": { categoryId: "electronic-repair", subcategoryId: "tv-repair" },
    "kulkas": { categoryId: "electronic-repair", subcategoryId: "appliance-repair" },
    "mesin cuci": { categoryId: "electronic-repair", subcategoryId: "appliance-repair" },
    "ac": { categoryId: "electronic-repair", subcategoryId: "ac-repair" },
    
    "service mobil": { categoryId: "automotive", subcategoryId: "car-repair" },
    "bengkel": { categoryId: "automotive", subcategoryId: "motorcycle-repair" },
    "derek": { categoryId: "automotive", subcategoryId: "towing" },
    "motor": { categoryId: "automotive", subcategoryId: "motorcycle-repair" },
    
    "jahit": { categoryId: "others", subcategoryId: "sewing-service" },
    "refleksi": { categoryId: "others", subcategoryId: "reflexology" }
  };

  // Check for keyword matches
  for (const [keyword, category] of Object.entries(keywordMap)) {
    if (description.includes(keyword)) {
      return category;
    }
  }

  return null; // No match found
};

const AddRequest = () => {
  const { userType } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [currentSubcategories, setCurrentSubcategories] = useState<{ id: string; name: string }[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [aiSuggesting, setAiSuggesting] = useState(false);
  
  // Update subcategories when category changes
  useEffect(() => {
    if (categoryId) {
      const category = serviceCategories.find(cat => cat.id === categoryId);
      if (category) {
        setCurrentSubcategories(category.subcategories);
        setSubcategoryId('');
      }
    } else {
      setCurrentSubcategories([]);
    }
  }, [categoryId]);
  
  // AI prediction based on description
  useEffect(() => {
    // Only try to predict if there is a description but no category selected yet
    if (description.length > 10 && !categoryId) {
      setAiSuggesting(true);
      
      // Simulate AI processing delay
      const timer = setTimeout(() => {
        const prediction = predictCategory(description);
        
        if (prediction) {
          setCategoryId(prediction.categoryId);
          // Subcategory will be set after the category effect runs
          setTimeout(() => setSubcategoryId(prediction.subcategoryId), 100);
          
          toast.success("AI telah menyarankan kategori berdasarkan deskripsi Anda");
        }
        
        setAiSuggesting(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [description]);
  
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
    const subcategory = currentSubcategories.find(sub => sub.id === subcategoryId);
    
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
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Deskripsi Kebutuhan</Label>
                {aiSuggesting && (
                  <span className="text-xs text-blue-500 animate-pulse">
                    AI menganalisis...
                  </span>
                )}
              </div>
              <Textarea 
                id="description" 
                placeholder="Jelaskan detail kebutuhan Anda" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
              <p className="text-xs text-gray-500">
                Semakin detail deskripsi Anda, AI akan lebih mudah mengenali kategori yang tepat
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
              <Label>Anggaran (Rp)</Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">Rp</span>
                  </div>
                  <Input 
                    type="number" 
                    placeholder="Minimum" 
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    className="pl-10"
                    required 
                  />
                </div>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">Rp</span>
                  </div>
                  <Input 
                    type="number" 
                    placeholder="Maksimum" 
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="pl-10"
                    required 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Lokasi Anda</Label>
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
