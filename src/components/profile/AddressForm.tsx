
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn, UseFormWatch } from 'react-hook-form';

interface AddressFormProps {
  form: UseFormReturn<any>;
  provinces: Array<{ id: string; name: string }>;
  availableRegencies: Array<{ id: string; name: string }>;
  availableDistricts: Array<{ id: string; name: string }>;
  availableVillages: Array<{ id: string; name: string }>;
}

const AddressForm: React.FC<AddressFormProps> = ({
  form,
  provinces,
  availableRegencies,
  availableDistricts,
  availableVillages
}) => {
  return (
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
  );
};

export default AddressForm;
