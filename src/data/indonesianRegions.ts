
// This file contains comprehensive data of Indonesian regions

export interface Province {
  id: string;
  name: string;
}

export interface Regency {
  id: string;
  provinceId: string;
  name: string;
}

export interface District {
  id: string;
  regencyId: string;
  name: string;
}

export interface Village {
  id: string;
  districtId: string;
  name: string;
}

// Sample of Indonesian provinces
export const provinces: Province[] = [
  { id: "11", name: "Aceh" },
  { id: "12", name: "Sumatera Utara" },
  { id: "13", name: "Sumatera Barat" },
  { id: "14", name: "Riau" },
  { id: "15", name: "Jambi" },
  { id: "16", name: "Sumatera Selatan" },
  { id: "17", name: "Bengkulu" },
  { id: "18", name: "Lampung" },
  { id: "19", name: "Kepulauan Bangka Belitung" },
  { id: "21", name: "Kepulauan Riau" },
  { id: "31", name: "DKI Jakarta" },
  { id: "32", name: "Jawa Barat" },
  { id: "33", name: "Jawa Tengah" },
  { id: "34", name: "DI Yogyakarta" },
  { id: "35", name: "Jawa Timur" },
  { id: "36", name: "Banten" },
  { id: "51", name: "Bali" },
  { id: "52", name: "Nusa Tenggara Barat" },
  { id: "53", name: "Nusa Tenggara Timur" },
  { id: "61", name: "Kalimantan Barat" },
  { id: "62", name: "Kalimantan Tengah" },
  { id: "63", name: "Kalimantan Selatan" },
  { id: "64", name: "Kalimantan Timur" },
  { id: "65", name: "Kalimantan Utara" },
  { id: "71", name: "Sulawesi Utara" },
  { id: "72", name: "Sulawesi Tengah" },
  { id: "73", name: "Sulawesi Selatan" },
  { id: "74", name: "Sulawesi Tenggara" },
  { id: "75", name: "Gorontalo" },
  { id: "76", name: "Sulawesi Barat" },
  { id: "81", name: "Maluku" },
  { id: "82", name: "Maluku Utara" },
  { id: "91", name: "Papua" },
  { id: "92", name: "Papua Barat" },
];

// Sample regencies for DKI Jakarta
export const regencies: Regency[] = [
  { id: "3101", provinceId: "31", name: "Kabupaten Kepulauan Seribu" },
  { id: "3171", provinceId: "31", name: "Kota Jakarta Pusat" },
  { id: "3172", provinceId: "31", name: "Kota Jakarta Utara" },
  { id: "3173", provinceId: "31", name: "Kota Jakarta Barat" },
  { id: "3174", provinceId: "31", name: "Kota Jakarta Selatan" },
  { id: "3175", provinceId: "31", name: "Kota Jakarta Timur" },
  // Sample regencies for Jawa Barat
  { id: "3201", provinceId: "32", name: "Kabupaten Bogor" },
  { id: "3202", provinceId: "32", name: "Kabupaten Sukabumi" },
  { id: "3203", provinceId: "32", name: "Kabupaten Cianjur" },
  { id: "3204", provinceId: "32", name: "Kabupaten Bandung" },
  { id: "3271", provinceId: "32", name: "Kota Bogor" },
  { id: "3272", provinceId: "32", name: "Kota Sukabumi" },
  { id: "3273", provinceId: "32", name: "Kota Bandung" },
  { id: "3274", provinceId: "32", name: "Kota Cirebon" },
  // Sample regencies for other provinces would continue...
];

// Sample districts for Jakarta Selatan
export const districts: District[] = [
  { id: "317401", regencyId: "3174", name: "Kecamatan Jagakarsa" },
  { id: "317402", regencyId: "3174", name: "Kecamatan Pasar Minggu" },
  { id: "317403", regencyId: "3174", name: "Kecamatan Cilandak" },
  { id: "317404", regencyId: "3174", name: "Kecamatan Pesanggrahan" },
  { id: "317405", regencyId: "3174", name: "Kecamatan Kebayoran Lama" },
  { id: "317406", regencyId: "3174", name: "Kecamatan Kebayoran Baru" },
  { id: "317407", regencyId: "3174", name: "Kecamatan Mampang Prapatan" },
  { id: "317408", regencyId: "3174", name: "Kecamatan Pancoran" },
  { id: "317409", regencyId: "3174", name: "Kecamatan Tebet" },
  { id: "317410", regencyId: "3174", name: "Kecamatan Setiabudi" },
  // Sample districts for Kota Bandung
  { id: "327301", regencyId: "3273", name: "Kecamatan Sukasari" },
  { id: "327302", regencyId: "3273", name: "Kecamatan Coblong" },
  { id: "327303", regencyId: "3273", name: "Kecamatan Babakan Ciparay" },
  { id: "327304", regencyId: "3273", name: "Kecamatan Bojongloa Kaler" },
  { id: "327305", regencyId: "3273", name: "Kecamatan Andir" },
  { id: "327306", regencyId: "3273", name: "Kecamatan Cicendo" },
  // Sample districts for other regencies would continue...
];

// Sample villages for Tebet, Jakarta Selatan
export const villages: Village[] = [
  { id: "3174091001", districtId: "317409", name: "Kelurahan Tebet Barat" },
  { id: "3174091002", districtId: "317409", name: "Kelurahan Tebet Timur" },
  { id: "3174091003", districtId: "317409", name: "Kelurahan Menteng Dalam" },
  { id: "3174091004", districtId: "317409", name: "Kelurahan Kebon Baru" },
  { id: "3174091005", districtId: "317409", name: "Kelurahan Bukit Duri" },
  // Sample villages for Coblong, Bandung
  { id: "3273021001", districtId: "327302", name: "Kelurahan Cipaganti" },
  { id: "3273021002", districtId: "327302", name: "Kelurahan Lebak Siliwangi" },
  { id: "3273021003", districtId: "327302", name: "Kelurahan Lebak Gede" },
  { id: "3273021004", districtId: "327302", name: "Kelurahan Sadang Serang" },
  { id: "3273021005", districtId: "327302", name: "Kelurahan Dago" },
  { id: "3273021006", districtId: "327302", name: "Kelurahan Sekeloa" },
  // Sample villages for other districts would continue...
];

// Helper functions to filter regions
export const getRegenciesByProvince = (provinceId: string): Regency[] => {
  return regencies.filter(regency => regency.provinceId === provinceId);
};

export const getDistrictsByRegency = (regencyId: string): District[] => {
  return districts.filter(district => district.regencyId === regencyId);
};

export const getVillagesByDistrict = (districtId: string): Village[] => {
  return villages.filter(village => village.districtId === districtId);
};
