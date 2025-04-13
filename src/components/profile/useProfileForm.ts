
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

export const formSchema = z.object({
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

export type ProfileFormValues = z.infer<typeof formSchema>;

export const useProfileForm = (email?: string) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: email || '',
      province: '',
      regency: '',
      district: '',
      village: '',
      addressDetail: '',
      bio: '',
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    // Construct complete address from selections for saving
    const address = {
      province: values.province,
      regency: values.regency,
      district: values.district,
      village: values.village,
      detail: values.addressDetail
    };
    
    console.log("Profile data to save:", {
      ...values,
      address
    });
    
    toast.success("Profil berhasil diperbarui!");
  };

  return {
    form,
    onSubmit,
    formSchema
  };
};
