
export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: SubCategory[];
}

// Comprehensive list of service categories and subcategories
export const serviceCategories: Category[] = [
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
