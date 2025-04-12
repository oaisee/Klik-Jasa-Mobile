
import { toast } from 'sonner';

// Simple AI prediction function
export const predictCategory = (description: string): { categoryId: string; subcategoryId: string } | null => {
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

export const usePredictCategory = (
  description: string, 
  categoryId: string, 
  setCategoryId: (id: string) => void, 
  setSubcategoryId: (id: string) => void
) => {
  // Only try to predict if there is a description but no category selected yet
  if (description.length > 10 && !categoryId) {
    // Process AI prediction
    setTimeout(() => {
      const prediction = predictCategory(description);
      
      if (prediction) {
        setCategoryId(prediction.categoryId);
        // Wait a bit for the category effect to run before setting subcategory
        setTimeout(() => setSubcategoryId(prediction.subcategoryId), 100);
        
        toast.success("AI telah menyarankan kategori berdasarkan deskripsi Anda");
      }
    }, 1000);
  }
};
