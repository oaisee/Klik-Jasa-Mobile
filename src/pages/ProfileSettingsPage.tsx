
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
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Nama harus minimal 2 karakter' }),
  phone: z.string().min(10, { message: 'Nomor telepon tidak valid' }),
  email: z.string().email({ message: 'Email tidak valid' }).optional(),
  province: z.string().min(1, { message: 'Provinsi harus dipilih' }),
  regency: z.string().min(1, { message: 'Kabupaten/Kota harus dipilih' }),
  district: z.string().min(1, { message: 'Kecamatan harus dipilih' }),
  village: z.string().min(1, { message: 'Kelurahan/Desa harus dipilih' }),
  addressDetail: z.string().min(5, { message: 'Detail alamat terlalu pendek' }),
  bio: z.string().optional(),
});

const ProfileSettingsPage = () => {
  const { user } = useAuth();
  const [availableRegencies, setAvailableRegencies] = useState<Array<{ id: string; name: string }>>([]);
  const [availableDistricts, setAvailableDistricts] = useState<Array<{ id: string; name: string }>>([]);
  const [availableVillages, setAvailableVillages] = useState<Array<{ id: string; name: string }>>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: user?.email || '',
      province: '',
      regency: '',
      district: '',
      village: '',
      addressDetail: '',
      bio: '',
    },
  });
  
  // Update available regions when province selection changes
  useEffect(() => {
    const provinceId = form.watch('province');
    if (provinceId) {
      const regencies = getRegenciesByProvince(provinceId);
      setAvailableRegencies(regencies);
      form.setValue('regency', '');
      form.setValue('district', '');
      form.setValue('village', '');
    } else {
      setAvailableRegencies([]);
    }
  }, [form.watch('province')]);
  
  // Update available districts when regency selection changes
  useEffect(() => {
    const regencyId = form.watch('regency');
    if (regencyId) {
      const districts = getDistrictsByRegency(regencyId);
      setAvailableDistricts(districts);
      form.setValue('district', '');
      form.setValue('village', '');
    } else {
      setAvailableDistricts([]);
    }
  }, [form.watch('regency')]);
  
  // Update available villages when district selection changes
  useEffect(() => {
    const districtId = form.watch('district');
    if (districtId) {
      const villages = getVillagesByDistrict(districtId);
      setAvailableVillages(villages);
      form.setValue('village', '');
    } else {
      setAvailableVillages([]);
    }
  }, [form.watch('district')]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Construct complete address from selections for saving
    const address = {
      province: provinces.find(p => p.id === values.province)?.name || '',
      regency: availableRegencies.find(r => r.id === values.regency)?.name || '',
      district: availableDistricts.find(d => d.id === values.district)?.name || '',
      village: availableVillages.find(v => v.id === values.village)?.name || '',
      detail: values.addressDetail
    };
    
    console.log("Profile data to save:", {
      ...values,
      address
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-bold mb-2">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Upload size={16} />
                  Unggah Foto
                </Button>
              </div>
              
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nomor telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <Label className="mb-2 block">Alamat</Label>
                <div className="space-y-3 p-3 border rounded-md">
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provinsi</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih provinsi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {provinces.map((province) => (
                              <SelectItem key={province.id} value={province.id}>
                                {province.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="regency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kabupaten/Kota</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!form.watch('province') || availableRegencies.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kabupaten/kota" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableRegencies.map((regency) => (
                              <SelectItem key={regency.id} value={regency.id}>
                                {regency.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kecamatan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!form.watch('regency') || availableDistricts.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kecamatan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableDistricts.map((district) => (
                              <SelectItem key={district.id} value={district.id}>
                                {district.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="village"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kelurahan/Desa</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!form.watch('district') || availableVillages.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kelurahan/desa" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableVillages.map((village) => (
                              <SelectItem key={village.id} value={village.id}>
                                {village.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="addressDetail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detail Alamat</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Masukkan detail alamat (nama jalan, nomor rumah, RT/RW, dll.)" 
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Ceritakan sedikit tentang diri Anda" 
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-klikjasa-purple">Simpan Perubahan</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettingsPage;
